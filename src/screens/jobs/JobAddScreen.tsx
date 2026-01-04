import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

export default function JobAddScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        deadline: '',
        description: ''
    });

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <View className="flex-1 bg-background-light">
            <View className="bg-white/95 px-4 py-3 pt-12 border-b border-gray-200 flex-row items-center justify-between sticky top-0 z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 pr-10">Add New Job</Text>
                <View className="w-10" />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1 p-5">
                    <View className="mb-2">
                        <Text className="text-2xl font-bold italic text-gray-800 mb-1" style={{ fontFamily: 'serif' }}>
                            Job Details
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Please fill in the information below to list a new position.
                        </Text>
                    </View>

                    <View className="gap-5 mt-6 pb-24">
                        {/* Title */}
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                Job Title <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-base shadow-sm"
                                placeholder="e.g. Senior Event Coordinator"
                                value={formData.title}
                                onChangeText={(t) => handleChange('title', t)}
                            />
                        </View>

                        {/* Company */}
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                Company Name <Text className="text-red-500">*</Text>
                            </Text>
                            <View className="relative">
                                <View className="absolute inset-y-0 left-0 pl-3 justify-center z-10">
                                    <Ionicons name="business-outline" size={20} color="#9ca3af" />
                                </View>
                                <TextInput
                                    className="bg-white border border-gray-300 rounded-lg py-3.5 pl-10 pr-4 text-base shadow-sm"
                                    placeholder="e.g. Welux Events"
                                    value={formData.company}
                                    onChangeText={(t) => handleChange('company', t)}
                                />
                            </View>
                        </View>

                        {/* Location */}
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Location</Text>
                            <View className="relative">
                                <View className="absolute inset-y-0 left-0 pl-3 justify-center z-10">
                                    <Ionicons name="location-outline" size={20} color="#9ca3af" />
                                </View>
                                <TextInput
                                    className="bg-white border border-gray-300 rounded-lg py-3.5 pl-10 pr-4 text-base shadow-sm"
                                    placeholder="e.g. New York, NY (Remote)"
                                    value={formData.location}
                                    onChangeText={(t) => handleChange('location', t)}
                                />
                            </View>
                        </View>

                        {/* Deadline (Simple Text Input for now) */}
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Application Deadline</Text>
                            <View className="relative">
                                <View className="absolute inset-y-0 left-0 pl-3 justify-center z-10">
                                    <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
                                </View>
                                <TextInput
                                    className="bg-white border border-gray-300 rounded-lg py-3.5 pl-10 pr-4 text-base shadow-sm"
                                    placeholder="YYYY-MM-DD"
                                    value={formData.deadline}
                                    onChangeText={(t) => handleChange('deadline', t)}
                                />
                            </View>
                        </View>

                        {/* Description */}
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Description</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg py-3 px-4 text-base shadow-sm min-h-[120px]"
                                placeholder="Enter full job responsibilities..."
                                multiline
                                textAlignVertical="top"
                                value={formData.description}
                                onChangeText={(t) => handleChange('description', t)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="p-5 bg-white/95 border-t border-gray-200 gap-3 pb-8">
                <TouchableOpacity
                    className="bg-primary w-full h-14 rounded-lg items-center justify-center flex-row gap-2 shadow-lg hover:bg-blue-700 active:scale-[0.98]"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="save-outline" size={20} color="white" />
                    <Text className="font-bold text-white text-base">Save Job</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} className="items-center py-2">
                    <Text className="font-bold text-gray-500">Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
