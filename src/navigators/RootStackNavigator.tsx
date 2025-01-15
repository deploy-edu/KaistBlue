import AddArticleScreen from "@/screens/AddArticleScreen";
import AddProfileScreen from "@/screens/AddProfileScreen";
import ClubHomeScreen from "@/screens/ClubHomeScreen";
import ClubListScreen from "@/screens/ClubListScreen";
import LogInScreen from "@/screens/LogInScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import ViewArticleScreen from "@/screens/ViewArticleScreen";
import { useAuthStore } from "@/stores/useAuthStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  ClubHome: {
    communityId: number;
  };
  ClubList: undefined;
  ViewArticle: {
    communityId: number;
    id: number;
  };
  AddArticle: {
    communityId: number;
  };
  AddProfile: {
    communityId: number;
    id?: number;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "ClubList" : "LogIn"}>
      {isLoggedIn === false ? (
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="ClubList"
          component={ClubListScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ClubHome"
        component={ClubHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewArticle"
        component={ViewArticleScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddArticle"
        component={AddArticleScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddProfile"
        component={AddProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default RootStackNavigator;
