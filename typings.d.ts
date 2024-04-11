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
