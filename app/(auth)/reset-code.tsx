import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  View,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";

export default function ResetCodeScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, setActive } = useSignIn();

  const onReset = async () => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      await setActive({ session: result?.createdSessionId });
    } catch (error: any) {
      Alert.alert("Error", error.errors[0].message);
    }
  };

  return (
    <SafeAreaView className="bg-black h-[100%]">
      <View className="mb-14 flex-row p-6">
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=AadQ4QirbEVh&format=png&color=D8B4FE",
          }}
          className="w-10 h-10 mr-3"
        />
        <Text className="text-purple-300 text-4xl font-bold">Aurum</Text>
      </View>

      <View className="justify-center items-center">
        <View className="flex-row rounded-lg p-4 mt-[130px] h-14 border-2 border-gray-700 w-[290px]">
          <TextInput
            className="flex-1 text-white"
            placeholder="Code"
            placeholderTextColor="#666"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="justify-center items-center">
        <View className="flex-row items-center bg-surface rounded-xl mb-4 mt-3 px-4 h-14 border-2 border-gray-700 w-[290px]">
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
      </View>

      <TouchableOpacity className="items-center" onPress={onReset}>
        <Text className="text-purple-300 font-bold mt-7">Set New Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

