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
  communityId: string;
  boardId: string;
  content: string;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: Comment[];
};

const saveComment = async ({
  communityId,
  content,
  boardId,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("board/comment/save", {
      communityId,
      content,
      boardId,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default saveComment;
