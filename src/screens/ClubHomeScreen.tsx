import ClubHeader from "@/components/ClubHeader";
import CommonText from "@/components/CommonText";
import PublishingInfo from "@/components/PublishingInfo";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { useCommunityStore } from "@/stores/useCommunityStore";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import React, { FC, useCallback } from "react";
import { FlatList } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    nickname: "하하",
    title: "[모집] 새로운 동호회원을 기다립니다!!",
    contents: "독서동호회에서 함께 책을 읽고 토론할 새로운 멤버를 모집합..",
    publishedAt: new Date(),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    nickname: "하하",
    title: "[모집] 새로운 동호회원을 기다립니다!!",
    contents: "독서동호회에서 함께 책을 읽고 토론할 새로운 멤버를 모집합..",
    publishedAt: new Date(),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    nickname: "하하",
    title: "[모집] 새로운 동호회원을 기다립니다!!",
    contents: "독서동호회에서 함께 책을 읽고 토론할 새로운 멤버를 모집합..",
    publishedAt: new Date(),
  },
];

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ItemContainer = styled.Pressable`
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
  margin-bottom: 15px;
  margin-horizontal: 16px;
`;

const ItemTitle = styled(CommonText)`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 18.24px;
  margin-bottom: 9px;
`;

const ItemContent = styled(CommonText)`
  color: #000
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.82px;
`;

type ItemProps = {
  title: string;
  nickname: string;
  content: string;
  publishedAt: Date;
  onPress: () => void;
};

const Item = ({
  title,
  nickname,
  publishedAt,
  content,
  onPress,
}: ItemProps) => (
  <ItemContainer onPress={onPress}>
    <PublishingInfo
      nickname={nickname}
      publishedAt={dayjs(publishedAt).fromNow()}
      iconUrl=""
      id=""
    />
    <ItemTitle>{title}</ItemTitle>
    <ItemContent>{content}</ItemContent>
  </ItemContainer>
);

type Props = NativeStackScreenProps<RootStackParamList, "ClubHome">;

const ClubHomeScreen: FC<Props> = ({ navigation, route }) => {
  const { communityId } = route.params;
  const community = useCommunityStore(
    (state) => state.communitiesById[communityId]
  );

  const onPress = useCallback(
    (id: number) => () => {
      navigation.navigate("ViewArticle", { communityId, id });
    },
    [communityId, navigation]
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onWrite = useCallback(() => {
    navigation.navigate("AddArticle", { communityId });
  }, [communityId, navigation]);

  return (
    <Container>
      <FlatList
        data={DATA}
        ListHeaderComponent={
          <ClubHeader
            image={`${community.type}${community.image}`}
            title="창작과 문예"
            desc={`상상이 현실이 되는 그 순간\n창작과 문예의 세계에 빠져보세요.`}
            onBack={onBack}
            onWrite={onWrite}
          />
        }
        renderItem={({ item }) => (
          <Item
            title={item.title}
            nickname={item.nickname}
            content={item.contents}
            publishedAt={item.publishedAt}
            onPress={onPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default ClubHomeScreen;
