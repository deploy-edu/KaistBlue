import ArticleContents from "@/components/ArticleContents";
import CommentListItem from "@/components/CommentListItem";
import CommonText from "@/components/CommonText";
import Header from "@/components/Header";
import fetchComments from "@/libs/apis/fetchComments";
import saveComment from "@/libs/apis/saveComment";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { useArticleStore } from "@/stores/useArticleStore";
import { useCommentStore } from "@/stores/useCommentStore";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

const CommentSaveButton = styled.Pressable`
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

type Props = NativeStackScreenProps<RootStackParamList, "ViewArticle">;
const ViewArticleScreen: FC<Props> = ({ route }) => {
  const { bottom } = useSafeAreaInsets();
  const { communityId, id } = route.params;
  const article = useArticleStore((state) => state.articlesById[id]);
  const commentIds = useCommentStore((state) => state.commentIds);
  const [comment, setComment] = useState("");

  const onChangeComment = useCallback((text: string) => {
    setComment(text);
  }, []);

  const onSaveComment = useCallback(async () => {
    if (!comment) {
      return;
    }
    try {
      const response = await saveComment({
        boardId: id.toString(),
        communityId: communityId.toString(),
        content: comment,
      });

      useCommentStore.getState().addComment(response.data[0]);
      setComment("");
    } catch (e) {
      console.error(e);
    }
  }, [comment, id, communityId]);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetchComments({ boardId: id.toString() });
        console.log("response", response);
        useCommentStore.getState().setComments(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, []);

  return (
    <Container style={{ paddingBottom: bottom }}>
      <Header title="게시글" />
      <InnerContainer>
        <FlatList
          data={commentIds}
          ListHeaderComponent={
            <ArticleContents
              title={article.title}
              contents={article.content}
              nickname={article.nickName}
              iconUrl={
                article.profileType &&
                article.profileImage &&
                `${article.profileType}${article.profileImage}`
              }
              publishedAt={dayjs(article.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
              userId={article.userId}
            />
          }
          renderItem={({ item }) => <CommentListItem id={item} />}
          keyExtractor={(item) => {
            console.log("item", item);
            return item.toString();
          }}
        />
      </InnerContainer>
      <CommentEditorContainer>
        <CommentInput
          placeholder="댓글을 입력해주세요."
          placeholderTextColor={"#bbb"}
          value={comment}
          onChangeText={onChangeComment}
        />
        <CommentSaveButton onPress={onSaveComment}>
          <CommentSaveButtonTitle>등록</CommentSaveButtonTitle>
        </CommentSaveButton>
      </CommentEditorContainer>
    </Container>
  );
};

export default ViewArticleScreen;
