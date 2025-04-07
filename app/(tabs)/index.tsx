import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowDownIcon,
  ArrowRightLeftIcon,
  CircleChevronUpIcon,
  CircleIcon,
  EyeIcon,
  FlameIcon,
  GiftIcon,
  MessageSquareIcon,
  PlusIcon,
  QrCodeIcon,
  StarIcon,
} from "lucide-react-native";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

// const router = useRouter();

// Define TypeScript types
type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  labelStyle?: string;
};

type CryptoItemProps = {
  icon: ImageSourcePropType | string;
  name: string;
  symbol: string;
  price: string;
  change: number;
  labelStyle?: string;
};

type TabButtonProps = {
  label: string;
  active?: boolean;
  color?: string;
  className?: string;
};

type TagButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  color?: string;
};

// ActionButton Component
const ActionButton = ({ icon, label, labelStyle }: ActionButtonProps) => (
  <TouchableOpacity className="items-center">
    <View className="w-16 h-16 bg-zinc-900 rounded-full items-center justify-center">
      {icon}
    </View>
    <Text className="mt-1 text-xs" style={{color: labelStyle}}>{label}</Text>

  </TouchableOpacity>
);

// CryptoItem Component
const CryptoItem = ({ icon, name, symbol, price, change, labelStyle }: CryptoItemProps) => (
  <TouchableOpacity className="flex-row items-center border-b py-4 border-zinc-900">
    {typeof icon === "string" ? (
      <Image
        source={{
          uri: icon,
        }}
        className="w-10 h-10 rounded-full"
      />
    ) : (
      <Image source={icon} className="w-10 h-10 rounded-full" />
    )}
    <View className="flex-1 ml-3">
      <Text className="text-base font-medium" style={{color: labelStyle}}>{name}</Text>
      <Text className="text-gray-600 text-sm">{symbol}</Text>
    </View>
    <View className="items-end">
      <Text className="text-base font-medium" style={{color: labelStyle}}>{price}</Text>
      <View
        className={`px-1.5 py-1 rounded-full mt-1 ${
          change >= 0 ? "bg-green-900" : "bg-red-900"
        }`}
      >
        <Text
          className={`text-xs ${
            change >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {change >= 0 ? "+" : "-"}
          {change}%
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// TabButton Component
const TabButton = ({ label, active, color, className }: TabButtonProps) => (
  <TouchableOpacity
    className={`px-4 py-2 rounded-full ${
      active ? `${color}` : "border border-zinc-900"
    } ${className}`}
  >
    <Text className={`text-sm ${active ? "text-black" : "text-white"}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

// TagButton Component
const TagButton = ({ children, active, color }: TagButtonProps) => (
  <TouchableOpacity
    className={`px-2.5 py-1.5 rounded-full mr-2 ${
      active ? `${color} border border-zinc-900` : "border border-zinc-900"
    }`}
  >
    <View className={`text-sm flex flex-row items-center justify-center gap-2`}>
      {children}
    </View>
  </TouchableOpacity>
);

// HomeScreen Component
export default function HomeScreen() {
 
  
  const { user } = useUser();
  const router = useRouter();

  const theme = useColorScheme();
  const colorScheme = Colors[theme ?? 'light'] || Colors.light;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colorScheme.background }}>
      <View className="flex-row justify-between items-center px-4 py-4">
        <View className="flex-row border border-zinc-900 rounded-full">
          <TabButton
            label="Exchange"
            active={true}
            color="bg-[#caa7fe]"
            className="border-r-2"
          />
          <TabButton label="Web3" active={false} className="border-l-2" />
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="p-1">
            <GiftIcon
              size={18}
              strokeWidth={1.5}
              color={colorScheme.tint}
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-1">
            <MessageSquareIcon
              size={18}
              strokeWidth={1.5}
              color={colorScheme.tint}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-10 h-10 justify-center items-center aspect-square rounded-full overflow-hidden ml-1"
            onPress={() => router.replace("/(settings)/account")}
          >
            <Image
              source={{
                uri: user?.imageUrl,
              }}
              className="w-full h-full"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-4">
        <Text className="text-zinc-500 text-base">Total Balance</Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-3xl font-bold" style={{color: colorScheme.text}}>$169,421.73</Text>
          <Text className="text-xl">
            <EyeIcon
              size={18}
              strokeWidth={1.5}
              color={colorScheme.tint}
            />
          </Text>
        </View>
        <View className="flex-row items-center mt-2">
          <Text className="text-zinc-500">Today's PNL </Text>
          <Text className="text-green-400 ml-1">+$26,364.12</Text>
          <View className="bg-green-900 rounded-full px-1.5 py-1 ml-2">
            <Text className="text-green-400 text-xs">+25.10%</Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-around py-4 border-b border-zinc-900">
        <ActionButton
          icon={
            <PlusIcon
              size={24}
              strokeWidth={1.5}
              color={colorScheme.tint}
            />
          }
          label="Add"
          labelStyle = {colorScheme.text}
        />
        <ActionButton
          icon={
            <ArrowDownIcon
              size={24}
              strokeWidth={1.5}
              color={colorScheme.tint}

            />
          }
          label="Send"
          labelStyle = {colorScheme.text}

        />
        <ActionButton
          icon={
            <QrCodeIcon
              size={24}
              strokeWidth={1.5}
              color={colorScheme.tint}

            />
          }
          label="Receive"
          labelStyle = {colorScheme.text}

        />
        <ActionButton
          icon={
            <ArrowRightLeftIcon
              size={44}
              strokeWidth={1.5}
              color={colorScheme.tint}
            />
          }
          label="Convert"
          labelStyle = {colorScheme.text}

        />
      </View>
      <View className="flex-1 py-3">
        {/* Horizontal ScrollView */}
        <ScrollView horizontal className="px-4 pb-3 flex-none flex-shrink-0">
          <TagButton color="bg-[#18181b]">
            <StarIcon
              size={14}
              strokeWidth={1.5}
              fill="#e241b1"
              color="#e241b1"
            />
            <ThemedText className="text-sm">Favourites</ThemedText>
          </TagButton>
          <TagButton active={true} color="bg-[#18181b]">
            <FlameIcon
              size={14}
              strokeWidth={1.5}
              fill="#f6bc16"
              color="#f6bc16"
            />
            <ThemedText className="text-sm">Top</ThemedText>
          </TagButton>
          <TagButton color="bg-[#18181b]">
            <CircleChevronUpIcon size={14} strokeWidth={1.5} color="#1ebbc5" />
            <ThemedText className="text-sm">Gainers</ThemedText>
          </TagButton>
          <TagButton color="bg-[#18181b]">
            <CircleIcon
              size={14}
              strokeWidth={1.5}
              fill="#4aab58"
              color="#4aab58"
            />
            <ThemedText className="text-sm">New</ThemedText>
          </TagButton>
        </ScrollView>

        {/* Vertical ScrollView */}
        <ScrollView className="px-6">
          <CryptoItem
            icon="https://static-00.iconduck.com/assets.00/bitcoin-cryptocurrency-icon-512x512-szvojdy7.png"
            name="Bitcoin"
            symbol="BTC"
            price="$101,810.47"
            change={5.36}
            labelStyle = {colorScheme.text}
          />
          <CryptoItem
            icon="https://static-00.iconduck.com/assets.00/ethereum-cryptocurrency-icon-512x512-u1g6py59.png"
            name="Ethereum"
            symbol="ETH"
            price="$3,462.64"
            change={-0.25}
            labelStyle = {colorScheme.text}

          />
          <CryptoItem
            icon="https://static-00.iconduck.com/assets.00/skycoin-cryptocurrency-icon-512x512-tay18qnk.png"
            name="Skycoin"
            symbol="SKY"
            price="$194.29"
            change={-0.07}
            labelStyle = {colorScheme.text}

          />
          <CryptoItem
            icon="https://static-00.iconduck.com/assets.00/dogecoin-cryptocurrency-icon-512x512-z7jjg89f.png"
            name="Dogecoin"
            symbol="DOGE"
            price="$0.33702"
            change={6.0}
            labelStyle = {colorScheme.text}

          />
          <CryptoItem
            icon="https://static-00.iconduck.com/assets.00/xrp-cryptocurrency-icon-512x512-lzdikk94.png"
            name="XRP"
            symbol="XRP"
            price="$2.3312"
            change={1.57}
            labelStyle = {colorScheme.text}

          />
          <CryptoItem
            icon="https://static-00.iconduck.com/assets.00/okcash-cryptocurrency-icon-512x512-f0ys97ea.png"
            name="OKCash"
            symbol="OK"
            price="$101,810.47"
            change={5.36}
            labelStyle = {colorScheme.text}

          />
          <CryptoItem
            icon="https://static-00.iconduck.com/assets.00/stellar-cryptocurrency-icon-512x512-qas2sh98.png"
            name="Stellar"
            symbol="STR"
            price="$101,810.47"
            change={5.36}
            labelStyle = {colorScheme.text}

          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
