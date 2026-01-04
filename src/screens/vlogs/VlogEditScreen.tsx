import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

export default function VlogEditScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    // In real app, fetch data using route.params.id

    const [title, setTitle] = useState('Summer Gala Highlights 2023');
    const [description, setDescription] = useState('Join us for an exclusive look behind the scenes of the annual Summer Gala. From the red carpet arrivals to the stunning main event.');

    const handleDelete = () => {
        Alert.alert(
            "Delete Vlog",
            "Are you sure you want to delete this vlog? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <View className="flex-1 bg-background-light">
            <View className="bg-white/90 px-4 py-3 pt-12 border-b border-gray-200 flex-row items-center justify-between sticky top-0 z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full hover:bg-black/5 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Edit Vlog</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-primary font-bold">Cancel</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-4">
                {/* Thumbnail Preview */}
                <View className="h-48 rounded-xl overflow-hidden mb-6 relative bg-gray-900 border border-gray-200">
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' }}
                        className="w-full h-full opacity-60"
                    />
                    <View className="absolute inset-0 items-center justify-center gap-2">
                        <Ionicons name="camera-outline" size={32} color="white" />
                        <Text className="text-white text-xs font-bold uppercase tracking-widest">Change Thumbnail</Text>
                    </View>
                </View>

                <View className="gap-6">
                    <View className="gap-2">
                        <Text className="text-sm font-semibold text-gray-500 ml-1">Vlog Title</Text>
                        <View className="relative">
                            <TextInput
                                className="bg-white border border-gray-200 rounded-xl h-14 px-4 text-base font-medium text-gray-900"
                                value={title}
                                onChangeText={setTitle}
                            />
                            <View className="absolute right-4 top-4">
                                <Ionicons name="pencil" size={18} color="#ecb613" />
                            </View>
                        </View>
                    </View>

                    <View className="gap-2">
                        <Text className="text-sm font-semibold text-gray-500 ml-1">Description</Text>
                        <TextInput
                            className="bg-white border border-gray-200 rounded-xl p-4 text-base min-h-[160px] text-gray-900"
                            multiline
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View className="flex-row gap-4">
                        <View className="flex-1 gap-2">
                            <Text className="text-sm font-semibold text-gray-500 ml-1">Date</Text>
                            <View className="bg-gray-50 rounded-xl h-12 px-4 justify-center border border-gray-200">
                                <Text className="font-medium text-gray-900">Aug 12, 2023</Text>
                            </View>
                        </View>
                        <View className="flex-1 gap-2">
                            <Text className="text-sm font-semibold text-gray-500 ml-1">Duration</Text>
                            <View className="bg-gray-50 rounded-xl h-12 px-4 justify-center border border-gray-200">
                                <Text className="font-medium text-gray-900">12:45</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="p-5 pb-8 bg-white border-t border-gray-100 gap-4">
                <TouchableOpacity
                    className="bg-primary h-14 rounded-full items-center justify-center shadow-lg shadow-primary/20 flex-row gap-2"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="font-bold text-gray-900 text-lg">Update Changes</Text>
                    <Ionicons name="checkmark-circle-outline" size={24} color="#1f2937" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-red-50 h-14 rounded-full items-center justify-center flex-row gap-2"
                    onPress={handleDelete}
                >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    <Text className="font-bold text-red-500 text-base">Delete Vlog</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
