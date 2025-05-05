import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarInactiveTintColor: '#A0A0A0',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 4,
                },
                tabBarIconStyle: {
                    marginTop: 6,
                },
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: 70,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                    android: {
                        elevation: 5,
                        height: 65,
                        backgroundColor: '#fff',
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Профіль',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="person.crop.circle" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'Категорії',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="category.fill" color={color} />
                    ),
                }}
            />
        </Tabs>

    );
}
