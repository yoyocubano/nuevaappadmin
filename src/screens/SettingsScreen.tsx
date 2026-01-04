import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default function SettingsScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <View className="flex-1 bg-background-light">
            <View className="bg-white px-4 py-4 pt-12 border-b border-gray-100 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-gray-900">Settings</Text>
            </View>

            <ScrollView className="flex-1 px-4 py-6">
                {/* Account Section */}
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Account</Text>
                <View className="bg-white rounded-xl overflow-hidden mb-6">
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                                <Ionicons name="person-outline" size={18} color="#ecb613" />
                            </View>
                            <Text className="text-base font-medium text-gray-900">Edit Profile</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                                <Ionicons name="lock-closed-outline" size={18} color="#ecb613" />
                            </View>
                            <Text className="text-base font-medium text-gray-900">Change Security Code</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

                {/* Preferences Section */}
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Preferences</Text>
                <View className="bg-white rounded-xl overflow-hidden mb-6">
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                <Ionicons name="moon-outline" size={18} color="#4b5563" />
                            </View>
                            <Text className="text-base font-medium text-gray-900">Dark Mode</Text>
                        </View>
                        <Switch value={false} trackColor={{ false: '#e5e7eb', true: '#ecb613' }} />
                    </View>
                    <View className="flex-row items-center justify-between p-4">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                <Ionicons name="notifications-outline" size={18} color="#4b5563" />
                            </View>
                            <Text className="text-base font-medium text-gray-900">Notifications</Text>
                        </View>
                        <Switch value={true} trackColor={{ false: '#e5e7eb', true: '#ecb613' }} />
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    className="bg-white rounded-xl p-4 flex-row items-center justify-center gap-2 border border-red-50"
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text className="text-base font-bold text-red-500">Log Out</Text>
                </TouchableOpacity>

                <Text className="text-center text-xs text-gray-400 mt-6">Welux Admin v1.0.0</Text>
            </ScrollView>
        </View>
    );
}
