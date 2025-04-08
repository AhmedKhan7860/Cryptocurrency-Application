// export { useColorScheme } from 'react-native';
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "user-theme"; // adjust this to match your storage key
type Theme = "light" | "dark";

export function useColorScheme(): Theme {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      } else {
        const systemTheme = Appearance.getColorScheme() ?? "light";
        setTheme(systemTheme);
      }
    };

    loadTheme();
  }, []);

  return theme;
}