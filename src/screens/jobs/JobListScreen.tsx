import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Job } from '../../types';
import { supabase } from '../../services/supabase'; // Import Supabase client

const FILTER_CHIPS = [
    { id: 'all', label: 'All', activeBg: 'bg-primary', activeText: 'text-white' },
    { id: 'active', label: 'Active', activeBg: 'bg-emerald-100', activeText: 'text-emerald-800' },
    { id: 'draft', label: 'Draft', activeBg: 'bg-amber-100', activeText: 'text-amber-800' },
    { id: 'expired', label: 'Expired', activeBg: 'bg-rose-100', activeText: 'text-rose-800' },
];

export default function JobListScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [activeFilter, setActiveFilter] = useState('all');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch data from the 'jobs' table
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                if (data) {
                    setJobs(data);
                }
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []); // Empty dependency array means this runs once on mount

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return { bg: 'bg-emerald-100', text: 'text-emerald-800' };
            case 'draft': return { bg: 'bg-amber-100', text: 'text-amber-800' };
            case 'expired': return { bg: 'bg-rose-100', text: 'text-rose-800' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
        }
    };

    // Filter jobs based on the active filter
    const filteredJobs = jobs.filter(job => {
        if (activeFilter === 'all') return true;
        return job.status === activeFilter;
    });

    return (
        <View className="flex-1 bg-background-light relative">
            <View className="bg-white px-4 py-3 pt-12 border-b border-gray-100 flex-row items-center justify-between sticky top-0 z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full hover:bg-black/5 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 pr-2">Job Management</Text>
                <TouchableOpacity className="w-10 h-10 rounded-full hover:bg-black/5 items-center justify-center">
                    <Ionicons name="search" size={24} color="#1f2937" />
                </TouchableOpacity>
            </View>

            <View className="bg-white border-b border-gray-100 py-3 z-40">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 gap-3">
                    {FILTER_CHIPS.map((chip) => {
                        const isActive = activeFilter === chip.id;
                        return (
                            <TouchableOpacity
                                key={chip.id}
                                onPress={() => setActiveFilter(chip.id)}
                                className={`h-9 px-5 rounded-full items-center justify-center ${isActive ? chip.activeBg : 'bg-gray-100'
                                    }`}
                            >
                                <Text className={`text-sm font-bold ${isActive ? chip.activeText : 'text-gray-600'}`}>
                                    {chip.label}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#ecb613" />
                    <Text className="mt-4 text-gray-600">Loading Jobs...</Text>
                </View>
            ) : error ? (
                <View className="flex-1 items-center justify-center p-4">
                    <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
                    <Text className="mt-4 text-lg font-bold text-red-600">Error Loading Jobs</Text>
                    <Text className="mt-2 text-center text-gray-600">{error}</Text>
                </View>
            ) : (
                <ScrollView className="flex-1 p-4">
                    <View className="gap-4 pb-24">
                        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                            <TouchableOpacity
                                key={job.id}
                                className="bg-white rounded-xl p-3 shadow-sm border border-transparent mx-1 mb-1 flex-row gap-4 items-start"
                                onPress={() => navigation.navigate('JobEdit', { id: job.id })}
                            >
                                <View className="w-[72px] h-[72px] rounded-lg bg-gray-200 overflow-hidden shrink-0">
                                    {/* Placeholder for potential image */}
                                    <View className="w-full h-full bg-primary/20 items-center justify-center">
                                        <Ionicons name="briefcase-outline" size={32} color="#ecb613" />
                                    </View>
                                </View>

                                <View className="flex-1 min-w-0 justify-center gap-1">
                                    <View className="flex-row justify-between items-start">
                                        <Text className="text-base font-bold text-gray-900 truncate flex-1 pr-2" numberOfLines={1}>{job.title}</Text>
                                        <View className={`px-2 py-0.5 rounded-full ${getStatusBadge(job.status).bg}`}>
                                            <Text className={`text-[10px] font-bold uppercase ${getStatusBadge(job.status).text}`}>
                                                {job.status}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text className="text-sm font-medium text-gray-500">{job.company}</Text>
                                    <View className="flex-row items-center gap-1.5 opacity-60">
                                        <Ionicons name="calendar-outline" size={14} color="#374151" />
                                        {/* Assuming deadline is a string. If it's a date, it should be formatted */}
                                        <Text className="text-xs text-gray-600">Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'No deadline'}</Text>
                                    </View>
                                </View>

                                <View className="self-center">
                                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                                </View>
                            </TouchableOpacity>
                        )) : (
                            <View className="flex-1 items-center justify-center mt-20">
                                <Ionicons name="sad-outline" size={48} color="#9ca3af" />
                                <Text className="mt-4 text-lg font-bold text-gray-700">No Jobs Found</Text>
                                <Text className="mt-1 text-gray-500">There are no jobs with the filter '{activeFilter}'.</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}


            <View className="absolute bottom-6 right-6">
                <TouchableOpacity
                    className="flex-row items-center justify-center gap-2 bg-primary h-14 px-6 rounded-full shadow-lg shadow-primary/30"
                    onPress={() => navigation.navigate('JobAdd')}
                >
                    <Ionicons name="add" size={24} color="white" />
                    <Text className="font-bold text-base text-white">New Job</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
