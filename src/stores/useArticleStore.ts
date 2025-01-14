import { Article } from "@/libs/apis/fetchArticles";
import { create } from "zustand";

type ArticleStoreState = {
  articlesById: Record<number, Article>; // ID 기반 저장소
  articleIds: number[]; // ID 목록
};

type ArticleStoreActions = {
  setArticles: (data: Article[]) => void;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: number) => void;
};

export const useArticleStore = create<ArticleStoreState & ArticleStoreActions>(
  (set) => ({
    articlesById: {},
    articleIds: [],
    setArticles: (data) => {
      const articlesById = data.reduce<Record<number, Article>>(
        (acc, article) => {
          acc[article.boardId] = article; // ID를 키로 사용
          return acc;
        },
        {}
      );
      const articleIds = data.map((article) => article.boardId);

      set({
        articlesById,
        articleIds,
      });
    },
    addArticle: (article) => {
      set((state) => {
        return {
          ...state,
          articlesById: {
            ...state.articlesById,
            [article.boardId]: article,
          },
          articleIds: [article.boardId, ...state.articleIds],
        };
      });
    },
    updateArticle: (article) => {
      set((state) => {
        return {
          ...state,
          articlesById: {
            ...state.articlesById,
            [article.boardId]: article,
          },
        };
      });
    },
    deleteArticle: (id) => {
      set((state) => {
        const articlesById = { ...state.articlesById };
        delete articlesById[id];
        return {
          ...state,
          articlesById,
          articleIds: state.articleIds.filter((articleId) => articleId !== id),
        };
      });
    },
  })
);
