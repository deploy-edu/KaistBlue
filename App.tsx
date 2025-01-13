import relativeTime from 'dayjs/plugin/relativeTime';
import * as SplashScreen from 'expo-splash-screen';
import RootStackNavigator from '@/navigators/RootStackNavigator';
import {NavigationContainer} from '@react-navigation/native';

import dayjs from 'dayjs';
import * as React from 'react';
import { useFonts } from 'expo-font';

dayjs.extend(relativeTime);

export default function App() {

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
