import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';
import { Lead } from '../types';
import { HapticsService } from '../utils/haptics';
import { ScreenHeader } from '../components/ScreenHeader';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FILTERS = [
    { id: 'all', label: 'All', icon: 'list' },
    { id: 'new', label: 'New', icon: 'flash' },
    { id: 'contacted', label: 'Contacted', icon: 'mail-open' },
    { id: 'booked', label: 'Booked', icon: 'bookmark' },
];

export default function LeadsScreen() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch Real Data
    const fetchLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching leads:', error);
            } else {
                setLeads(data || []);
            }
        } catch (err) {
            console.error('Exception fetching leads:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const onRefresh = () => {
        HapticsService.light();
        setRefreshing(true);
        fetchLeads();
    };

    const handleFilterPress = (filterId: string) => {
        HapticsService.selection();
        setActiveFilter(filterId);
    };

    const toggleExpand = (id: string) => {
        HapticsService.light();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredLeads = activeFilter === 'all'
        ? leads
        : leads.filter(l => l.status === activeFilter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return '#ecb613'; // primary
            case 'booked': return '#10b981'; // green
            case 'lost': return '#ef4444'; // red
            default: return '#9ca3af'; // gray
        }
    };

    return (
        <View className="flex-1 bg-background-light">
            <ScreenHeader
                title="Inquiries"
                rightIcon="filter"
                onRightPress={() => {
                    HapticsService.medium();
                    // Open detailed filter modal logic here
                }}
            />

            {/* Filter Chips */}
            <View className="bg-white border-b border-gray-100 py-3">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 gap-3">
                    {FILTERS.map((filter) => {
                        const isActive = activeFilter === filter.id;
                        return (
                            <TouchableOpacity
                                key={filter.id}
                                onPress={() => handleFilterPress(filter.id)}
                                className={`flex-row items-center h-8 px-4 rounded-full border ${isActive
                                        ? 'bg-primary border-primary'
                                        : 'bg-gray-50 border-transparent'
                                    } mr-2`}
                            >
                                <Ionicons
                                    name={isActive ? 'checkmark' : filter.icon as any}
                                    size={14}
                                    color={isActive ? '#1f2937' : '#9ca3af'}
                                    style={{ marginRight: 6 }}
                                />
                                <Text
                                    className={`text-xs font-bold uppercase tracking-wide ${isActive ? 'text-gray-900' : 'text-gray-500'
                                        }`}
                                >
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Leads List */}
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#ecb613" />
                    <Text className="text-gray-400 text-xs mt-4">Syncing CRM Data...</Text>
                </View>
            ) : (
                <ScrollView
                    className="flex-1 px-4 pt-4"
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ecb613" />
                    }
                >
                    {filteredLeads.length === 0 ? (
                        <View className="py-20 items-center opacity-50">
                            <Ionicons name="file-tray-outline" size={48} color="#9ca3af" />
                            <Text className="text-gray-500 mt-2 font-medium">No leads found</Text>
                        </View>
                    ) : (
                        <View className="gap-4 pb-24">
                            {filteredLeads.map((lead) => (
                                <TouchableOpacity
                                    key={lead.id}
                                    activeOpacity={0.9}
                                    onPress={() => toggleExpand(lead.id)}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <View className="p-4 relative flex-row items-start pl-7">
                                        {/* Status Stripe */}
                                        <View
                                            className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
                                            style={{ backgroundColor: getStatusColor(lead.status) }}
                                        />

                                        <View className="flex-1 gap-1">
                                            <Text className="text-base font-bold text-gray-900">{lead.full_name}</Text>
                                            <View className="flex-row items-center flex-wrap gap-2">
                                                <View className="bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                                                    <Text className="text-[10px] font-bold uppercase text-primary-dark">
                                                        {lead.event_type}
                                                    </Text>
                                                </View>
                                                {lead.event_date && (
                                                    <Text className="text-xs text-gray-400">
                                                        📅 {new Date(lead.event_date).toLocaleDateString()}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>

                                        <View className="items-end gap-1">
                                            <Text className="text-xs font-medium text-gray-400">
                                                {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </Text>
                                            <Ionicons
                                                name={expandedId === lead.id ? "chevron-up" : "chevron-down"}
                                                size={20}
                                                color="#9ca3af"
                                            />
                                        </View>
                                    </View>

                                    {/* Expanded Content */}
                                    {expandedId === lead.id && (
                                        <View className="px-4 pb-4 pt-0 pl-7 border-t border-gray-50">
                                            <View className="py-3">
                                                <Text className="text-sm text-gray-500 leading-relaxed italic">
                                                    "{lead.message}"
                                                </Text>
                                                <View className="mt-3 flex-row gap-4">
                                                    <View>
                                                        <Text className="text-[10px] font-bold text-gray-400 uppercase">EMAIL</Text>
                                                        <Text className="text-xs text-gray-900">{lead.email}</Text>
                                                    </View>
                                                    {lead.phone && (
                                                        <View>
                                                            <Text className="text-[10px] font-bold text-gray-400 uppercase">PHONE</Text>
                                                            <Text className="text-xs text-gray-900">{lead.phone}</Text>
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                            <View className="flex-row gap-3 mt-2">
                                                <TouchableOpacity
                                                    className="flex-1 h-10 bg-primary rounded-lg flex-row items-center justify-center gap-2 shadow-sm"
                                                    onPress={() => HapticsService.medium()}
                                                >
                                                    <Ionicons name="call" size={16} color="#1f2937" />
                                                    <Text className="text-gray-900 text-xs font-bold">Call</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    className="flex-1 h-10 bg-gray-100 rounded-lg flex-row items-center justify-center gap-2"
                                                    onPress={() => HapticsService.light()}
                                                >
                                                    <Ionicons name="mail" size={16} color="#1f2937" />
                                                    <Text className="text-gray-900 text-xs font-bold">Email</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}
