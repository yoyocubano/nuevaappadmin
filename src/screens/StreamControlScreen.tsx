import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    Alert,
    RefreshControl,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { HapticsService } from '../utils/haptics';
import { ScreenHeader } from '../components/ScreenHeader';

export default function StreamControlScreen() {
    const { session } = useAuth();
    const [streamId, setStreamId] = useState('');
    const [currentStreamId, setCurrentStreamId] = useState('');
    const [isLive, setIsLive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const userName = session?.user?.user_metadata?.full_name?.split(' ')[0] || 'Admin';

    const fetchStreamConfig = useCallback(async () => {
        const { data, error } = await supabase
            .from('stream_config')
            .select('*')
            .eq('id', 1)
            .single();

        setLoading(false);

        if (error) {
            console.error("Error fetching stream config:", error.message);
            setError("Couldn't load stream data.");
        } else if (data) {
            setCurrentStreamId(data.youtube_video_id || '');
            setStreamId(data.youtube_video_id || '');
            setIsLive(data.is_live || false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchStreamConfig();
        }, [fetchStreamConfig])
    );

    const handleToggleLive = async () => {
        HapticsService.section();
        const newState = !isLive;
        setIsUpdating(true);

        const { error } = await supabase
            .from('stream_config')
            .update({ is_live: newState, updated_at: new Date().toISOString() })
            .eq('id', 1);

        if (error) {
            HapticsService.error();
            Alert.alert('Error', 'Failed to update live status.');
        } else {
            setIsLive(newState);
            HapticsService.success();
        }
        setIsUpdating(false);
    };

    const handleUpdateStream = async () => {
        HapticsService.light();

        if (!streamId) {
            HapticsService.error();
            Alert.alert('Video ID Required', 'Please enter a YouTube video ID.');
            return;
        }

        setIsUpdating(true);
        const { error } = await supabase
            .from('stream_config')
            .update({ youtube_video_id: streamId, updated_at: new Date().toISOString() })
            .eq('id', 1);

        setIsUpdating(false);

        if (error) {
            HapticsService.error();
            Alert.alert("Update Failed", "Could not update the stream ID.");
        } else {
            setCurrentStreamId(streamId);
            HapticsService.success();
            Alert.alert("Stream Updated", "The live stream source has been updated.");
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const youtubeThumbnailUrl = `https://img.youtube.com/vi/${currentStreamId}/hqdefault.jpg`;

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light">
                <ActivityIndicator size="large" color="#ecb613" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background-light">
            <ScreenHeader title="Live Control" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchStreamConfig} />}
                >
                    {/* Greeting Section */}
                    <View className="px-6 py-6 pb-2">
                        <Text className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: 'serif' }}>
                            {getGreeting()}, {userName}.
                        </Text>
                        <Text className="text-base text-gray-500 mt-1">Ready to broadcast?</Text>
                    </View>

                    {/* LIVE STATUS TOGGLE (Fusionado) */}
                    <View className="px-4 py-4">
                        <View className={`bg-white rounded-2xl p-6 shadow-sm border ${isLive ? 'border-red-100' : 'border-gray-100'} items-center`}>
                            <View className={`w-16 h-16 rounded-full items-center justify-center mb-3 ${isLive ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-gray-100'}`}>
                                <Ionicons name="radio" size={28} color={isLive ? 'white' : '#9ca3af'} />
                            </View>
                            <Text className="text-xl font-bold text-gray-900 mb-1">
                                {isLive ? 'ON AIR' : 'OFFLINE'}
                            </Text>
                            <Text className="text-gray-500 text-xs mb-5 text-center">
                                {isLive
                                    ? 'Broadcast is live on the public app.'
                                    : 'Start stream to make it visible.'}
                            </Text>

                            <TouchableOpacity
                                className={`w-full h-12 rounded-xl items-center justify-center flex-row gap-2 ${isLive ? 'bg-gray-900' : 'bg-red-500 shadow-lg shadow-red-500/30'
                                    } ${isUpdating ? 'opacity-70' : ''}`}
                                onPress={handleToggleLive}
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Ionicons name={isLive ? 'stop-circle-outline' : 'play-circle-outline'} size={20} color="white" />
                                        <Text className="text-white font-bold text-base">
                                            {isLive ? 'End Broadcast' : 'Go Live Now'}
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* PREVIEW SECTION (Tu diseño mejorado) */}
                    <View className="px-4 mb-2">
                        <Text className="text-xs font-bold tracking-widest text-gray-500 uppercase ml-1 mb-2">Current Feed Preview</Text>
                        <View className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-sm mb-6">
                            <View className="w-full aspect-video bg-gray-800 relative">
                                <ImageBackground source={{ uri: youtubeThumbnailUrl }} className="w-full h-full opacity-80" />
                                {isLive && (
                                    <View className="absolute top-3 left-3 bg-red-600 px-2 py-1 rounded flex-row items-center gap-2 shadow-sm">
                                        <View className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        <Text className="text-white text-[10px] font-bold tracking-wider">LIVE</Text>
                                    </View>
                                )}
                                <View className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                    <Text className="text-[10px] font-medium text-white/70 mb-0.5 uppercase tracking-wide">Source ID</Text>
                                    <Text className="text-base font-bold text-white leading-tight font-mono">{currentStreamId || 'Not Configured'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* UPDATE SOURCE SECTION */}
                    <View className="px-4 mb-10">
                        <View className="mb-2">
                            <Text className="text-lg font-bold text-gray-900">Config Source</Text>
                        </View>
                        <TextInput
                            className="w-full h-14 pl-4 pr-12 rounded-lg bg-white border border-gray-300 text-base focus:border-primary font-mono shadow-sm"
                            placeholder="e.g., dQw4w9WgXcQ"
                            value={streamId}
                            onChangeText={setStreamId}
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isUpdating}
                        />
                        <TouchableOpacity
                            className={`w-full h-14 rounded-lg shadow-lg flex-row items-center justify-center gap-2 mt-4 active:scale-[0.98] ${isUpdating ? 'bg-primary/70' : 'bg-primary shadow-primary/20'}`}
                            onPress={handleUpdateStream}
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <ActivityIndicator color="#1f2937" />
                            ) : (
                                <>
                                    <Ionicons name="sync" size={20} color="#1f2937" />
                                    <Text className="font-extrabold text-gray-900 text-base tracking-wide uppercase">Update Source</Text>
                                </>)}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
