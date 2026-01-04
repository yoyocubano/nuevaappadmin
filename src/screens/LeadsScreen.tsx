import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';
import { Lead } from '../types';

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
    const [leads, setLeads] = useState<Lead[]>([
        // Mock data for initial render matching the HTML example
        {
            id: '1',
            name: 'Alexander Hamilton',
            email: 'alex@example.com',
            event_type: 'Corporate Gala',
            status: 'new',
            created_at: '2h ago',
            message: 'Looking to host a gala for 200 guests. We need full catering and venue decoration services. Prefer a gold and black theme similar to your recent showcase.',
        },
        {
            id: '2',
            name: 'Sarah Jennings',
            email: 'sarah@example.com',
            event_type: 'Private Birthday',
            status: 'contacted',
            created_at: 'Yesterday',
            message: 'Inquiring about availability for a 30th birthday party on Dec 15th. Approximately 40 guests. Do you offer DJ services as well?',
        },
        {
            id: '3',
            name: 'Michael Ross',
            email: 'mike@example.com',
            event_type: 'Wedding',
            status: 'booked',
            created_at: '2 days ago',
            message: 'Planning a wedding for next summer. We are interested in your outdoor venue package. Can we schedule a site visit?',
        },
    ]);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return '#ecb613'; // primary
            case 'booked': return '#10b981'; // green
            default: return '#9ca3af'; // gray
        }
    };

    return (
        <View className="flex-1 bg-background-light">
            {/* Header */}
            <View className="bg-white px-4 py-4 pt-12 border-b border-gray-100 flex-row items-center justify-between sticky top-0 z-10">
                <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Inquiries</Text>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                    <Ionicons name="filter" size={24} color="#1f2937" />
                </TouchableOpacity>
            </View>

            {/* Filter Chips */}
            <View className="bg-white border-b border-gray-100 py-3">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 gap-3">
                    {FILTERS.map((filter) => {
                        const isActive = activeFilter === filter.id;
                        return (
                            <TouchableOpacity
                                key={filter.id}
                                onPress={() => setActiveFilter(filter.id)}
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
            <ScrollView className="flex-1 px-4 pt-4">
                <View className="gap-4 pb-24">
                    {leads.map((lead) => (
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
                                    <Text className="text-base font-bold text-gray-900">{lead.name}</Text>
                                    <View className="flex-row items-center">
                                        <View className="bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                                            <Text className="text-[10px] font-bold uppercase text-primary-dark">
                                                {lead.event_type}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View className="items-end gap-1">
                                    <Text className="text-xs font-medium text-gray-400">{lead.created_at}</Text>
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
                                        <Text className="text-sm text-gray-500 leading-relaxed">
                                            {lead.message}
                                        </Text>
                                    </View>
                                    <View className="flex-row gap-3 mt-2">
                                        <TouchableOpacity className="flex-1 h-10 bg-primary rounded-lg flex-row items-center justify-center gap-2 shadow-sm">
                                            <Ionicons name="call" size={16} color="#1f2937" />
                                            <Text className="text-gray-900 text-xs font-bold">Call</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="flex-1 h-10 bg-gray-100 rounded-lg flex-row items-center justify-center gap-2">
                                            <Ionicons name="mail" size={16} color="#1f2937" />
                                            <Text className="text-gray-900 text-xs font-bold">Email</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
