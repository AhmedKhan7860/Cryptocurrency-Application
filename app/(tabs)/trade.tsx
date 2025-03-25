import { SafeAreaView, TouchableOpacity, View, Text, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons"
import { useCallback, useState } from "react";


export default function BuyScreen() {
    const [expanded, setExpanded] = useState(false);
    const [selectCrypto, setSelectedCrypto] = useState("BTC/USDT")

    const [selectOrder, setSelectOrder] = useState("Limit Order")

    const toggleExpanded = useCallback(() => setExpanded(!expanded),[expanded])
    
    const percentage = ['0%', '25%', '50%', '75%', '100%']
    const [selectPercentage, setPercentage] = useState('0%')

    const orderBookData = [
        {price: '101,818.47', amount: '0.08656'},
        { price: '181,213.45', amount: '0.08275' },
        { price: '180,773.55', amount: '0.08086' },
        { price: '180,672.23', amount: '0.08089' },
        { price: '180,641.67', amount: '0.15909' },
        { price: '180,573.43', amount: '0.08017' },
        { price: '180,412.34', amount: '0.08311' },
        {price: '101,818.47', amount: '0.08656'},
        { price: '181,213.45', amount: '0.08275' },
        { price: '180,773.55', amount: '0.08086' },
        { price: '180,672.23', amount: '0.08089' },
        { price: '180,641.67', amount: '0.15909' },
        { price: '180,573.43', amount: '0.08017' },
        { price: '180,412.34', amount: '0.08311' },
    ]

    const select = (value: string) => {
        setSelectedCrypto(value);
        setExpanded(false);
    };


    return(
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 flex-row">
                <View className="p-2 w-[55%]">

                    {/* DropDown List */}
                    <View className="flex-row">
                        <TouchableOpacity className="bg-black  h-14 w-[160px] justify-center items-center mb-6 flex-row gap-5" onPress={toggleExpanded}>
                            <Text className="text-white text-[24px]">{selectCrypto}</Text>
                            <AntDesign name={expanded ? 'caretup' : "caretdown"} color='white'/>
                        </TouchableOpacity>
                        {
                            expanded && (
                            <View className="absolute top-11 z-10 w-[130px] bg-black">
                                <FlatList
                                    keyExtractor={(item) => item.value}
                                    data={[
                                        {value: 'BTC/USDT'},
                                        {value: 'ETH/USDT'}
                                    ]}
                                    renderItem={({item}) => (
                                        <TouchableOpacity activeOpacity={0.8} className="p-3 justify-center" onPress={() => select(item.value)}>
                                            <Text className="text-white text-[15px]">{item.value}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => <View className=" bg-white"/>}
                                />
                            </View>
                        )}
                        <Text className="text-green-400 mt-4">+0.79%</Text>
                    </View>

                    {/* Buy/Sell Buttons */}
                    <View className="flex-row rounded-full border-2 border-stone-700 p-1 w-[161px]">
                        <TouchableOpacity className="bg-green-600 justify-center items-center rounded-full w-[75px] h-[30px]">
                            <Text className="text-white font-bold">Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-stone-800 justify-center items-center rounded-full w-[75px] h-[30px]">
                            <Text className="text-white font-bold">Sell</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Limit Order */}
                    <View className="top-6">
                        <TouchableOpacity className="border-2 border-stone-800 w-[161px] h-[35px] rounded-lg justify-center items-center mb-6 flex-row gap-5">
                            <Text className="text-white text-[13px] font-bold">{selectOrder}</Text>
                            <AntDesign name={expanded ? 'caretup' : "caretdown"} color='white'/>
                        </TouchableOpacity>
                    </View>

                    {/* Price */}
                    <View className="top-6 border-2 border-stone-800 w-[161px] h-[55px] rounded-lg">
                        <Text className="p-2 text-gray-400 text-[10px] font-bold">Price USDT</Text>
                        <Text className="p-2 bottom-2 text-white text-[16px] font-bold">101,810.47</Text>
                    </View>

                    {/* Amount */}
                    <View className="p-2 justify-center items-center top-14 border-2 border-stone-800 w-[161px] h-[45px] rounded-lg flex-row gap-14">
                        <Text className="text-gray-400 font-bold">Amount</Text>
                        <Text className="text-white font-bold">BTC</Text>
                    </View>

                    {/* Percentage Bar */}
                    <View className="flex-row justify-between mt-[90px] w-1 gap-3">
                        {percentage.map((percent) => (
                            <TouchableOpacity key={percent} className={`p-1 items-center justify-center rounded w-9 h-8 ${selectPercentage === percent ? 'bg-purple-300': 'bg-gray-700'}`} onPress={() => setPercentage(percent)}>
                                <Text className="text-[8px] text-white font-bold">{percent}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>    

                    {/* Total */}
                    <View className="p-2 justify-center items-center mt-10 border-2 border-stone-800 w-[161px] h-[45px] rounded-lg flex-row gap-14">
                        <Text className="text-gray-400 font-bold">Total</Text>
                        <Text className="text-white font-bold">USDT</Text>
                    </View>
                    
                    {/* Information */}
                    <View className="flex-col mt-10 w-[200px]">
                        <View className="flex-row justify-between">
                            <Text className="text-gray-400 font-bold">Available</Text>
                            <Text className="text-white font-bold">205.12 USDT</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-400 font-bold">Max Buy</Text>
                            <Text className="text-white font-bold">0.00001 BTC</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-400 font-bold">Fee</Text>
                            <Text className="text-white font-bold">Free</Text>
                        </View>
                    </View>

                    {/* Button */}
                    <View className="mt-12">
                        <TouchableOpacity className="bg-purple-300 rounded-full h-14 justify-center items-center">
                            <Text className="text-base font-bold text-background">
                                Buy
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
                {/* Order Book Data */}
                <View className="p-2 w-[45%]">
                    <View className="mt-[70px]">
                    <Text className="text-white font-bold text-[10px] mb-2">Price (USDT)       Amount (BTC)</Text>
                    {orderBookData.map((item, index) => (
                        <View key={index} className="flex-row justify-between py-2">
                            <Text className="text-red-400">{item.price}</Text>
                            <Text className="text-white">{item.amount}</Text>
                        </View>
                    ))}
                    </View>
                </View>


            </View>
        </SafeAreaView>
    )
}