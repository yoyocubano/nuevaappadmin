import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

export default function JobEditScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // Mock Data
    const [formData, setFormData] = useState({
        title: 'Senior Event Coordinator',
        company: 'Welux Events',
        location: 'New York, NY',
        deadline: 'Oct 24, 2023',
        description: 'Responsible for planning and executing high-end corporate events and luxury weddings. Must have 5+ years of experience in the hospitality industry, strong organizational skills, and a portfolio of past events.'
    });

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Job",
            "Are you sure? This will remove the job listing permanently.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <View className="flex-1 bg-background-light">
            <View className="bg-white px-4 py-3 pt-12 border-b border-gray-200 flex-row items-center justify-between sticky top-0 z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 pr-2">Edit Job</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="font-bold text-gray-500">Cancel</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-4 pb-24">
                <View className="gap-5 py-2">
                    {/* Form Fields - Reusing logic but simpler layout for Edit */}
                    <View className="gap-2">
                        <Text className="text-base font-medium text-gray-900">Job Title</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg h-14 px-4 text-base"
                            value={formData.title}
                            onChangeText={(t) => handleChange('title', t)}
                        />
                    </View>

                    <View className="gap-2">
                        <Text className="text-base font-medium text-gray-900">Company Name</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg h-14 px-4 text-base"
                            value={formData.company}
                            onChangeText={(t) => handleChange('company', t)}
                        />
                    </View>

                    <View className="gap-2">
                        <Text className="text-base font-medium text-gray-900">Location</Text>
                        <View className="relative">
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg h-14 pl-4 pr-10 text-base"
                                value={formData.location}
                                onChangeText={(t) => handleChange('location', t)}
                            />
                            <View className="absolute right-3 top-4">
                                <Ionicons name="location-outline" size={20} color="#9ca3af" />
                            </View>
                        </View>
                    </View>

                    <View className="gap-2">
                        <Text className="text-base font-medium text-gray-900">Application Deadline</Text>
                        <View className="relative">
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg h-14 pl-4 pr-10 text-base"
                                value={formData.deadline}
                                onChangeText={(t) => handleChange('deadline', t)}
                            />
                            <View className="absolute right-3 top-4">
                                <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
                            </View>
                        </View>
                    </View>

                    <View className="gap-2">
                        <Text className="text-base font-medium text-gray-900">Description</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg p-4 text-base min-h-[160px]"
                            multiline
                            textAlignVertical="top"
                            value={formData.description}
                            onChangeText={(t) => handleChange('description', t)}
                        />
                    </View>
                </View>
            </ScrollView>

            <View className="p-4 bg-white border-t border-gray-200 mt-auto gap-3 pb-8">
                <TouchableOpacity
                    className="bg-primary h-12 rounded-lg items-center justify-center shadow-lg shadow-primary/20"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="font-bold text-white text-base">Update Job</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="h-12 rounded-lg items-center justify-center border border-transparent hover:bg-red-50"
                    onPress={handleDelete}
                >
                    <Text className="font-bold text-red-500 text-base">Delete Job</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
