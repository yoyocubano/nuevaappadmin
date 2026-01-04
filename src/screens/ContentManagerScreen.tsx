import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default function ContentManagerScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View className="flex-1 bg-background-light">
            {/* Header */}
            <View className="bg-white/90 px-4 py-3 pt-12 border-b border-gray-200 flex-row items-center justify-between sticky top-0 z-50">
                <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-primary/20">
                        {/* Avatar Placeholder */}
                        <View className="w-full h-full bg-gray-300 items-center justify-center">
                            <Ionicons name="person" size={24} color="#6b7280" />
                        </View>
                    </View>
                    <View>
                        <Text className="text-xs font-medium text-gray-500">Admin Panel</Text>
                        <Text className="text-base font-bold text-gray-900">Welux Events</Text>
                    </View>
                </View>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                    <Ionicons name="notifications-outline" size={22} color="#374151" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                {/* Greeting Section */}
                <View className="px-4 pt-6 pb-2">
                    <Text className="text-3xl font-bold text-gray-900 mb-1">Good morning</Text>
                    <Text className="text-sm text-gray-500">Here's what's happening today.</Text>
                </View>

                {/* Horizontal Quick Stats Scroll */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="pl-4 py-4"
                    contentContainerStyle={{ paddingRight: 16 }}
                >
                    {/* Stat 1 */}
                    <View className="min-w-[160px] bg-white p-5 rounded-xl border border-gray-100 shadow-sm mr-4">
                        <View className="flex-row items-center gap-2 mb-3">
                            <Ionicons name="videocam" size={20} color="#ecb613" />
                            <Text className="text-sm font-medium text-gray-600">Active Vlogs</Text>
                        </View>
                        <Text className="text-3xl font-bold text-gray-900">12</Text>
                    </View>

                    {/* Stat 2 */}
                    <View className="min-w-[160px] bg-white p-5 rounded-xl border border-gray-100 shadow-sm mr-4">
                        <View className="flex-row items-center gap-2 mb-3">
                            <Ionicons name="briefcase" size={20} color="#ecb613" />
                            <Text className="text-sm font-medium text-gray-600">Open Jobs</Text>
                        </View>
                        <Text className="text-3xl font-bold text-gray-900">5</Text>
                    </View>

                    {/* Stat 3 */}
                    <View className="min-w-[160px] bg-white p-5 rounded-xl border border-gray-100 shadow-sm mr-4">
                        <View className="flex-row items-center gap-2 mb-3">
                            <Ionicons name="pricetag" size={20} color="#ecb613" />
                            <Text className="text-sm font-medium text-gray-600">Active Deals</Text>
                        </View>
                        <Text className="text-3xl font-bold text-gray-900">8</Text>
                    </View>
                </ScrollView>

                <View className="px-4 flex-row items-center justify-between mb-4 mt-2">
                    <Text className="text-xl font-bold text-gray-900">Manage Content</Text>
                    <View className="bg-green-100 px-2 py-1 rounded-full flex-row items-center gap-1">
                        <View className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <Text className="text-[10px] font-bold text-green-700 uppercase">Synced</Text>
                    </View>
                </View>

                {/* Content Navigation Cards */}
                <View className="px-4 gap-4 pb-24">

                    {/* Vlog Manager Card */}
                    <TouchableOpacity
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98]"
                        onPress={() => navigation.navigate('VlogList')}
                    >
                        <View className="p-4 flex-row gap-4 h-40">
                            <View className="flex-1 justify-between py-1">
                                <View>
                                    <View className="flex-row items-center gap-2 mb-2">
                                        <View className="bg-primary/10 p-2 rounded-lg">
                                            <Ionicons name="videocam" size={20} color="#ecb613" />
                                        </View>
                                        <Text className="font-bold text-lg text-gray-900">Vlogs</Text>
                                    </View>
                                    <Text className="text-sm text-gray-500 leading-5">Curate video content and event highlights.</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-sm font-bold text-primary">Manage Vlogs</Text>
                                    <Ionicons name="arrow-forward" size={16} color="#ecb613" />
                                </View>
                            </View>
                            {/* Decorative Image Placeholder */}
                            <View className="w-28 h-full bg-gray-800 rounded-lg overflow-hidden relative">
                                <View className="absolute inset-0 bg-primary/20" />
                                <Ionicons name="play-circle-outline" size={32} color="white" style={{ position: 'absolute', top: '40%', left: '35%' }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Jobs Board Card */}
                    <TouchableOpacity
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98]"
                        onPress={() => navigation.navigate('JobList')}
                    >
                        <View className="p-4 flex-row gap-4 h-40">
                            <View className="flex-1 justify-between py-1">
                                <View>
                                    <View className="flex-row items-center gap-2 mb-2">
                                        <View className="bg-primary/10 p-2 rounded-lg">
                                            <Ionicons name="briefcase" size={20} color="#ecb613" />
                                        </View>
                                        <Text className="font-bold text-lg text-gray-900">Jobs</Text>
                                    </View>
                                    <Text className="text-sm text-gray-500 leading-5">Post openings and review new applicants.</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-sm font-bold text-primary">Manage Jobs</Text>
                                    <Ionicons name="arrow-forward" size={16} color="#ecb613" />
                                </View>
                            </View>
                            <View className="w-28 h-full bg-gray-700 rounded-lg overflow-hidden relative justify-center items-center">
                                <Ionicons name="business-outline" size={32} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Stream Control Card */}
                    <TouchableOpacity
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98]"
                        onPress={() => navigation.navigate('StreamControl')}
                    >
                        <View className="p-4 flex-row gap-4 h-40">
                            <View className="flex-1 justify-between py-1">
                                <View>
                                    <View className="flex-row items-center gap-2 mb-2">
                                        <View className="bg-red-50 p-2 rounded-lg">
                                            <Ionicons name="radio" size={20} color="#ef4444" />
                                        </View>
                                        <Text className="font-bold text-lg text-gray-900">Stream Control</Text>
                                    </View>
                                    <Text className="text-sm text-gray-500 leading-5">Update live feed source and monitor status.</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-sm font-bold text-red-500">Go to Studio</Text>
                                    <Ionicons name="arrow-forward" size={16} color="#ef4444" />
                                </View>
                            </View>
                            <View className="w-28 h-full bg-gray-900 rounded-lg overflow-hidden relative justify-center items-center">
                                <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <Ionicons name="videocam-outline" size={32} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}
