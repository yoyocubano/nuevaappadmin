import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { verifyAdminCode } from '../services/supabase';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [code, setCode] = useState('');
    const [showCode, setShowCode] = useState(false);

    const handleVerifyAccess = () => {
        if (verifyAdminCode(code)) {
            navigation.replace('MainTabs');
        } else {
            Alert.alert('Error', 'Código de seguridad incorrecto');
            setCode('');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-background-light"
        >
            {/* Background Decorative Elements */}
            <View className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <View className="absolute -top-[10%] -right-[10%] w-[50%] h-[30%] bg-primary/10 rounded-full blur-3xl" />
                <View className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
            </View>

            <View className="flex-1 items-center justify-center px-6 py-10 relative z-10">
                {/* Logo / Header Section */}
                <View className="w-full items-center mb-12">
                    <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-6 shadow-lg">
                        <Ionicons name="diamond" size={32} color="white" />
                    </View>
                    <Text className="text-4xl font-bold text-center text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
                        Welux Events
                    </Text>
                    <Text className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 text-center">
                        Administration Access
                    </Text>
                </View>

                {/* Login Form */}
                <View className="w-full max-w-md space-y-6">
                    {/* Master Security Code Input */}
                    <View className="space-y-2">
                        <Text className="text-gray-900 text-sm font-medium pl-1">
                            Master Security Code
                        </Text>
                        <View className="relative flex-row items-center">
                            <TextInput
                                className="flex-1 h-14 pl-4 pr-12 rounded-lg bg-white border border-gray-300 focus:border-primary text-gray-900 text-base font-medium shadow-sm"
                                placeholder="Enter 6-digit code"
                                placeholderTextColor="#897f61"
                                value={code}
                                onChangeText={setCode}
                                secureTextEntry={!showCode}
                                keyboardType="number-pad"
                                maxLength={6}
                                onSubmitEditing={handleVerifyAccess}
                            />
                            <TouchableOpacity
                                className="absolute right-0 h-full px-4 items-center justify-center"
                                onPress={() => setShowCode(!showCode)}
                            >
                                <Ionicons
                                    name={showCode ? 'eye-off-outline' : 'eye-outline'}
                                    size={24}
                                    color="#897f61"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Primary Action Button */}
                    <TouchableOpacity
                        className="w-full h-14 bg-primary rounded-lg items-center justify-center shadow-lg active:scale-98"
                        onPress={handleVerifyAccess}
                    >
                        <Text className="text-gray-900 text-base font-bold tracking-wide">
                            Verify Access
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="flex-row items-center gap-4 py-2">
                        <View className="h-px bg-gray-300 flex-1" />
                        <Text className="text-gray-400 text-xs font-medium uppercase">Or</Text>
                        <View className="h-px bg-gray-300 flex-1" />
                    </View>

                    {/* FaceID Button */}
                    <TouchableOpacity className="w-full h-12 border border-gray-300 rounded-lg items-center justify-center flex-row gap-2">
                        <Ionicons name="finger-print-outline" size={20} color="#181611" />
                        <Text className="text-gray-900 text-sm font-bold tracking-wide">
                            Sign in with FaceID
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="mt-auto pt-10 pb-4 w-full items-center">
                    <TouchableOpacity>
                        <Text className="text-gray-400 text-xs underline">
                            Forgot Code? Contact IT Support
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
