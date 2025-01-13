import ArticleContents from "@/components/ArticleContents";
import CommonText from "@/components/CommonText";
import Header from "@/components/Header";
import PublishingInfo from "@/components/PublishingInfo";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import React, { FC } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    nickname: "하하",
    contents: "독서동호회에서 함께 책을 읽고 토론할 새로운 멤버를 모집합..",
    publishedAt: new Date(),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    nickname: "하하",
    contents: "독서동호회에서 함께 책을 읽고 토론할 새로운 멤버를 모집합..",
    publishedAt: new Date(),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    nickname: "하하",
    contents: "독서동호회에서 함께 책을 읽고 토론할 새로운 멤버를 모집합..",
    publishedAt: new Date(),
  },
];

const Container = styled.View`
  flex: 1;
  background-color: #f2f4fb;
`;

const InnerContainer = styled.View`
  flex: 1;
  margin-horizontal: 22px;
`;

const CommentEditorContainer = styled.View`
  flex-direction: row;
  height: 59px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
`;

const CommentSaveButton = styled.TouchableOpacity`
  background-color: rgba(17, 141, 255, 0.8);
  border-radius: 5px;
  width: 60px;
  height: 37px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

const CommentSaveButtonTitle = styled(CommonText)`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 13.68px;
`;

const CommentInput = styled.TextInput`
  color: #000;
  font-family: NanumGothic;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.82px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  padding-vertical: 21px;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
`;

const ItemInnerContainer = styled.View``;

const ItemReplyIcon = styled.Image`
  width: 29px;
  height: 22px;
`;

const ItemContents = styled(CommonText)`
  color: #000
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.82px;
`;

type ItemProps = {
  nickname: string;
  contents: string;
  publishedAt: Date;
};

const ReplyIcon = require("@/assets/images/reply-icon.png");

const Item = ({ nickname, contents, publishedAt }: ItemProps) => (
  <ItemContainer>
    <ItemReplyIcon source={ReplyIcon} />
    <ItemInnerContainer>
      <PublishingInfo
        nickname={nickname}
        iconUrl=""
        publishedAt={dayjs(publishedAt).fromNow()}
        id=""
      />
      <ItemContents>{contents}</ItemContents>
    </ItemInnerContainer>
  </ItemContainer>
);

type Props = NativeStackScreenProps<RootStackParamList, "ViewArticle">;
const ViewArticleScreen: FC<Props> = ({}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Container style={{ paddingBottom: bottom }}>
      <Header title="게시글" />
      <InnerContainer>
        <FlatList
          data={DATA}
          ListHeaderComponent={
            <ArticleContents
              title="[공지] 다음 도서 선정 안내"
              contents={` 
            이번주 선정도서 입니다.
    
            “ 제인오스틴의 이성과 감성 “
            
            영국인이 가장 사랑하는 여류작가, 제인 오스틴의 데뷔작!
            영국 BBC의 지난 천 년간 최고의 문학가 조사에서 셰익스피어에
            이어 2위를 차지할만큼 영국인이 가장 사랑하는 여류작가, 제인 
            오스틴. 이 책은 '오만과 편견'으로 잘 알려진 제인 오스틴의 
            데뷔작으로, 46회 베를린영화제 금곰상 수상작인 영화 '센스, 
            센스빌리티'의 원작소설이다.
            `}
              nickname="하하"
              iconUrl=""
              publishedAt="2023/07/27 10:59:47"
            />
          }
          renderItem={({ item }) => (
            <Item
              nickname={item.nickname}
              contents={item.contents}
              publishedAt={item.publishedAt}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </InnerContainer>
      <CommentEditorContainer>
        <CommentInput
          placeholder="댓글을 입력해주세요."
          placeholderTextColor={"#bbb"}
        />
        <CommentSaveButton>
          <CommentSaveButtonTitle>등록</CommentSaveButtonTitle>
        </CommentSaveButton>
      </CommentEditorContainer>
    </Container>
  );
};

export default ViewArticleScreen;
