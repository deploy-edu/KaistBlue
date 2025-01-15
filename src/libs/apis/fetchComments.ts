import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type Comment = {
  createdAt: string;
  nickName: string;
  boardId: number;
  id: number;
  communityId: number;
  userId: number;
  content: string;
};

export type RequestParams = {
  boardId: string;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: Comment[];
};

const fetchComments = async ({
  boardId,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("board/comment/list", {
      boardId,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default fetchComments;
