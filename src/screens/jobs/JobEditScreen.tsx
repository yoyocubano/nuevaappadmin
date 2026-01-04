import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Job } from '../../types';
import { supabase } from '../../services/supabase';
import { HapticsService } from '../../utils/haptics';
import { ScreenHeader } from '../../components/ScreenHeader';

type JobEditScreenRouteProp = RouteProp<RootStackParamList, 'JobEdit'>;

export default function JobEditScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<JobEditScreenRouteProp>();
    const jobId = route.params.id;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        deadline: '',
        description: '',
        requirements: ''
    });

    // 1. Fetch Job Data on Mount
    useEffect(() => {
        const fetchJob = async () => {
            if (!jobId) {
                Alert.alert("Error", "No job ID provided.", [{ text: "OK", onPress: () => navigation.goBack() }]);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('id', jobId)
                    .single();

                if (error || !data) throw error;

                // Transform requirements array back to string
                const reqString = data.requirements
                    ? (data.requirements as string[]).join('\n')
                    : '';

                // Format date
                const deadlineDate = data.deadline
                    ? new Date(data.deadline).toISOString().split('T')[0]
                    : '';

                setFormData({
                    title: data.title || '',
                    company: data.company || '',
                    location: data.location || '',
                    deadline: deadlineDate,
                    description: data.description || '',
                    requirements: reqString
                });

            } catch (error) {
                console.error("Fetch job error:", error);
                Alert.alert("Error", "Could not load job details.", [{ text: "OK", onPress: () => navigation.goBack() }]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    // 2. Handle Update
    const handleUpdate = async () => {
        HapticsService.light();

        if (!formData.title || !formData.company) {
            HapticsService.error();
            Alert.alert("Validation Error", "Title and Company are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Prepare requirements array
            const requirementsArray = formData.requirements
                ? formData.requirements.split('\n').map(req => req.trim()).filter(req => req.length > 0)
                : [];

            const { error } = await supabase
                .from('jobs')
                .update({
                    title: formData.title,
                    company: formData.company,
                    location: formData.location || null,
                    deadline: formData.deadline || null,
                    description: formData.description || null,
                    requirements: requirementsArray
                })
                .eq('id', jobId);

            if (error) throw error;

            HapticsService.success();
            Alert.alert("Success", "Job updated successfully.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error: any) {
            HapticsService.error();
            // Handle specific Supabase errors if needed
            Alert.alert("Error", `Failed to update job: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 3. Handle Delete
    const handleDelete = () => {
        HapticsService.heavy(); // Heavy impact for destructive action
        Alert.alert(
            "Delete Job",
            "Are you sure? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel", onPress: () => { } },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsDeleting(true);
                        try {
                            const { error } = await supabase.from('jobs').delete().eq('id', jobId);
                            if (error) throw error;

                            HapticsService.success();
                            // Pop to top to avoid stale state in navigation stack
                            navigation.popToTop();
                        } catch (error: any) {
                            HapticsService.error();
                            Alert.alert("Error", "Failed to delete job.");
                        } finally {
                            setIsDeleting(false);
                        }
                    }
                }
            ]
        );
    };

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light">
                <ActivityIndicator size="large" color="#ecb613" />
                <Text className="mt-4 text-gray-500">Loading Job Details...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background-light">
            <ScreenHeader title="Edit Job" showBack />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1 p-5">
                    <View className="mb-2">
                        <Text className="text-2xl font-bold italic text-gray-800 mb-1" style={{ fontFamily: 'serif' }}>
                            Edit Details
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Update job information or remove listing.
                        </Text>
                    </View>

                    <View className="gap-5 mt-6 pb-24">
                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                Job Title <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-base shadow-sm focus:border-primary"
                                value={formData.title}
                                onChangeText={(t) => handleChange('title', t)}
                                editable={!isSubmitting}
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                Company Name <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-base shadow-sm"
                                value={formData.company}
                                onChangeText={(t) => handleChange('company', t)}
                                editable={!isSubmitting}
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Location</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-base shadow-sm"
                                value={formData.location}
                                onChangeText={(t) => handleChange('location', t)}
                                editable={!isSubmitting}
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Deadline</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg py-3.5 px-4 text-base shadow-sm"
                                placeholder="YYYY-MM-DD"
                                value={formData.deadline}
                                onChangeText={(t) => handleChange('deadline', t)}
                                editable={!isSubmitting}
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Description</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg p-4 text-base shadow-sm min-h-[120px]"
                                multiline
                                textAlignVertical="top"
                                value={formData.description}
                                onChangeText={(t) => handleChange('description', t)}
                                editable={!isSubmitting}
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase">Requirements</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg p-4 text-base shadow-sm min-h-[100px]"
                                multiline
                                textAlignVertical="top"
                                placeholder="One per line..."
                                value={formData.requirements}
                                onChangeText={(t) => handleChange('requirements', t)}
                                editable={!isSubmitting}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="p-5 bg-white/95 border-t border-gray-200 mt-auto gap-3 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <TouchableOpacity
                    className={`h-14 rounded-lg items-center justify-center flex-row gap-2 shadow-lg ${isSubmitting ? 'bg-primary/70' : 'bg-primary'}`}
                    onPress={handleUpdate}
                    disabled={isSubmitting || isDeleting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Ionicons name="save-outline" size={20} color="white" />
                            <Text className="font-bold text-white text-base">Update Changes</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    className={`h-14 rounded-lg items-center justify-center flex-row gap-2 border border-red-50 ${isDeleting ? 'bg-red-50' : 'bg-red-50/50'}`}
                    onPress={handleDelete}
                    disabled={isSubmitting || isDeleting}
                >
                    {isDeleting ? (
                        <ActivityIndicator color="#ef4444" />
                    ) : (
                        <>
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                            <Text className="font-bold text-red-500 text-base">Delete Job</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
