import CommonText from "@/components/CommonText";
import SignInButton from "@/components/SignInButton";
import SignInInput from "@/components/SignInInput";
import axiosClient from "@/libs/axiosClient";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import styled from "@emotion/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useState } from "react";
import { ImageBackground } from "react-native";
import Logo from "@/assets/svgs/logo.svg";
import authenticate from "@/libs/apis/authenicate";
import { useAuthStore } from "@/stores/useAuthStore";

type Props = NativeStackScreenProps<RootStackParamList, "LogIn">;

const Container = styled(ImageBackground)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const NotAMemberText = styled(CommonText)`
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 13px;
`;

const SignUpButton = styled.TouchableOpacity``;

const SignUpText = styled(CommonText)`
  color: #a9e0ff;
  font-size: 13px;
  font-style: normal;
  font-weight: 800;
`;

const LogoContainer = styled.View`
  height: 79px;
  align-items: center;
  justify-content: center;
  margin-bottom: 131px;
`;

const LogInScreen: FC<Props> = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = useCallback(async () => {
    // todo: 네트워킹
    try {
      const response = await authenticate({
        userId: id,
        upassword: password,
      });
      useAuthStore.getState().login(response.token);
    } catch (e) {
      console.log(e);
    }
  }, [id, navigation, password]);

  const onChangeId = useCallback((text: string) => {
    setId(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onSignUp = useCallback(() => {
    navigation.navigate("SignUp");
  }, [navigation]);

  return (
    <Container source={require("@/assets/images/signin_background.png")}>
      <LogoContainer>
        <Logo>Blue</Logo>
      </LogoContainer>
      <SignInInput
        placeholder="아이디를 입력하세요."
        style={{ marginBottom: 19 }}
        onChangeText={onChangeId}
      />
      <SignInInput
        placeholder="비밀번호를 입력하세요."
        style={{ marginBottom: 19 }}
        secureTextEntry
        onChangeText={onChangePassword}
      />
      <SignInButton style={{ marginBottom: 50 }} onPress={onSignIn} />
      <NotAMemberText>만약 회원이 아니라면</NotAMemberText>
      <SignUpButton onPress={onSignUp}>
        <SignUpText>회원가입</SignUpText>
      </SignUpButton>
    </Container>
  );
};

export default LogInScreen;
