import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import './global.css';

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

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: '#FAF8F3' },
                    }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="MainTabs" component={MainTabNavigator} />

                    {/* Content Flows */}
                    <Stack.Screen name="VlogList" component={VlogListScreen} />
                    <Stack.Screen name="VlogAdd" component={VlogAddScreen} />
                    <Stack.Screen name="VlogEdit" component={VlogEditScreen} />

                    <Stack.Screen name="JobList" component={JobListScreen} />
                    <Stack.Screen name="JobAdd" component={JobAddScreen} />
                    <Stack.Screen name="JobEdit" component={JobEditScreen} />

                    <Stack.Screen name="StreamControl" component={StreamControlScreen} />
                </Stack.Navigator>
                <StatusBar style="dark" />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
