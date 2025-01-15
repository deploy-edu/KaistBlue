import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type Profile = {
  id: number;
  communityId: number;
  userId: number;
  sortNo: number;
  nickName: string;
  status: string;
  createdAt: string;
  image: string;
  imageStr: string;
  type: string;
};

export type RequestParams = {
  communityId: string;
  nickName: string;
  sortNo: string;
  imageStr: string;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: Profile;
};

const saveProfile = async ({
  communityId,
  nickName,
  sortNo,
  imageStr,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("community/user/add", {
      communityId,
      nickName,
      sortNo,
      imageStr,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default saveProfile;
