import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../services/supabase';
import { RootStackParamList, Vlog } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { HapticsService } from '../../utils/haptics';

type VlogEditScreenRouteProp = RouteProp<RootStackParamList, 'VlogEdit'>;

export default function VlogEditScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<VlogEditScreenRouteProp>();
    const id = route.params.id;
    const [vlog, setVlog] = useState<Vlog | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchVlog = async () => {
            const { data, error } = await supabase.from('vlogs').select('*').eq('id', id).single();
            if (error) {
                Alert.alert('Error', 'Failed to fetch vlog details.');
                console.error("Error fetching vlog:", error);
            } else if (data) {
                setVlog(data as Vlog);
                setTitle(data.title);
                setDescription(data.description || '');
            }
            setLoading(false);
        };
        fetchVlog();
    }, [id]);

    const handleUpdate = async () => {
        HapticsService.light();

        if (!title) {
            HapticsService.error();
            Alert.alert('Title Required', 'Please enter a title for the vlog.');
            return;
        }

        setIsSaving(true);
        const { data, error } = await supabase
            .from('vlogs')
            .update({ title, description })
            .eq('id', id);

        if (error) {
            HapticsService.error();
            Alert.alert('Error', 'Failed to update vlog.');
            console.error("Error updating vlog:", error);
        } else {
            HapticsService.success();
            navigation.goBack();
        }
        setIsSaving(false);
    };

    const handleDelete = () => {
        HapticsService.heavy();
        Alert.alert(
            "Delete Vlog",
            "Are you sure you want to delete this vlog? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsDeleting(true);
                        const { error } = await supabase.from('vlogs').delete().eq('id', id);
                        if (error) {
                            HapticsService.error();
                            Alert.alert('Error', 'Failed to delete vlog.');
                            console.error("Error deleting vlog:", error);
                            setIsDeleting(false);
                        } else {
                            HapticsService.success();
                            navigation.goBack();
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light">
                <ActivityIndicator size="large" color="#ecb613" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background-light">
            <ScreenHeader title="Edit Vlog" showBack />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView className="flex-1 p-4">
                    <View className="h-48 rounded-xl overflow-hidden mb-6 relative bg-gray-900 border border-gray-200 shadow-md">
                        <ImageBackground
                            source={{ uri: vlog?.thumbnail_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' }}
                            className="w-full h-full opacity-60"
                        />
                        <TouchableOpacity className="absolute inset-0 items-center justify-center gap-2">
                            <Ionicons name="camera-outline" size={32} color="white" />
                            <Text className="text-white text-xs font-bold uppercase tracking-widest shadow-sm">Change Thumbnail</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="gap-6 pb-4">
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                Title <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-xl h-14 px-4 text-base font-medium text-gray-900 shadow-sm"
                                value={title}
                                onChangeText={setTitle}
                                editable={!isSaving}
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Description</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-xl p-4 text-base min-h-[160px] text-gray-900 shadow-sm"
                                multiline
                                textAlignVertical="top"
                                value={description}
                                onChangeText={setDescription}
                                editable={!isSaving}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="p-4 pb-8 bg-white border-t border-gray-200 mt-auto gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <TouchableOpacity
                    className={`h-14 rounded-lg items-center justify-center shadow-lg flex-row gap-2 ${isSaving ? 'bg-primary/70' : 'bg-primary shadow-primary/20'}`}
                    onPress={handleUpdate}
                    disabled={isSaving || isDeleting}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#1f2937" />
                    ) : (
                        <>
                            <Ionicons name="save-outline" size={20} color="#1f2937" />
                            <Text className="font-bold text-gray-900 text-lg">Update Changes</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    className={`h-14 rounded-lg items-center justify-center flex-row gap-2 border border-red-100 ${isDeleting ? 'bg-red-100' : 'bg-red-50'}`}
                    onPress={handleDelete}
                    disabled={isSaving || isDeleting}
                >
                    {isDeleting ? (
                        <ActivityIndicator color="#ef4444" />
                    ) : (
                        <>
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                            <Text className="font-bold text-red-500 text-base">Delete Vlog</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
