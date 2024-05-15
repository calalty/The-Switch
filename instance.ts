import { AxiosApiResponse, Room } from "@/typings";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import { env } from "process";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

type PayloadPatchUserSwitch = {
  isActive: boolean;
  id?: string | null;
};

const makeRequest = async (config: AxiosRequestConfig) => {
  try {
    config.baseURL = env.NEXTAUTH_URL ? `${env.NEXTAUTH_URL}/api` : "/api";

    const { data } = await axiosInstance(config);
    return data;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export const createRoom = (room: Room): Promise<AxiosApiResponse> => {
  return makeRequest({
    method: "post",
    url: "/createRoom",
    data: room,
  });
};

export const getRoom = (slug: string): Promise<Room> => {
  return makeRequest({
    method: "get",
    url: `/getRoom/${slug}`,
  });
};

export const patchUserSwitch = (
  slug: string,
  payload: PayloadPatchUserSwitch
): Promise<Room> => {
  return makeRequest({
    method: "patch",
    url: `/patchUserSwitch/${slug}`,
    data: payload,
  });
};

export const patchUserToRoom = (
  slug: string,
  session: Session
): Promise<Room> => {
  return makeRequest({
    method: "patch",
    url: `/patchUserToRoom/${slug}`,
    data: {
      id: session?.user?.id,
      name: session?.user?.name,
      isActive: false,
    },
  });
};

export const removeRoom = (slug: string): Promise<Room> => {
  return makeRequest({
    method: "delete",
    url: `/removeRoom/${slug}`,
  });
};

export const removeUserFromRoom = (slug: string, id: string): Promise<Room> => {
  return makeRequest({
    method: "patch",
    url: `/removeUserFromRoom/${slug}`,
    data: id,
  });
};
