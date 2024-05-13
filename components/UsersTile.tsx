import { User } from "@/typings";

export const UsersTile = ({ users }: { users?: User[] }) => {
  if (!users?.length) return null;

  return (
    <div className="w-auto sm:w-full sm:max-w-48 max-w-full px-4 sm:px-0 flex flex-col text-2xl mt-8 border-b-1 border-gray-200">
      <h2 className="px-4 py-2 bg-[#32cd32] text-white flex justify-between">
        <span>Users</span>
        <span>{users.length}</span>
      </h2>
      <ul>
        {users.map(({ name, id }) => (
          <li className="px-4 py-2 shadow-md" key={id}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
