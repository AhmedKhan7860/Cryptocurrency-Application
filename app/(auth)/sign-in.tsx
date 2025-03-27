import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const SignInPress = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Clerk is not loaded.");
      return;
    }
    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-black pt-6 px-2">
      <View className="p-6 bg-black">
        {/* Logo and Title Section */}
        <View className="mb-14 flex-row">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=AadQ4QirbEVh&format=png&color=D8B4FE",
            }}
            className="w-10 h-10 mr-3"
          />
          <Text className="text-purple-300 text-4xl font-bold">Aurum</Text>
        </View>

        {/* Login Header */}
        <Text className="text-white text-3xl font-bold mb-2">
          Login to your account
        </Text>
        <Text className="text-gray-300 mb-8 mt-3 text-[16px]">
          Welcome back! Please enter your details.
        </Text>

        {/* Email Input */}
        <View className="flex-row items-center bg-surfare rounded-lg p-4 mb-4 mt-9 h-14 border-2 border-zinc-700">
          <Feather name="mail" size={20} color="#fff" className="mr-3" />
          <TextInput
            className="flex-1 text-white"
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-surface rounded-xl mb-4 mt-3 px-4 h-14 border-2 border-zinc-700">
          <Feather name="lock" size={20} color="#fff" className="mr-3" />
          <TextInput
            className="flex-1 text-white"
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
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          className="items-center mb-6"
          onPress={() => router.replace("/(auth)/reset-password")}
        >
          <Text className="text-[16px] text-white font-bold mt-5">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-purple-300 rounded-full h-14 justify-center items-center mb-6"
          onPress={SignInPress}
        >
          <Text className="text-base font-bold text-background">
            {loading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <Text className="text-center text-[16px] text-gray-400 mb-6">OR</Text>

        {/* Social Login Buttons */}
        <TouchableOpacity className="flex-row items-center justify-center rounded-full h-14 mb-4 bg-[rgb(52,52,52)]">
          <Image
            source={{ uri: "https://www.google.com/favicon.ico" }}
            className="w-5 h-5 mr-3"
          />
          <Text className="text-base text-white text-[15px]">
            Sign In with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center rounded-full h-14 mb-4 bg-[rgb(52,52,52)]">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=30840&format=png&color=ffffff",
            }}
            className="w-5 h-5 mr-3"
          />
          <Text className="text-base text-white text-[15px]">
            Sign In with Apple
          </Text>
        </TouchableOpacity>

        {/* Create Account Link */}
        <View className="mb-8 mt-3 items-center">
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
            <Text className="text-white">
              Don't have an account? {""}
              <Text className="text-purple-300 font-bold">Create account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
