import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./global.css";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-background-light">
            <View className="bg-primary w-16 h-16 rounded-full items-center justify-center mb-6 shadow-lg">
                <Text className="text-white text-2xl">💎</Text>
            </View>
            <Text className="text-4xl font-bold text-gray-900 mb-2">Welux Admin</Text>
            <Text className="text-sm text-gray-500 uppercase tracking-widest">Nueva App</Text>
            <Text className="text-xs text-gray-400 mt-8">✨ NativeWind configurado ✅</Text>
            <StatusBar style="auto" />
        </View>
    );
}
