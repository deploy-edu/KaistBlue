import { Article } from "@/libs/apis/fetchArticles";
import { create } from "zustand";

type ArticleStoreState = {
  articlesById: Record<number, Article>; // ID 기반 저장소
  articleIds: number[]; // ID 목록
};

type ArticleStoreActions = {
  setArticles: (data: Article[]) => void;
};

export const useArticleStore = create<ArticleStoreState & ArticleStoreActions>(
  (set) => ({
    articlesById: {},
    articleIds: [],
    setArticles: (data) => {
      const articlesById = data.reduce<Record<number, Article>>(
        (acc, article) => {
          acc[article.id] = article; // ID를 키로 사용
          return acc;
        },
        {}
      );
      const articleIds = data.map((article) => article.id);

      set({
        articlesById,
        articleIds,
      });
    },
  })
);
