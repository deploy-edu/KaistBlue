import RootStackNavigator from "@/navigators/RootStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import relativeTime from "dayjs/plugin/relativeTime";
import * as SplashScreen from "expo-splash-screen";

import dayjs from "dayjs";
import { useFonts } from "expo-font";
import * as React from "react";
import { useEffect } from "react";

dayjs.extend(relativeTime);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "NanumSquareNeo-Rg": require("./assets/fonts/NanumSquareNeoOTF-Rg.otf"),
    "NanumSquareNeo-Lt": require("./assets/fonts/NanumSquareNeoOTF-Lt.otf"),
    "NanumSquareNeo-Hv": require("./assets/fonts/NanumSquareNeoOTF-Hv.otf"),
    "NanumSquareNeo-Bd": require("./assets/fonts/NanumSquareNeoOTF-Bd.otf"),
    "NanumSquareNeo-Eb": require("./assets/fonts/NanumSquareNeoOTF-Eb.otf"),
    NanumGothic: require("./assets/fonts/NanumGothic.otf"),
    NanumGothicBold: require("./assets/fonts/NanumGothicBold.otf"),
    NanumGothicExtraBold: require("./assets/fonts/NanumGothicExtraBold.otf"),
    NanumGothicLight: require("./assets/fonts/NanumGothicLight.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
