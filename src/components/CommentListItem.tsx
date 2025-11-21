import CommonText from "@/components/CommonText";
import PublishingInfo from "@/components/PublishingInfo";
import { useCommentStore } from "@/stores/useCommentStore";
import styled from "@emotion/native";
import dayjs from "dayjs";
import React, { FC } from "react";

const ReplyIcon = require("@/assets/images/reply-icon.png");

const Container = styled.View`
  flex-direction: row;
  padding-vertical: 21px;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
`;

const InnerContainer = styled.View``;

const Icon = styled.Image`
  width: 29px;
  height: 22px;
`;

const Contents = styled(CommonText)`
  color: #000
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.82px;
`;

type Props = {
  id: number;
};

const CommentListItem: FC<Props> = ({ id }) => {
  const comment = useCommentStore((state) => state.commentsById[id]);

  return (
    <Container>
      <Icon source={ReplyIcon} />
      <InnerContainer>
        <PublishingInfo
          nickname={comment.nickName || "닉네임"}
          iconUrl={
            comment.profileImage
              ? comment.profileImage.startsWith("data:")
                ? comment.profileImage
                : comment.profileType
                ? `${comment.profileType}${comment.profileImage}`
                : `data:image/png;base64,${comment.profileImage}`
              : undefined
          }
          publishedAt={dayjs(comment.createdAt).fromNow()}
          id={comment.userId}
        />
        <Contents>{comment.content}</Contents>
      </InnerContainer>
    </Container>
  );
};

export default CommentListItem;
