import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type Article = {
  id: number;
  communityId: number;
  userId: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type RequestParams = {
  title: string;
  content: string;
  communityId: string;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: Article[];
};

const saveArticle = async ({
  title,
  content,
  communityId,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("board/save", {
      title,
      content,
      communityId,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default saveArticle;
