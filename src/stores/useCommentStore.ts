import { Comment } from "@/libs/apis/fetchComments";
import { create } from "zustand";

type CommentStoreState = {
  commentsById: Record<number, Comment>; // ID 기반 저장소
  commentIds: number[]; // ID 목록
};

type CommentStoreActions = {
  setComments: (data: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (comment: Comment) => void;
  deleteComment: (id: number) => void;
};

export const useCommentStore = create<CommentStoreState & CommentStoreActions>(
  (set) => ({
    commentsById: {},
    commentIds: [],
    setComments: (data) => {
      const commentsById = data.reduce<Record<number, Comment>>(
        (acc, comment) => {
          acc[comment.id] = comment; // ID를 키로 사용
          return acc;
        },
        {}
      );
      const commentIds = data.map((comment) => comment.id);

      set({
        commentsById,
        commentIds,
      });
    },
    addComment: (comment) => {
      set((state) => {
        return {
          ...state,
          commentsById: {
            ...state.commentsById,
            [comment.id]: comment,
          },
          commentIds: [comment.id, ...state.commentIds],
        };
      });
    },
    updateComment: (comment) => {
      set((state) => {
        return {
          ...state,
          commentsById: {
            ...state.commentsById,
            [comment.id]: comment,
          },
        };
      });
    },
    deleteComment: (id) => {
      set((state) => {
        const commentsById = { ...state.commentsById };
        delete commentsById[id];
        return {
          ...state,
          commentsById,
          commentIds: state.commentIds.filter((commentId) => commentId !== id),
        };
      });
    },
  })
);
