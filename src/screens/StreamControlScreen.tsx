import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default function StreamControlScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [streamId, setStreamId] = useState('');

    return (
        <View className="flex-1 bg-background-light">
            <View className="bg-white/95 px-6 py-4 pt-12 border-b border-gray-200 flex-row items-center justify-between sticky top-0 z-50">
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-8 h-8 rounded-full items-center justify-center -ml-2"
                    >
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text className="text-xl font-extrabold text-gray-900 tracking-tight">Stream Controller</Text>
                </View>
                <View className="flex-row items-center gap-2 bg-green-50 px-2 py-1 rounded-full">
                    <Text className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Connected</Text>
                    <Ionicons name="wifi" size={14} color="#15803d" />
                </View>
            </View>

            <ScrollView className="flex-1 p-4">
                {/* Preview Card */}
                <View className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-sm mb-6">
                    <View className="w-full aspect-video bg-gray-800 relative">
                        <ImageBackground
                            source={{ uri: 'https://images.unsplash.com/photo-1501612780327-6c5796bbab4b' }}
                            className="w-full h-full opacity-80"
                        >
                            <View className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded flex-row items-center gap-2 backdrop-blur-md">
                                <View className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <Text className="text-white text-[10px] font-bold tracking-wider">LIVE</Text>
                            </View>
                            <View className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                <Text className="text-xs font-medium text-white/80 mb-0.5">PREVIEW</Text>
                                <Text className="text-lg font-bold text-white leading-tight">Gala Night Main Stage</Text>
                            </View>
                        </ImageBackground>
                    </View>

                    <View className="px-5 py-4 flex-row items-center justify-between bg-white">
                        <View>
                            <Text className="text-xs text-gray-500 uppercase tracking-wide">Viewer Count</Text>
                            <Text className="text-lg font-bold text-gray-900">1,248</Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-xs text-gray-500 uppercase tracking-wide">Duration</Text>
                            <Text className="text-lg font-bold text-gray-900">01:42:15</Text>
                        </View>
                    </View>
                </View>

                <View className="h-px bg-gray-200 w-full mb-6" />

                {/* Update Source Section */}
                <View className="mb-6">
                    <View className="mb-4">
                        <Text className="text-2xl font-bold text-gray-900">Update Source</Text>
                        <Text className="text-sm text-gray-500 mt-1 leading-5">
                            Enter the YouTube Video ID or full URL below to switch the live feed instantly.
                        </Text>
                    </View>

                    <View className="gap-2">
                        <Text className="text-sm font-semibold text-gray-900">New Stream Source</Text>
                        <View className="relative">
                            <TextInput
                                className="w-full h-14 pl-4 pr-12 rounded-lg bg-white border border-gray-300 text-base focus:border-primary"
                                placeholder="e.g., dQw4w9WgXcQ"
                                value={streamId}
                                onChangeText={setStreamId}
                            />
                            <TouchableOpacity className="absolute right-0 top-0 bottom-0 px-4 items-center justify-center">
                                <Ionicons name="clipboard-outline" size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center gap-1 mt-1 px-1">
                            <Ionicons name="information-circle-outline" size={14} color="#6b7280" />
                            <Text className="text-xs text-gray-500">Updates reflect immediately on the public site.</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        className="w-full h-14 bg-primary rounded-lg shadow-lg shadow-primary/20 flex-row items-center justify-center gap-2 mt-6 active:scale-[0.98]"
                    >
                        <Text className="font-extrabold text-white text-base tracking-widest uppercase">Update Stream</Text>
                        <Ionicons name="sync" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Logs */}
                <View className="mt-2 pb-12">
                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Recent Activity</Text>
                    <View className="gap-3">
                        <View className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex-row items-start gap-3">
                            <Ionicons name="checkmark-circle" size={18} color="#10b981" style={{ marginTop: 2 }} />
                            <View className="flex-1">
                                <Text className="text-sm font-semibold text-gray-900">Stream Updated Successfully</Text>
                                <Text className="text-xs text-gray-500">Changed to ID: <Text className="font-mono">dQw4w9WgXcQ</Text></Text>
                            </View>
                            <Text className="text-xs text-gray-400">10:42 AM</Text>
                        </View>

                        <View className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex-row items-start gap-3 opacity-60">
                            <Ionicons name="time-outline" size={18} color="#9ca3af" style={{ marginTop: 2 }} />
                            <View className="flex-1">
                                <Text className="text-sm font-semibold text-gray-900">Stream Started</Text>
                                <Text className="text-xs text-gray-500">Initial boot sequence</Text>
                            </View>
                            <Text className="text-xs text-gray-400">09:00 AM</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
