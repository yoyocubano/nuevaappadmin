import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
    title: string;
    showBack?: boolean;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightPress?: () => void;
    rightText?: string;
    subtitle?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    showBack = false,
    rightIcon,
    onRightPress,
    rightText,
    subtitle
}) => {
    const navigation = useNavigation();

    return (
        <View className="bg-white/95 px-4 py-3 pt-12 border-b border-gray-100 flex-row items-center justify-between sticky top-0 z-50">
            <View className="flex-row items-center gap-2 flex-1">
                {showBack && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 items-center justify-center -ml-2"
                    >
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                )}
                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900 truncate pr-2">{title}</Text>
                    {subtitle && (
                        <Text className="text-xs text-gray-500">{subtitle}</Text>
                    )}
                </View>
            </View>

            {(rightIcon || rightText) && (
                <TouchableOpacity
                    onPress={onRightPress}
                    className="rounded-full items-center justify-center min-w-[40px] h-10 px-2"
                >
                    {rightIcon && <Ionicons name={rightIcon} size={24} color="#1f2937" />}
                    {rightText && <Text className="font-bold text-gray-500">{rightText}</Text>}
                </TouchableOpacity>
            )}
        </View>
    );
};
