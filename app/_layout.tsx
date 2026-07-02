import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

const header = {
  headerStyle: { backgroundColor: '#2E7D32' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: '700' as const },
  contentStyle: { backgroundColor: '#F4F8F4' },
};

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={header}>
        <Stack.Screen name="index" options={{ headerShown: false, title: 'iClimate' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
        <Stack.Screen name="forgot-password" options={{ title: 'Forgot Password' }} />
        <Stack.Screen name="email-verification" options={{ title: 'Email Verification' }} />

        <Stack.Screen name="farmer-dashboard" options={{ title: 'Farmer Dashboard' }} />
        <Stack.Screen name="mao-dashboard" options={{ title: 'MAO Dashboard' }} />
        <Stack.Screen name="it-dashboard" options={{ title: 'IT Expert Dashboard' }} />

        <Stack.Screen name="farmer-profiles" options={{ title: 'Farmer Profiles' }} />
        <Stack.Screen name="climate-records" options={{ title: 'Climate Records' }} />
        <Stack.Screen name="weather-prediction" options={{ title: 'Weather Prediction' }} />
        <Stack.Screen name="ai-assistant" options={{ title: 'AI Farming Assistant' }} />
        <Stack.Screen name="rice-production" options={{ title: 'Rice Production' }} />
        <Stack.Screen name="heat-map" options={{ title: 'Heat Map Areas' }} />
        <Stack.Screen name="planting-advisories" options={{ title: 'Planting Advisories' }} />
        <Stack.Screen name="announcements" options={{ title: 'Announcements' }} />
        <Stack.Screen name="community-feed" options={{ title: 'Community Feed' }} />
        <Stack.Screen name="messages" options={{ title: 'Messages' }} />
        <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
        <Stack.Screen name="reports" options={{ title: 'Reports' }} />
        <Stack.Screen name="user-management" options={{ title: 'User Management' }} />
        <Stack.Screen name="system-logs" options={{ title: 'System Logs' }} />
        <Stack.Screen name="profile-settings" options={{ title: 'Profile / Settings' }} />

        <Stack.Screen name="farmer-announcements" options={{ title: 'Announcements' }} />
        <Stack.Screen name="farmer-advisories" options={{ title: 'Advisories' }} />
        <Stack.Screen name="farmer-calendar" options={{ title: 'Planting Calendar' }} />
        <Stack.Screen name="farmer-notifications" options={{ title: 'Notifications' }} />
        <Stack.Screen name="farmer-feedback" options={{ title: 'Messages' }} />
        <Stack.Screen name="farmer-profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="mao-announcements" options={{ title: 'Manage Announcements' }} />
        <Stack.Screen name="mao-advisories" options={{ title: 'Manage Advisories' }} />
        <Stack.Screen name="mao-calendar" options={{ title: 'Manage Advisories' }} />
        <Stack.Screen name="mao-feedback" options={{ title: 'Messages' }} />
        <Stack.Screen name="it-users" options={{ title: 'Manage Users' }} />
        <Stack.Screen name="it-reports" options={{ title: 'Reports' }} />
        <Stack.Screen name="it-settings" options={{ title: 'Settings' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
