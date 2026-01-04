import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { supabase } from '../../services/supabase';
import { HapticsService } from '../../utils/haptics';
import { ScreenHeader } from '../../components/ScreenHeader';

export default function JobAddScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // State for form data and UI status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: 'Welux Events',
        location: '',
        deadline: '',
        description: '',
        requirements: ''
    });

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        HapticsService.light();

        // 1. Validation
        if (!formData.title || !formData.company) {
            HapticsService.error();
            Alert.alert('Missing Information', 'Please provide at least a Job Title and Company Name.');
            return;
        }

        setIsSubmitting(true);

        try {
            // 2. Prepare data schema
            const requirementsArray = formData.requirements
                ? formData.requirements.split('\n').map(req => req.trim()).filter(req => req.length > 0)
                : [];

            const newJob = {
                title: formData.title,
                company: formData.company,
                location: formData.location || null,
                description: formData.description || null,
                deadline: formData.deadline || null,
                requirements: requirementsArray,
                status: 'draft' // Default per audit
            };

            // 3. Insert into Supabase
            const { error } = await supabase
                .from('jobs')
                .insert([newJob]);

            if (error) throw error;

            // 4. Success handling
            HapticsService.success();
            Alert.alert('Success', 'Job has been created successfully (Draft).', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);

        } catch (error: any) {
            console.error('Error creating job:', error);
            HapticsService.error();
            Alert.alert('Error', `Failed to create job: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 bg-background-light">
            <ScreenHeader title="Add New Job" showBack />

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
                                className="bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-base shadow-sm focus:border-primary"
                                placeholder="e.g. Senior Event Coordinator"
                                value={formData.title}
                                onChangeText={(t) => handleChange('title', t)}
                                editable={!isSubmitting}
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
                                    editable={!isSubmitting}
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
                                    editable={!isSubmitting}
                                />
                            </View>
                        </View>

                        {/* Deadline */}
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
                                    editable={!isSubmitting}
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
                                editable={!isSubmitting}
                            />
                        </View>

                        {/* Requirements */}
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Requirements</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg py-3 px-4 text-base shadow-sm min-h-[100px]"
                                placeholder="One requirement per line..."
                                multiline
                                textAlignVertical="top"
                                value={formData.requirements}
                                onChangeText={(t) => handleChange('requirements', t)}
                                editable={!isSubmitting}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="p-5 bg-white/95 border-t border-gray-200 gap-3 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <TouchableOpacity
                    className={`w-full h-14 rounded-lg items-center justify-center flex-row gap-2 shadow-lg ${isSubmitting ? 'bg-primary/70' : 'bg-primary hover:bg-blue-600'
                        }`}
                    onPress={handleSave}
                    disabled={isSubmitting}
                    activeOpacity={0.8}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Ionicons name="save-outline" size={20} color="white" />
                            <Text className="font-bold text-white text-base">Save Job (Draft)</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="items-center py-2"
                    disabled={isSubmitting}
                >
                    <Text className="font-bold text-gray-500">Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
