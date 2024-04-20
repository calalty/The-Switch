'use client';

import { User } from "@/typings";
import { Button } from "./Button";
import { removeUserFromRoom } from "@/api/removeUserFromRoom";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDetectInactiveUser } from "@/hooks/use-detect-inactive-user";

export const PersonTile = ({ users }: { users: User[] }) => {
  const params = useParams()
  const session = useSession()
  const isUserInactive = useDetectInactiveUser()

  useEffect(() => {
    if (isUserInactive) removeUserFromRoom(params.slug[0], session.data?.user?.id!)
  }, [isUserInactive, params.slug, session.data?.user?.id])

  if (!users) return null;

  return (
    <div className="w-full max-w-48 flex flex-col text-2xl mt-8 border-b-1 border-gray-200">
      <h2 className="px-4 py-2 bg-[#32cd32] text-white flex justify-between">
        <span>Persons</span>
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
