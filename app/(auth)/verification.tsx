import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function VerifyEmailScreen() {
  const [code, setCode] = useState("");
  const { signUp, setActive } = useSignUp();
  const { signOut } = useAuth();

  const router = useRouter();

  const onVerifyPress = async () => {
    try {
      if (!signUp) {
        Alert.alert("Error", "Sign-up is not available");
        return;
      }

      const result = await signUp.attemptEmailAddressVerification({ code });

      console.log("Verification result:", result);

      if (result.status === "complete") {
        console.log("Verification successful, activating session...");

        await signOut();

        await setActive({ session: result.createdSessionId });

        router.replace("/");
      } else {
        Alert.alert("Error", "Email verification is incomplete.");
      }
    } catch (error: any) {

      Alert.alert(
        "Error",
        error.errors
          ? error.errors[0].message
          : "An unexpected error occurred.",
      );
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black p-4">
      <Text className="text-white text-lg mb-4">
        Enter the verification code sent to your email
      </Text>
      <TextInput
        className="w-full flex-row items-center bg-surfare p-2 mt-4 h-11 border-2 border-gray-600 text-white rounded-md px-4 mb-4"
        placeholder="Verification code"
        placeholderTextColor="#666"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <TouchableOpacity
        className="w-full h-12 bg-purple-500 justify-center items-center rounded-md"
        onPress={onVerifyPress}
      >
        <Text className="text-white font-bold">Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
}
