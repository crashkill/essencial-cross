import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { isWeb, isMobile } from '@/utils/responsive';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...(isMobile ? Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }) : {}),
          ...(isWeb ? webTabBarStyles : {}),
        },
        tabBarLabelStyle: isWeb ? {
          fontSize: 14, // Texto maior na web
        } : {},
        tabBarIconStyle: isWeb ? {
          marginBottom: 0, // Menos espaço no ícone para web
        } : {},
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={isWeb ? 24 : 28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wods"
        options={{
          title: 'WODs',
          tabBarIcon: ({ color }) => <Ionicons name="barbell" size={isWeb ? 24 : 28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercícios',
          tabBarIcon: ({ color }) => <Ionicons name="body" size={isWeb ? 24 : 28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Timer',
          tabBarIcon: ({ color }) => <Ionicons name="timer" size={isWeb ? 24 : 28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={isWeb ? 24 : 28} color={color} />,
        }}
      />
    </Tabs>
  );
}

// Estilos específicos para a barra de abas na web
const webTabBarStyles = StyleSheet.create({
  height: 56,
  paddingTop: 5,
  paddingBottom: 5,
  borderTopWidth: 1,
  borderTopColor: 'rgba(0,0,0,0.1)',
  position: 'relative',
  width: '100%',
  maxWidth: 1200,
  alignSelf: 'center',
});
