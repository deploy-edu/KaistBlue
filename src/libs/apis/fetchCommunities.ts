import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type Community = {
  id: number;
  title: string;
  summary: string;
  status: string;
  type: string;
  image: string;
  createdAt: Date;
  imageStr: string;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: Community[];
};

const fetchCommunities = async (): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.get<
      ResponseParams,
      AxiosResponse<ResponseParams>
    >("community/list");
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default fetchCommunities;
