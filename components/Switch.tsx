'use client';

import { useState } from "react";
import styles from "../styles/switch.module.scss";
import { useSession } from "next-auth/react";
import { patchUserSwitch } from "@/api/patchUserSwitch";
import { Room } from "@/typings";

export const Switch = ({ slug, room }: { slug: string, room: Room }) => {
  const { data: session } = useSession();
  
  const isSwitchInUse = room?.users.some(user => user.isActive);
  const isActiveUser = room?.users.find(user => user.isActive)?.name;
  const isAnotherUserActive = room?.users.some(user => user.isActive && user.id !== session?.user?.id);

  const [isActive, setIsActive] = useState<boolean>(isSwitchInUse);

  const handleCheckboxChange = async () => {
    setIsActive(prevIsActive => !prevIsActive);


    await patchUserSwitch(slug, { isActive: !isActive, id: session?.user?.id });
  };

  return (
    <>
      <p>{isActiveUser}</p>
      <label className={styles.switch}>
        <input
          type="checkbox"
          disabled={isAnotherUserActive}
          checked={isActive}
          onChange={handleCheckboxChange}
        />
        <span>
          <em></em>
          <strong></strong>
        </span>
      </label>
    </>
  );
};

