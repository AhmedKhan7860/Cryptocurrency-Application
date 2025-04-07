
{/* <Pressable style={styles.backButton} onPress={() => router.push("/account")}>
        <Text style={[styles.backText, { color: colors.text }]}>← Back</Text>
      </Pressable>   */}
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import {Colors} from '@/constants/Colors';



// Define a constant for the theme key
const THEME_KEY = "user-theme";

type Theme = "light" | "dark" ;


// Define a function to get the theme color based on the current theme
export default function ThemeScreen() {
  const systemTheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>("light");


  const resolvedTheme: "light" | "dark" =
    selectedTheme === "light" ? (systemTheme === "dark" ? "dark" : "light") : selectedTheme;

  const colors = Colors[resolvedTheme] || Colors.light;;
  
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem(THEME_KEY)) as Theme | null;
      if (savedTheme) {
        setSelectedTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (newTheme: Theme) => {
    setSelectedTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };


  // Use theme colors dynamically
  const borderColor = (themeOption: Theme) =>
    selectedTheme === themeOption ? colors.tint : "#ccc";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Choose Theme</Text>

      {["light", "dark", ].map((theme) => (
        <Pressable
        key={theme}
        style={[styles.button, { borderColor: borderColor(theme as Theme) }]}
        onPress={() => changeTheme(theme as Theme)}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
          {selectedTheme === theme ? " ✓" : ""}
        </Text>
      </Pressable>
   ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
