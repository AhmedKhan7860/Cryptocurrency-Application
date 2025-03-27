// app/(public)/complete-signup.tsx
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompleteSignUp() {
    const { email, firstName, lastName } = useLocalSearchParams();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { signUp, isLoaded, setActive } = useSignUp();


    const signup = async () => {
        if(!isLoaded){
            Alert.alert("Error", "Clerk is not loaded.")
            return;
            }
        setLoading(true);

        try{
            const result = await signUp.create({
                username: username,
            })

            if (result.status === 'complete'){
                await setActive({ session: result.createdSessionId});
                router.replace('/(tabs)/index');
                }
        }catch(error: any){
            Alert.alert("Error", error.errors[0].message);
        }finally{
            setLoading(false);
        }
    };



    return (
        <SafeAreaView className="flex-1 bg-black p-4">
            <View className="p-6 bg-black">
                <View className="mb-14 flex-row">
                    <Image
                        source={{ uri: "https://img.icons8.com/?size=100&id=AadQ4QirbEVh&format=png&color=D8B4FE" }}
                        className="w-10 h-10 mr-3"
                    />
                    <Text className="text-purple-300 text-4xl font-bold">Aurum</Text>
                </View>

                <View className="justify-center items-center bg-black p-4 mt-[130px]">
                    <TextInput
                        className="w-full flex-row items-center bg-surfare p-2 mt-4 h-11 border-2 border-gray-600 text-white rounded-md px-4 mb-4"
                        placeholder="First Name"
                        placeholderTextColor="#666"                       
                        keyboardType="numeric"
                    />

                    <TextInput
                        className="w-full flex-row items-center bg-surfare p-2 mt-4 h-11 border-2 border-gray-600 text-white rounded-md px-4 mb-4"
                        placeholder="Last Name"
                        placeholderTextColor="#666"                       
                        keyboardType="numeric"
                    />
                    
                    <TextInput
                        className="w-full flex-row items-center bg-surfare p-2 mt-4 h-11 border-2 border-gray-600 text-white rounded-md px-4 mb-4"
                        placeholder="Username"
                        placeholderTextColor="#666"                       
                        keyboardType="numeric"
                    />

                    <TouchableOpacity
                        className="w-full h-12 bg-purple-500 justify-center items-center rounded-md mt-3"
                        onPress={signup}
                    >
                        <Text className="text-white font-bold">Complete Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}