import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

export default function VlogAddScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-background-light"
        >
            <View className="bg-white/90 px-4 py-3 pt-12 border-b border-gray-200 flex-row items-center justify-between sticky top-0 z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full hover:bg-black/5 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 pr-10">Add New Vlog</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 p-4">
                <View className="mb-6">
                    <Text className="text-2xl font-extrabold text-gray-900 mb-1">Create Entry</Text>
                    <Text className="text-sm text-gray-500">Fill in the details for the new video log.</Text>
                </View>

                <View className="gap-6 pb-32">
                    <View className="gap-2">
                        <Text className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Vlog Title</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg h-14 px-4 text-base font-medium"
                            placeholder="e.g., Summer Gala Highlights 2024"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View className="gap-2">
                        <Text className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Description</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg p-4 text-base min-h-[120px] text-gray-900"
                            placeholder="Enter the vlog details, summary..."
                            multiline
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <TouchableOpacity className="border border-dashed border-gray-300 bg-gray-50 rounded-xl p-8 items-center justify-center gap-3">
                        <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
                            <Ionicons name="cloud-upload-outline" size={24} color="#6b7280" />
                        </View>
                        <View className="items-center">
                            <Text className="font-bold text-gray-900">Upload Thumbnail</Text>
                            <Text className="text-xs text-gray-500">Recommended size: 1280x720</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-white border-t border-gray-200 flex-row gap-4">
                <TouchableOpacity
                    className="flex-1 h-14 rounded-lg border border-gray-300 items-center justify-center"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="font-bold text-gray-900">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-[2] h-14 bg-primary rounded-lg items-center justify-center flex-row gap-2 shadow-lg shadow-primary/20"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="save-outline" size={20} color="#1f2937" />
                    <Text className="font-bold text-gray-900">Save Entry</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
