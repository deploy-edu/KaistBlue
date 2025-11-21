import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type RequestParams = {
  id: number;
  communityId: number;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: any[];
};

const deleteUserCommunity = async ({
  id,
  communityId,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("community/user/delete", {
      id,
      communityId,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default deleteUserCommunity;

