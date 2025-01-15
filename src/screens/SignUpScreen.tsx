import CancelButton from "@/components/CancelButton";
import SubmitButton from "@/components/SubmitButton";
import signup from "@/libs/apis/signup";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import Logo from "../assets/svgs/logo.svg";
import SignInInput from "../components/SignInInput";

const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding-horizontal: 40px;
`;

const LogoContainer = styled.View`
  align-self: center;
  justify-content: center;
  margin-bottom: 131px;
`;

const InputContainer = styled.View`
  gap: 19px;
  margin-bottom: 50px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  height: 59px;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
`;

const BACKGROUND_IMAGE = require("../assets/images/signin_background.png");

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen: FC<Props> = ({ navigation }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");

  const onSignUp = useCallback(async () => {
    if (password !== passwordRe) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await signup({
        userId: id,
        userName: name,
        upassword: password,
        email,
      });
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }, [id, name, email, password, passwordRe]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, []);

  const onChangeId = useCallback((text: string) => {
    setId(text);
  }, []);

  const onChangeName = useCallback((text: string) => {
    setName(text);
  }, []);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangePasswordRe = useCallback((text: string) => {
    setPasswordRe(text);
  }, []);

  return (
    <Container source={BACKGROUND_IMAGE}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <InputContainer>
        <SignInInput
          placeholder="아이디를 입력해주세요"
          value={id}
          onChangeText={onChangeId}
        />
        <SignInInput
          placeholder="이름을 입력해주세요"
          value={name}
          onChangeText={onChangeName}
        />
        <SignInInput
          placeholder="이메일을 입력해주세요"
          value={email}
          onChangeText={onChangeEmail}
        />
        <SignInInput
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChangeText={onChangePassword}
        />
        <SignInInput
          placeholder="비밀번호를 재입력해주세요"
          value={passwordRe}
          onChangeText={onChangePasswordRe}
        />
      </InputContainer>
      <ButtonContainer>
        <CancelButton onPress={onCancel} />
        <SubmitButton title={"가입하기"} onPress={onSignUp} />
      </ButtonContainer>
    </Container>
  );
};

export default SignUpScreen;
