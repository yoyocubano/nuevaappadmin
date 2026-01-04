import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { signInWithPassword } from '../services/supabase';
import { RootStackParamList } from '../types';
import { HapticsService } from '../utils/haptics';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        HapticsService.light();

        if (!email || !password) {
            HapticsService.error();
            Alert.alert('Input required', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        const { error } = await signInWithPassword(email, password);

        if (error) {
            HapticsService.error();
            Alert.alert('Login Failed', error.message);
            setLoading(false);
        } else {
            HapticsService.success();
            // Success navigation will be handled by AuthContext state change logic
            // But if we don't implement AuthContext immediately, we might need manual navigation here as fallback.
            // For safety in this step, let's keep the manual navigation for testing until Step 3 is live.
            setLoading(false);
            navigation.replace('MainTabs');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-background-light"
        >
            <View className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <View className="absolute -top-[10%] -right-[10%] w-[50%] h-[30%] bg-primary/10 rounded-full blur-3xl" />
                <View className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
            </View>

            <View className="flex-1 items-center justify-center px-6 py-10 relative z-10">
                <View className="w-full items-center mb-12">
                    <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-6 shadow-lg shadow-primary/30">
                        <Ionicons name="diamond" size={32} color="white" />
                    </View>
                    <Text className="text-4xl font-bold text-center text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
                        Welux Events
                    </Text>
                    <Text className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 text-center">
                        Administration Access
                    </Text>
                </View>

                <View className="w-full max-w-md space-y-4 gap-4">
                    <View className="gap-2">
                        <Text className="text-gray-900 text-sm font-bold pl-1 uppercase tracking-wide">Email</Text>
                        <TextInput
                            className="h-14 px-4 rounded-lg bg-white border border-gray-300 focus:border-primary text-gray-900 text-base shadow-sm"
                            placeholder="admin@welux.com"
                            placeholderTextColor="#9ca3af"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            editable={!loading}
                        />
                    </View>

                    <View className="gap-2">
                        <Text className="text-gray-900 text-sm font-bold pl-1 uppercase tracking-wide">Password</Text>
                        <View className="relative flex-row items-center">
                            <TextInput
                                className="flex-1 h-14 pl-4 pr-12 rounded-lg bg-white border border-gray-300 focus:border-primary text-gray-900 text-base shadow-sm"
                                placeholder="Enter your password"
                                placeholderTextColor="#9ca3af"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                onSubmitEditing={handleLogin}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                className="absolute right-0 h-full px-4 items-center justify-center"
                                onPress={() => {
                                    HapticsService.selection();
                                    setShowPassword(!showPassword);
                                }}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={24}
                                    color="#9ca3af"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        className={`w-full h-14 rounded-lg items-center justify-center shadow-lg active:scale-95 transition-all mt-4 ${loading ? 'bg-primary/70' : 'bg-primary'
                            }`}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text className="text-white text-base font-bold tracking-wide">
                                SIGN IN
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="mt-auto pt-10 pb-4 w-full items-center">
                    <TouchableOpacity onPress={() => HapticsService.light()}>
                        <Text className="text-gray-500 text-xs font-medium">
                            Forgot Password? Contact IT Support
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
