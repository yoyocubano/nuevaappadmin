import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import './global.css';

// Auth
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';

// Content Screens - Vlogs
import VlogListScreen from './src/screens/vlogs/VlogListScreen';
import VlogAddScreen from './src/screens/vlogs/VlogAddScreen';
import VlogEditScreen from './src/screens/vlogs/VlogEditScreen';

// Content Screens - Jobs
import JobListScreen from './src/screens/jobs/JobListScreen';
import JobAddScreen from './src/screens/jobs/JobAddScreen';
import JobEditScreen from './src/screens/jobs/JobEditScreen';

// Content Screens - Stream
import StreamControlScreen from './src/screens/StreamControlScreen';

// Types
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

// Navigator that handles Auth State Logic
const RootNavigator = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light">
                <ActivityIndicator size="large" color="#ecb613" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#FAF8F3' }
            }}
        >
            {session ? (
                // Authenticated Stack
                <>
                    <Stack.Screen name="MainTabs" component={MainTabNavigator} />

                    {/* Content Flows */}
                    <Stack.Screen name="VlogList" component={VlogListScreen} />
                    <Stack.Screen name="VlogAdd" component={VlogAddScreen} />
                    <Stack.Screen name="VlogEdit" component={VlogEditScreen} />

                    <Stack.Screen name="JobList" component={JobListScreen} />
                    <Stack.Screen name="JobAdd" component={JobAddScreen} />
                    <Stack.Screen name="JobEdit" component={JobEditScreen} />

                    <Stack.Screen name="StreamControl" component={StreamControlScreen} />
                </>
            ) : (
                // Non-Authenticated Stack
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <NavigationContainer>
                    <RootNavigator />
                    <StatusBar style="dark" />
                </NavigationContainer>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
