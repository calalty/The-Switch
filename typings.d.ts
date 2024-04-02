export type User = {
  id: string;
  name: string;
  isActive: boolean;
  color?: string;
};

export type Room = {
  id: string;
  created_at: number;
  name: string;
  users: User[];
};
