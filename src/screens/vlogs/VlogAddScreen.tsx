import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { HapticsService } from '../../utils/haptics';

export default function VlogAddScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { session } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        HapticsService.light();

        if (!title) {
            HapticsService.error();
            Alert.alert('Title Required', 'Please enter a title for the vlog.');
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from('vlogs')
            .insert([
                {
                    title,
                    description,
                    user_id: session?.user.id,
                    status: 'draft',
                },
            ])
            .select();

        if (error) {
            HapticsService.error();
            console.error('Error creating vlog:', error);
            Alert.alert('Error', 'Failed to create vlog entry. Please try again.');
        } else {
            HapticsService.success();
            navigation.goBack();
        }
        setLoading(false);
    };

    return (
        <View className="flex-1 bg-background-light">
            <ScreenHeader title="New Vlog Entry" showBack />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 bg-background-light"
            >
                <ScrollView className="flex-1 p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold italic text-gray-800 mb-1" style={{ fontFamily: 'serif' }}>
                            Vlog Details
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Upload a new video log entry.
                        </Text>
                    </View>

                    <View className="gap-6 pb-24">
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                Title <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-xl h-14 px-4 text-base font-medium text-gray-900 shadow-sm"
                                placeholder="Enter video title"
                                value={title}
                                onChangeText={setTitle}
                                editable={!loading}
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Description</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-xl p-4 text-base min-h-[160px] text-gray-900 shadow-sm"
                                placeholder="Write a description..."
                                multiline
                                textAlignVertical="top"
                                value={description}
                                onChangeText={setDescription}
                                editable={!loading}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="p-4 bg-white border-t border-gray-200 flex-row gap-4 mb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <TouchableOpacity
                    className="flex-1 h-14 rounded-lg border border-gray-300 items-center justify-center bg-gray-50"
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                >
                    <Text className="font-bold text-gray-500">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-[2] h-14 bg-primary rounded-lg items-center justify-center flex-row gap-2 shadow-lg shadow-primary/20 ${loading ? 'opacity-70' : ''}`}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#1f2937" />
                    ) : (
                        <>
                            <Ionicons name="save-outline" size={20} color="#1f2937" />
                            <Text className="font-bold text-gray-900">Save Entry</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
