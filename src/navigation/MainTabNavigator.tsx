import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import LeadsScreen from '../screens/LeadsScreen';
import ContentManagerScreen from '../screens/ContentManagerScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabBarIconProps {
    focused: boolean;
    iconName: keyof typeof Ionicons.glyphMap;
    label: string;
}

const CustomTabBarIcon: React.FC<TabBarIconProps> = ({ focused, iconName, label }) => (
    <View className="flex-col items-center gap-1">
        <Ionicons
            name={iconName}
            size={26}
            color={focused ? '#ecb613' : '#9ca3af'}
        />
        <Text className={`text-[10px] font-${focused ? 'bold' : 'medium'} ${focused ? 'text-primary' : 'text-gray-400'}`}>
            {label}
        </Text>
    </View>
);

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopColor: '#e5e7eb',
                    borderTopWidth: 1,
                    paddingTop: 8,
                    paddingBottom: 24,
                    height: 80,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 10,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon focused={focused} iconName="grid-outline" label="Home" />
                    ),
                }}
            />
            <Tab.Screen
                name="Leads"
                component={LeadsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon focused={focused} iconName="people-outline" label="Leads" />
                    ),
                }}
            />
            <Tab.Screen
                name="Content"
                component={ContentManagerScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon focused={focused} iconName="calendar-outline" label="Events" />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon focused={focused} iconName="settings-outline" label="Settings" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
