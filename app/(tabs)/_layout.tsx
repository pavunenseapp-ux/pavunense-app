import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index" // Corrigido de "home" para "index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house" color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="ponto"
        options={{
          title: 'Ponto',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="clock" color={color} size={size ?? 24} />
          ),
        }}
      />

      <Tabs.Screen
        name="utilidade"
        options={{
          title: 'Utilidade publica',
          tabBarIcon: ({ color, size }) => (
             <IconSymbol name="clock" color={color} size={size ?? 24} />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre-nos"
        options={{
          title: 'Sobre Nós',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="info" color={color} size={size ?? 24} />
          ),
        }}
      />

    </Tabs>
  );
}
