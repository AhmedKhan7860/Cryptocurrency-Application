import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useSignUp, useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const router = useRouter();

  const { signUp, isLoaded, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);

  // create user and send the verification email
  const SignupPress = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Clerk is not loaded.");
      return;
    }
    setLoading(true);

    try {
      if (!emailAddress) {
        Alert.alert("Error", "Email address is required");
        return;
      }
      // create user on clerk
      const result = await signUp.create({
        emailAddress,
        password,
        firstName: firstname,
        lastName: lastname,
        username: username,
      });

      console.log("Sign-up response:", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      } else if (result.status === "missing_requirements") {
        // Prepare email verification
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // Navigate to the verification screen
        router.replace("/(auth)/verification");
      } else {
        Alert.alert("Error", "Sign Up process is incomplete");
      }
    } catch (error: any) {
      Alert.alert("Error", error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };


  const { startSSOFlow} = useSSO();

  const onAuthPress = async (strategy: 'oauth_google' | 'oauth_apple') => {
      if(!isLoaded){
          Alert.alert("Error", "Clerk is not loaded.")
          return;
      }
      setLoading(true);

      try{
          const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({strategy})
      
          if(createdSessionId){
              await setActive!({ session: createdSessionId })
              router.replace('/(tabs)')
          }else{
              router.replace({
                  pathname: '/(auth)/complete-signup',
                  params: {emailAddress}
              })
          }
     }catch(error: any){
      Alert.alert("Error", error.errors[0].message);
      }finally{
          setLoading(false);
      }
  }


  return (
    <SafeAreaView className="bg-black p-4">
      <View className="-mt-12 mb-0 bg-black p-6">
        {/* Header */}
        <View className="mb-17 items-center">
          <Text className="text-[25px] font-bold text-white">
            Create your account
          </Text>
          <Text className="mb-8 mt-3 text-[12px] text-gray-300">
            Welcome back! Please fill in the details to get started.
          </Text>
        </View>

        {/*  Social Logup Buttons  */}
        <View className="mb-7 flex-row items-center gap-7">
          <TouchableOpacity
            className="mb-4 h-[35px] w-[150px] flex-row items-center justify-center rounded-md bg-[rgb(52,52,52)]"
            onPress={() => onAuthPress('oauth_google')}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=17950&format=png&color=ffffff",
              }}
              className="mr-3 h-5 w-5"
            />
            <Text className="text-white">Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mb-4 h-[35px] w-[150px] flex-row items-center justify-center rounded-md bg-[rgb(52,52,52)]" onPress={() => onAuthPress('oauth_apple')}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=30840&format=png&color=ffffff",
              }}
              className="mr-3 h-5 w-5"
            />
            <Text className="text-white">Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="-mt-4 mb-0 flex-row items-center">
          <View className="h-[1px] flex-1 bg-gray-500" />
          <Text className="mx-4 text-center text-[16px] text-gray-400">OR</Text>
          <View className="h-[1px] flex-1 bg-gray-500" />
        </View>

        {/* Firstname/Surname Input */}
        <View className="-mt-2 mb-0 flex-row">
          <View className="mt-4 flex-1 flex-col p-4">
            <Text className="text-white">First Name</Text>
            <View className="bg-surfare mt-4 h-11 flex-row items-center rounded-md border-2 border-gray-600 p-2">
              <TextInput
                className="flex-1 text-white "
                placeholderTextColor="#666"
                value={firstname}
                onChangeText={setFirstName}
                keyboardType="default"
                autoCapitalize="words"
              />
            </View>
          </View>

          <View className="mt-4 flex-1 flex-col p-4">
            <Text className="text-white">Last Name</Text>
            <View className="bg-surfare mt-4 h-11 flex-row items-center rounded-md border-2 border-gray-600 p-2">
              <TextInput
                className="flex-1 text-white"
                placeholderTextColor="#666"
                value={lastname}
                onChangeText={setLastName}
                keyboardType="default"
                autoCapitalize="words"
              />
            </View>
          </View>
        </View>

        {/* Username Input */}
        <View className="-mt-1 mb-0 p-4">
          <Text className="text-white">Username</Text>
          <View className="bg-surfare mt-4 h-11 flex-row items-center rounded-md border-2 border-gray-600 p-2">
            <TextInput
              className="flex-1 text-white"
              placeholderTextColor="#666"
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Email Input */}
        <View className="p-4">
          <Text className="text-white">Email</Text>
          <View className="bg-surfare mt-4 h-11 flex-row items-center rounded-md border-2 border-gray-600 p-2">
            <TextInput
              className="flex-1 text-white"
              placeholderTextColor="#666"
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password */}
        <View className="mb-9 p-4">
          <Text className="text-white">Password</Text>
          <View className="bg-surfare mt-4 h-11 flex-row items-center rounded-md border-2 border-gray-600 p-2">
            <TextInput
              className="flex-1 text-white"
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
                size={15}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className="-mt-2 mb-5 h-14 items-center justify-center rounded-full bg-purple-300"
          onPress={SignupPress}
          disabled={loading}
        >
          <Text className="text-background text-base font-bold">
            {loading ? "Loading..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* Message */}
        <View className="items-center">
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
            <Text className="text-white">
              Already have an account?{" "}
              <Text className="font-bold text-purple-300">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
