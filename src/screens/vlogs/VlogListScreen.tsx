import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Vlog } from '../../types';

export default function VlogListScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const vlogs: Vlog[] = [
        {
            id: '1',
            title: 'Highlights Gala 2023',
            description: 'Keynote speech and award ceremony coverage.',
            status: 'published',
            created_at: 'Oct 12',
            duration: '04:23',
        },
        {
            id: '2',
            title: 'Summer Rooftop Party',
            description: 'Exclusive behind the scenes footage.',
            status: 'draft',
            created_at: 'Edited 2h ago',
        },
        {
            id: '3',
            title: 'New Product Teaser',
            description: 'Uploading video file...',
            status: 'processing',
            created_at: 'Just now',
        },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'published': return { bg: 'bg-green-100', text: 'text-green-700' };
            case 'processing': return { bg: 'bg-blue-100', text: 'text-blue-700' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
        }
    };

    return (
        <View className="flex-1 bg-background-light">
            <View className="bg-white/90 px-4 py-3 pt-12 border-b border-gray-200 flex-row items-center justify-between sticky top-0 z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full hover:bg-black/5 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Vlogs</Text>
                <TouchableOpacity className="w-10 h-10 rounded-full hover:bg-black/5 items-center justify-center">
                    <Ionicons name="filter" size={24} color="#1f2937" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-4">
                <View className="gap-4 pb-24">
                    {vlogs.map((vlog) => (
                        <TouchableOpacity
                            key={vlog.id}
                            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex-row gap-4 items-center"
                            onPress={() => navigation.navigate('VlogEdit', { id: vlog.id })}
                        >
                            <View className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0 relative">
                                {vlog.status === 'processing' ? (
                                    <View className="w-full h-full items-center justify-center bg-gray-100">
                                        <Ionicons name="sync" size={20} color="#ecb613" />
                                    </View>
                                ) : (
                                    <ImageBackground
                                        source={{ uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' }} // Placeholder
                                        className="w-full h-full"
                                    >
                                        <View className="absolute inset-0 bg-black/20" />
                                        {vlog.duration && (
                                            <View className="absolute bottom-1 right-1 bg-black/60 px-1 rounded">
                                                <Text className="text-[10px] font-bold text-white">{vlog.duration}</Text>
                                            </View>
                                        )}
                                    </ImageBackground>
                                )}
                            </View>

                            <View className="flex-1 gap-1">
                                <Text className="font-bold text-gray-900 leading-tight" numberOfLines={1}>
                                    {vlog.title}
                                </Text>
                                <Text className="text-xs font-medium text-gray-500" numberOfLines={1}>
                                    {vlog.description}
                                </Text>
                                <View className="flex-row items-center gap-2 mt-1">
                                    <View className={`px-2 py-0.5 rounded-full ${getStatusStyle(vlog.status).bg}`}>
                                        <Text className={`text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(vlog.status).text}`}>
                                            {vlog.status}
                                        </Text>
                                    </View>
                                    <Text className="text-[10px] text-gray-400">{vlog.created_at}</Text>
                                </View>
                            </View>

                            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                        </TouchableOpacity>
                    ))}

                    <View className="py-8 items-center">
                        <Text className="text-xs font-medium text-gray-400">You've reached the end of the list</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Floating Action Button area */}
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-8">
                <TouchableOpacity
                    className="w-full h-14 bg-primary rounded-xl flex-row items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    onPress={() => navigation.navigate('VlogAdd')}
                >
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                    <Text className="text-base font-bold text-white tracking-wide">Add New Vlog</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
