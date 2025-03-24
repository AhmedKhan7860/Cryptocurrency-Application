
import React, { useState } from "react";
import { TextInput, TouchableOpacity, SafeAreaView, Image, Alert, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth, useSignIn } from "@clerk/clerk-expo";


export default function ResetScreen() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { signIn } = useSignIn();
    const { signOut } = useAuth(); 
    
    const resetRequest = async () => {
        try{
            await signOut();

            await signIn.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            });

            router.replace('/resetcode')
        }catch(error: any){
            Alert.alert("Error", error.errors[0].message);
        }
    };


    return(
        <SafeAreaView className="bg-black h-[100%]">
            
            <View className="mb-14 flex-row p-6">
                <Image
                    source={{ uri: "https://img.icons8.com/?size=100&id=AadQ4QirbEVh&format=png&color=D8B4FE" }}
                    className="w-10 h-10 mr-3"
                />
                <Text className="text-purple-300 text-4xl font-bold">Aurum</Text>
            </View>
            
            <View className=" bg-black">
                <Text className="text-white text-center mt-[50px] text-[25px]">Reset Password</Text>
            </View>

            <View className="justify-center items-center">
                <View className="flex-row rounded-lg p-4 mt-[150px] h-14 border-2 border-gray-700 w-[290px] ">
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
                <TouchableOpacity className="items-center">
                    <Text className="text-purple-300 font-bold mt-7">Send Reset Email</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>      
    )
}
