import { User } from "@/typings";

export const PersonTile = ({ users }: { users?: User[] }) => {
  if (!users?.length) return null;

  return (
    <div className="w-full max-w-48 flex flex-col text-2xl mt-8 border-b-1 border-gray-200">
      <h2 className="px-4 py-2 bg-[#32cd32] text-white flex justify-between">
        <span>Persons</span>
        <span>{users.length}</span>
      </h2>
      <ul>
        {users.map(({name, id}) => (
          <li className="px-4 py-2 shadow-md" key={id}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
