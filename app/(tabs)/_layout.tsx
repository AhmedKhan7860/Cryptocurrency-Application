import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  BitcoinIcon,
  HomeIcon,
  ScrollIcon,
  SearchIcon,
  WalletIcon,
  User,
  ArrowLeftRight
} from "lucide-react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <SignedIn>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: {
              // Apply a transparent background on iOS to show the blur effect
              ...(Platform.OS === "ios" ? { position: "absolute" } : {}),
              // Ensure the background color is consistent on Android
              backgroundColor: Colors[colorScheme ?? "light"].background, // Replace with your desired color
              height: 65,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <HomeIcon size={24} color={color} strokeWidth={1.5} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color }) => (
                <SearchIcon size={24} color={color} strokeWidth={1.5} />
              ),
            }}
          />
          <Tabs.Screen
            name="trade"
            options={{
              title: "Trade",
              tabBarIcon: ({ color }) => (
                <BitcoinIcon size={24} color={color} strokeWidth={1.5} />
              ),
            }}
          />
          <Tabs.Screen
            name="futures"
            options={{
              title: "Futures",
              tabBarIcon: ({ color }) => (
                <ScrollIcon size={24} color={color} strokeWidth={1.5} />
              ),
            }}
          />
          <Tabs.Screen
            name="wallets"
            options={{
              title: "Wallets",
              tabBarIcon: ({ color }) => (
                <WalletIcon size={24} color={color} strokeWidth={1.5} />
              ),
            }}
          />
          {/* <Tabs.Screen
            name="account"
            options={{
              title: "Account",
              tabBarIcon: ({ color }) => (
                <User size={24} color={color} strokeWidth={1.5} />
              ),
            }}
          /> */}
          <Tabs.Screen
            name="converts"
            options={{
              title: "Convert",
              tabBarIcon: ({ color }) => (
                <ArrowLeftRight  size={24} color={color} strokeWidth={1.5} />
              ),
            }}
          />
        </Tabs>
      </SignedIn>
      <SignedOut>
        <Redirect href="../(auth)/sign-in" />
      </SignedOut>
    </>
  );
}
