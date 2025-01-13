import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type Article = {
  id: number;
  boardId: number;
  communityId: number;
  title: string;
  content: string;
  createdAt: string;
};

export type RequestParams = {
  id: string;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: Article[];
};

const fetchArticles = async ({
  id,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("board/list", {
      id,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default fetchArticles;
