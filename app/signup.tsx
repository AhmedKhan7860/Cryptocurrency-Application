import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";


export default function SignupScreen() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsernameName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");

    const navigation = useNavigation();


    return(
        <SafeAreaView className="bg-black p-4">
            <View className="p-6 bg-black">

                {/* Header */}
                <View className="mb-17 items-center">
                    <Text className="text-white text-[25px] font-bold">Create your account</Text>
                    <Text className="text-gray-300 mb-8 mt-3 text-[12px]">Welcome back! Please fill in the details to get started.</Text>
                </View>

                {/*  Social Logup Buttons  */}
                <View className="flex-row items-center gap-7 mb-7">
                    <TouchableOpacity className="flex-row items-center justify-center w-[150px] h-[35px] rounded-md mb-4 bg-[rgb(52,52,52)]">
                        <Image
                            source={{ uri: "https://img.icons8.com/?size=100&id=17950&format=png&color=ffffff" }}
                            className="w-5 h-5 mr-3"
                        />
                        <Text className="text-white">Google</Text>
                    </TouchableOpacity>


                    <TouchableOpacity className="flex-row items-center justify-center w-[150px] h-[35px] rounded-md mb-4 bg-[rgb(52,52,52)]">
                        <Image
                            source={{ uri: "https://img.icons8.com/?size=100&id=30840&format=png&color=ffffff" }}
                            className="w-5 h-5 mr-3"
                        />
                        <Text className="text-white">Apple</Text>
                    </TouchableOpacity>
                </View>


                {/* Divider */}
                <View className="flex-row items-center mb-0 -mt-4">
                    <View className="flex-1 h-[1px] bg-gray-500"/>
                    <Text className="text-center text-[16px] text-gray-400 mx-4">
                        OR
                    </Text>
                    <View className="flex-1 h-[1px] bg-gray-500"/>
                </View>
                
                {/* Firstname/Surname Input */}
                <View className="flex-row mb-0 -mt-2">
                    <View className="flex-1 flex-col p-4 mt-4">
                        <Text className="text-white">First Name</Text>
                        <View className="flex-row items-center bg-surfare rounded-md p-2 mt-4 h-11 border-2 border-gray-600">
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

                    <View className="flex-1 flex-col p-4 mt-4">
                        <Text className="text-white">Last Name</Text>
                        <View className="flex-row items-center bg-surfare rounded-md p-2 mt-4 h-11 border-2 border-gray-600">
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
                <View className="p-4 mb-0 -mt-1">
                    <Text className="text-white">Username</Text>
                    <View className="flex-row items-center bg-surfare rounded-md p-2 mt-4 h-11 border-2 border-gray-600">
                            <TextInput
                                className="flex-1 text-white"
                                placeholderTextColor="#666"
                                value={username}
                                onChangeText={setUsernameName}
                                keyboardType="default"
                                autoCapitalize="words"
                            />
                        </View>
                </View>

                {/* Email Input */}
                <View className="p-4">
                    <Text className="text-white">Email</Text>
                    <View className="flex-row items-center bg-surfare rounded-md p-2 mt-4 h-11 border-2 border-gray-600">
                            <TextInput
                                className="flex-1 text-white"
                                placeholderTextColor="#666"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="default"
                                autoCapitalize="words"
                            />
                        </View>
                </View>

                {/* Password */}
                <View className="p-4 mb-9">
                    <Text className="text-white">Password</Text>
                    <View className="flex-row items-center bg-surfare rounded-md p-2 mt-4 h-11 border-2 border-gray-600">
                        <TextInput
                            className="flex-1 text-white"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                            <Feather
                                name={showPassword ? "eye" : "eye-off"}
                                size={15}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity className="bg-purple-300 rounded-full h-14 justify-center items-center mb-5 -mt-2">
                    <Text className="text-base font-bold text-background">
                        Sign Up
                    </Text>
                </TouchableOpacity>

                {/* Message */}
                <View className="items-center">
                    <TouchableOpacity onPress={() => navigation.navigate('signin')}>
                        <Text className="text-white">
                            Already have an account? <Text className="text-purple-300 font-bold">Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>

        </SafeAreaView>



    )

}
