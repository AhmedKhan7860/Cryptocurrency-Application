import React, { useState } from "react";
import { TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useColorScheme();    
  const colors = Colors[theme ?? 'light'] || Colors.light;

  
  return (
    <SafeAreaView className="flex-1 bg-background" style={{backgroundColor: colors.background}}>
      <ThemedView className="flex-1 px-6 pt-5">
        {/* Logo and Title Section */}
        <ThemedView className="flex-row items-center mb-8">
          <ThemedView className="w-10 h-10 rounded-full bg-primary justify-center items-center mr-2">
            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yTw2p88ciOUzkoBmcngeFQssbqMrX8.png",
              }}
              className="w-6 h-6"
            />
          </ThemedView>
          <ThemedText className="text-2xl font-bold text-textPrimary">
            Door7
          </ThemedText>
        </ThemedView>

        {/* Header Section */}
        <ThemedView className="mb-8">
          <ThemedText className="text-2xl font-bold text-textPrimary mb-2">
            Login to your account
          </ThemedText>
          <ThemedText className="text-base text-textSecondary">
            Welcome back! Please enter your details.
          </ThemedText>
        </ThemedView>

        {/* Form Section */}
        <ThemedView className="flex-1">
          {/* Email Input */}
          <ThemedView className="flex-row items-center bg-surface rounded-xl mb-4 px-4 h-14">
            <Feather name="mail" size={20} color="#666" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-textPrimary"
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </ThemedView>

          {/* Password Input */}
          <ThemedView className="flex-row items-center bg-surface rounded-xl mb-4 px-4 h-14">
            <Feather name="lock" size={20} color="#666" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-textPrimary"
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="p-1"
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </ThemedView>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end mb-6">
            <ThemedText className="text-sm text-textSecondary">
              Forgot password?
            </ThemedText>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity className="bg-primary rounded-xl h-14 justify-center items-center mb-6">
            <ThemedText className="text-base font-bold text-background">
              Login
            </ThemedText>
          </TouchableOpacity>

          {/* Divider */}
          <ThemedText className="text-center text-textSecondary mb-6">
            OR
          </ThemedText>

          {/* Social Login Buttons */}
          <TouchableOpacity className="flex-row items-center justify-center bg-surface rounded-xl h-14 mb-4">
            <Image
              source={{ uri: "https://www.google.com/favicon.ico" }}
              className="w-5 h-5 mr-3"
            />
            <ThemedText className="text-base text-textPrimary">
              Sign In with Google
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-center bg-surface rounded-xl h-14 mb-4">
            <Feather name="apple" size={20} color="#fff" className="mr-3" />
            <ThemedText className="text-base text-textPrimary">
              Sign In with Apple
            </ThemedText>
          </TouchableOpacity>

          {/* Create Account Link */}
          <ThemedView className="mt-auto mb-8 items-center">
            <ThemedText className="text-sm text-textSecondary">
              Don't have an account?{" "}
              <ThemedText className="text-textPrimary font-bold">
                Create account
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
