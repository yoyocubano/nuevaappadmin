import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState({
        totalLeads: 0,
        streamStatus: 'LIVE',
        systemHealth: 99.9,
    });

    const onRefresh = async () => {
        setRefreshing(true);
        await loadStats();
        setRefreshing(false);
    };

    const loadStats = async () => {
        try {
            const { data: leads } = await supabase.from('leads').select('*');
            setStats(prev => ({
                ...prev,
                totalLeads: leads?.length || 0,
            }));
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    return (
        <View className="flex-1 bg-background-light">
            {/* Top App Bar */}
            <View className="bg-white/95 px-4 py-3 border-b border-gray-100 pt-12">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        <View className="relative">
                            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                                <Ionicons name="person" size={20} color="#ecb613" />
                            </View>
                            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </View>
                        <View>
                            <Text className="text-sm font-bold text-gray-900">Welux Admin</Text>
                            <Text className="text-xs text-gray-500">Events Manager</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                        <Ionicons name="notifications-outline" size={22} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-4 pt-6"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ecb613" />
                }
            >
                {/* Headline */}
                <View className="mb-6">
                    <Text className="text-3xl font-extrabold text-gray-900 mb-1">Dashboard Overview</Text>
                    <Text className="text-sm text-gray-500">Welcome back, here's what's happening today.</Text>
                </View>

                {/* Stats Grid */}
                <View className="flex-row gap-4 mb-6">
                    {/* Total Leads Card */}
                    <View className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <View className="flex-row items-center justify-between mb-4">
                            <View className="bg-primary/10 p-2 rounded-lg">
                                <Ionicons name="people" size={20} color="#ecb613" />
                            </View>
                            <View className="bg-green-50 px-2 py-1 rounded-full flex-row items-center gap-1">
                                <Ionicons name="trending-up" size={14} color="#10b981" />
                                <Text className="text-xs font-bold text-green-600">12%</Text>
                            </View>
                        </View>
                        <Text className="text-sm font-medium text-gray-500">Total Leads</Text>
                        <Text className="text-2xl font-bold text-gray-900 mt-1">{stats.totalLeads}</Text>
                    </View>

                    {/* Stream Status Card */}
                    <View className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                        <View className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full" style={{ opacity: 0.5 }} />
                        <View className="flex-row items-center justify-between mb-4 relative z-10">
                            <View className="bg-red-50 p-2 rounded-lg">
                                <Ionicons name="videocam" size={20} color="#ef4444" />
                            </View>
                            <View className="w-3 h-3 relative">
                                <View className="absolute w-full h-full bg-primary rounded-full animate-ping" style={{ opacity: 0.75 }} />
                                <View className="w-3 h-3 bg-primary rounded-full" />
                            </View>
                        </View>
                        <Text className="text-sm font-medium text-gray-500 relative z-10">Stream Status</Text>
                        <Text className="text-2xl font-bold text-primary mt-1 relative z-10">{stats.streamStatus}</Text>
                    </View>
                </View>

                {/* System Health */}
                <View className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="server-outline" size={20} color="#9ca3af" />
                            <Text className="text-base font-bold text-gray-900">System Health</Text>
                        </View>
                        <Text className="text-sm font-bold text-primary">{stats.systemHealth}%</Text>
                    </View>
                    <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <View className="h-full bg-primary rounded-full" style={{ width: `${stats.systemHealth}%` }} />
                    </View>
                    <View className="flex-row items-center justify-between mt-3">
                        <View className="flex-row items-center gap-1.5">
                            <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <Text className="text-xs font-medium text-green-600">Supabase: Connected</Text>
                        </View>
                        <Text className="text-xs text-gray-400">Latency: 24ms</Text>
                    </View>
                </View>

                {/* Lead Growth Chart */}
                <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                    <View className="p-5 pb-0">
                        <View className="flex-row items-end justify-between">
                            <View>
                                <Text className="text-base font-bold text-gray-900">Weekly Growth</Text>
                                <Text className="text-xs text-gray-500 mt-1">New leads over last 7 days</Text>
                            </View>
                            <Text className="text-2xl font-bold text-gray-900">+12%</Text>
                        </View>
                    </View>

                    {/* Simple Chart Visualization */}
                    <View className="h-36 mt-4">
                        <Svg width={width - 32} height={140} viewBox="0 0 400 140" preserveAspectRatio="none">
                            <Defs>
                                <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0%" stopColor="#ecb613" stopOpacity="0.2" />
                                    <Stop offset="100%" stopColor="#ecb613" stopOpacity="0" />
                                </LinearGradient>
                            </Defs>
                            <Path
                                d="M0,140 L0,100 C50,100 50,40 100,40 C150,40 150,80 200,80 C250,80 250,20 300,20 C350,20 350,60 400,60 L400,140 Z"
                                fill="url(#chartGradient)"
                            />
                            <Path
                                d="M0,100 C50,100 50,40 100,40 C150,40 150,80 200,80 C250,80 250,20 300,20 C350,20 350,60 400,60"
                                fill="none"
                                stroke="#ecb613"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </Svg>
                    </View>
                </View>

                {/* Recent Alerts */}
                <View className="mb-6 pb-6">
                    <Text className="text-lg font-bold text-gray-900 px-1 mb-4">Recent Alerts</Text>

                    <View className="space-y-3">
                        {/* Alert 1 */}
                        <View className="flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
                                <Ionicons name="person-add-outline" size={20} color="#3b82f6" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm font-bold text-gray-900">New VIP Registration</Text>
                                <Text className="text-xs text-gray-500">Sarah Jenkins - Corporate Package</Text>
                            </View>
                            <Text className="text-xs font-medium text-gray-400">2m ago</Text>
                        </View>

                        {/* Alert 2 */}
                        <View className="flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <View className="w-10 h-10 rounded-full bg-orange-50 items-center justify-center">
                                <Ionicons name="key-outline" size={20} color="#f97316" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm font-bold text-gray-900">Stream Key Updated</Text>
                                <Text className="text-xs text-gray-500">Admin updated RTMP settings</Text>
                            </View>
                            <Text className="text-xs font-medium text-gray-400">1h ago</Text>
                        </View>

                        {/* Alert 3 */}
                        <View className="flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center">
                                <Ionicons name="cloud-done-outline" size={20} color="#10b981" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm font-bold text-gray-900">Database Backup</Text>
                                <Text className="text-xs text-gray-500">Daily snapshot created successfully</Text>
                            </View>
                            <Text className="text-xs font-medium text-gray-400">4h ago</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
