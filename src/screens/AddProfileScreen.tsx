import CancelButton from "@/components/CancelButton";
import Header from "@/components/Header";
import NanumGothicText from "@/components/NanumGothicText";
import NicknameInput from "@/components/NicknameInput";
import SubmitButton from "@/components/SubmitButton";
import deleteUserCommunity from "@/libs/apis/deleteUserCommunity";
import saveProfile from "@/libs/apis/saveProfile";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { useCommunityStore } from "@/stores/useCommunityStore";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View`
  flex: 1;
  background-color: #f2f4fb;
`;

const InnerContainer = styled.View`
  flex: 1;
  margin-horizontal: 22px;
  align-items: center;
  justify-content: center;
`;

const ProfileImageContainer = styled.Pressable`
  margin-bottom: 34px;
  border-radius: 50px;
`;

const ProfileImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  resize-mode: cover;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  height: 59px;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-horizontal: 16px;
`;

const DeleteButtonContainer = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DeleteButton = styled.Pressable`
  padding: 8px 16px;
`;

const DeleteButtonText = styled(NanumGothicText)`
  font-size: 12px;
  color: #999999;
  text-decoration-line: underline;
`;

type Props = NativeStackScreenProps<RootStackParamList, "AddProfile">;
const AddProfileScreen: FC<Props> = ({ navigation, route }) => {
  const { bottom } = useSafeAreaInsets();
  const { id, communityId } = route.params;
  const [nickName, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const community = useCommunityStore(
    (state) => state.communitiesById[communityId]
  );

  // 프로필 수정 모드일 때 기존 프로필 정보 불러오기
  useEffect(() => {
    if (id && community) {
      // 기존 닉네임 설정
      if (community.nickName) {
        setNickname(community.nickName);
      }

      // 기존 프로필 이미지 설정
      if (community.profileImage) {
        // profileImageType과 profileImage를 조합하여 data URI 생성
        if (community.profileImageType && community.profileImage) {
          // 이미 type과 image가 조합된 형태인지 확인
          if (community.profileImage.startsWith("data:")) {
            setProfileImage(community.profileImage);
          } else {
            // type과 image를 조합
            setProfileImage(
              `${community.profileImageType}${community.profileImage}`
            );
          }
        } else if (community.profileImage.startsWith("data:")) {
          // 이미 data URI 형태인 경우
          setProfileImage(community.profileImage);
        } else {
          // base64 문자열이지만 prefix가 없는 경우 (기본값으로 image/png 사용)
          setProfileImage(`data:image/png;base64,${community.profileImage}`);
        }
      }
    }
  }, [id, community]);

  const onChangeNickName = useCallback((text: string) => {
    setNickname(text);
  }, []);

  const onChangeProfileImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 1,
      base64: true,
    });

    if (!result?.assets) {
      return;
    }

    setProfileImage(`data:image/png;base64,${result.assets[0].base64}`);
  }, []);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    try {
      const response = await saveProfile({
        communityId: communityId?.toString(),
        nickName,
        sortNo: community?.sortNo?.toString() || "0",
        imageStr: profileImage || "", // 빈 문자열도 전송 (서버에서 처리)
        id: id, // 프로필 수정 모드일 때 id 전달
      });

      // 응답 데이터 타입에 따라 처리
      const responseData = response.data;
      
      if (id) {
        // 프로필 수정 모드: CommunityUserDTO 반환
        const dtoData = responseData as any;
        const updatedCommunity: CommunityData = {
          ...community,
          userId: dtoData.userId,
          nickName: dtoData.nickName,
          // sortNo는 기존 값 유지
        };
        
        // 프로필 이미지 정보 업데이트
        // 응답에 image 필드가 있으면 사용하고, 없으면 로컬 상태의 profileImage 사용
        if (dtoData.image) {
          // 응답의 image 필드 처리
          if (dtoData.image.startsWith("data:")) {
            // 이미 data URI 형태
            updatedCommunity.profileImage = dtoData.image;
            updatedCommunity.profileImageType = dtoData.image.split(";")[0] || undefined;
          } else {
            // base64 문자열만 있는 경우
            updatedCommunity.profileImage = dtoData.image;
            updatedCommunity.profileImageType = dtoData.type || "data:image/png;base64,";
          }
        } else if (profileImage) {
          // 응답에 image가 없으면 로컬 상태의 profileImage 사용
          updatedCommunity.profileImage = profileImage;
          if (profileImage.startsWith("data:")) {
            updatedCommunity.profileImageType = profileImage.split(";")[0] || undefined;
          } else {
            updatedCommunity.profileImageType = "data:image/png;base64,";
          }
        }
        
        useCommunityStore.getState().updateCommunity(updatedCommunity);
      } else {
        // 프로필 생성 모드: Profile 반환
        const profileData = responseData as any;
        const updatedCommunity: CommunityData = {
          ...community,
          userId: profileData.userId,
          nickName: profileData.nickName,
          sortNo: profileData.sortNo,
        };
        
        // 프로필 이미지 정보 업데이트
        // 응답에 image 필드가 있으면 사용하고, 없으면 로컬 상태의 profileImage 사용
        if (profileData.image) {
          // 응답의 image 필드 처리
          if (profileData.image.startsWith("data:")) {
            // 이미 data URI 형태
            updatedCommunity.profileImage = profileData.image;
            updatedCommunity.profileImageType = profileData.image.split(";")[0] || undefined;
          } else {
            // base64 문자열만 있는 경우
            updatedCommunity.profileImage = profileData.image;
            updatedCommunity.profileImageType = profileData.type || "data:image/png;base64,";
          }
        } else if (profileImage) {
          // 응답에 image가 없으면 로컬 상태의 profileImage 사용
          updatedCommunity.profileImage = profileImage;
          if (profileImage.startsWith("data:")) {
            updatedCommunity.profileImageType = profileImage.split(";")[0] || undefined;
          } else {
            updatedCommunity.profileImageType = "data:image/png;base64,";
          }
        }
        
        useCommunityStore.getState().updateCommunity(updatedCommunity);
        
        // 회원 가입 시 memberCount 증가
        useCommunityStore.getState().incrementMemberCount(communityId);
      }

      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  }, [communityId, navigation, nickName, profileImage, community, id]);

  const onDelete = useCallback(() => {
    if (!id || !communityId) {
      return;
    }

    Alert.alert(
      "탈퇴 확인",
      "정말로 이 커뮤니티에서 탈퇴하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "탈퇴",
          style: "destructive",
          onPress: async () => {
            try {
              // 탈퇴 전에 memberCount 감소
              useCommunityStore.getState().decrementMemberCount(communityId);
              
              await deleteUserCommunity({
                id,
                communityId,
              });

              // 커뮤니티 스토어에서 해당 커뮤니티 제거
              const store = useCommunityStore.getState();
              const updatedCommunitiesById = { ...store.communitiesById };
              delete updatedCommunitiesById[communityId];
              const updatedCommunityIds = store.communityIds.filter(
                (cid) => cid !== communityId
              );

              useCommunityStore.setState({
                communitiesById: updatedCommunitiesById,
                communityIds: updatedCommunityIds,
              });

              // 커뮤니티 목록 화면으로 이동
              navigation.reset({
                index: 0,
                routes: [{ name: "ClubList" }],
              });
            } catch (e) {
              console.error(e);
              Alert.alert("오류", "탈퇴 처리 중 오류가 발생했습니다.");
              // 오류 발생 시 memberCount 복구
              useCommunityStore.getState().incrementMemberCount(communityId);
            }
          },
        },
      ]
    );
  }, [id, communityId, navigation]);

  return (
    <Container style={{ paddingBottom: bottom }}>
      <Header title={id ? "프로필수정" : "회원가입"} />
      <InnerContainer>
        <ProfileImageContainer onPress={onChangeProfileImage}>
          {profileImage ? (
            <ProfileImage source={{ uri: profileImage }} />
          ) : (
            <ProfileImage
              source={require("@/assets/images/empty-profile-icon-512.png")}
            />
          )}
        </ProfileImageContainer>
        <NicknameInput
          placeholder="닉네임을 입력해주세요."
          onChangeText={onChangeNickName}
          value={nickName}
        />
        {id && (
          <DeleteButtonContainer>
            <DeleteButton onPress={onDelete}>
              <DeleteButtonText>탈퇴 하기</DeleteButtonText>
            </DeleteButton>
          </DeleteButtonContainer>
        )}
      </InnerContainer>
      <ButtonContainer>
        <CancelButton onPress={onCancel} />
        <SubmitButton
          title={id ? "프로필수정" : "가입하기"}
          onPress={onSubmit}
        />
      </ButtonContainer>
    </Container>
  );
};

export default AddProfileScreen;
