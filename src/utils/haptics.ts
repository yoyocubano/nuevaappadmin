import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Service for handling Haptic Feedback
 * Provides a premium feel to user interactions
 */
export const HapticsService = {
    /**
     * Subtle feedback for light interactions (e.g., pressing a button)
     */
    light: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    },

    /**
     * Medium feedback for state changes (e.g., toggle switch, success)
     */
    medium: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    },

    /**
     * Heavy feedback for destructive actions or errors
     */
    heavy: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
    },

    /**
     * Feedback for successful completion of a task
     */
    success: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    },

    /**
     * Feedback for errors
     */
    error: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    },

    /**
     * Selection feedback for scrolling pickers or sliders
     */
    selection: () => {
        if (Platform.OS !== 'web') {
            Haptics.selectionAsync();
        }
    }
};
