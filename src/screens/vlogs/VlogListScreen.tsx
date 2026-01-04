import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../services/supabase';
import { RootStackParamList, Vlog } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader'; // Corrected import (named export)

export default function VlogListScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [vlogs, setVlogs] = useState<Vlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVlogs = async () => {
        const { data, error } = await supabase
            .from('vlogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
            console.error("Error fetching vlogs:", error);
        } else {
            setVlogs(data as Vlog[]);
        }
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchVlogs();
        }, [])
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'published': return { bg: 'bg-green-100', text: 'text-green-700' };
            case 'processing': return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
        }
    };

    if (loading && vlogs.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light">
                <ActivityIndicator size="large" color="#ecb613" />
            </View>
        );
    }

    if (error && vlogs.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light p-4">
                <Text className="text-red-500 text-center">Error fetching data: {error}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background-light">
            <ScreenHeader title="Vlog Details" showBack />
            <ScrollView
                className="flex-1 p-4"
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchVlogs} />}
            >
                <View className="gap-4 pb-24">
                    {vlogs.length > 0 ? vlogs.map((vlog) => {
                        const statusStyle = getStatusStyle(vlog.status);
                        return (
                            <TouchableOpacity
                                key={vlog.id}
                                className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex-row gap-4 items-center"
                                onPress={() => navigation.navigate('VlogEdit', { id: vlog.id })}
                            >
                                <View className="h-20 w-28 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <ImageBackground
                                        source={{ uri: vlog.thumbnail_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' }}
                                        className="h-full w-full"
                                    />
                                    <View className="absolute inset-0 bg-black/10 items-center justify-center">
                                        <Ionicons name="play-circle" size={24} color="white" />
                                    </View>
                                </View>

                                <View className="flex-1 gap-1">
                                    <Text className="text-sm font-bold text-gray-900 line-clamp-2" numberOfLines={2}>
                                        {vlog.title}
                                    </Text>
                                    <View className="flex-row items-center gap-2">
                                        <View className={`px-2 py-0.5 rounded-full ${statusStyle.bg}`}>
                                            <Text className={`text-[10px] uppercase font-bold ${statusStyle.text}`}>
                                                {vlog.status}
                                            </Text>
                                        </View>
                                        <Text className="text-[10px] text-gray-400">
                                            {new Date(vlog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        );
                    }) : (
                        <View className="py-20 items-center bg-gray-50 rounded-lg">
                            <Ionicons name="videocam-off-outline" size={40} color="#9ca3af" />
                            <Text className="text-lg font-semibold text-gray-700 mt-4">No Vlogs Found</Text>
                            <Text className="text-sm text-gray-500 mt-1">Tap below to create the first one.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-8">
                <TouchableOpacity
                    className="w-full h-14 bg-primary rounded-xl flex-row items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    onPress={() => navigation.navigate('VlogAdd')}
                >
                    <Ionicons name="add" size={24} color="#1f2937" />
                    <Text className="font-bold text-gray-900 text-lg">Add New Vlog</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
