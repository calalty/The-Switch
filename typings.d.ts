export type User = {
  name: string;
  isActive: boolean;
  id?: string | null;
  color?: string;
};

export type Room = {
  id: string;
  created_at: number;
  name: string;
  users: User[];
};

export type AxiosApiResponse = {
  error: AxiosError | null;
  headers: AxiosResponseHeaders | Partial<RawAxiosResponseHeaders>;
  isError: boolean;
};
