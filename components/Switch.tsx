"use client";

import { useState } from "react";
import styles from "../styles/switch.module.scss";

import { patchUserSwitch } from "@/api/patchUserSwitch";
import { Room } from "@/typings";

import { Session } from "next-auth";

export const Switch = ({
  room,
  session,
  slug,
}: {
  room: Room;
  session: Session | null;
  slug: string;
}) => {
  const isSwitchInUse = room?.users.some((user) => user.isActive);
  const isActiveUser = room?.users.find((user) => user.isActive)?.name;
  const isAnotherUserActive = room?.users.some(
    (user) => user.isActive && user.id !== session?.user?.id
  );

  const [isActive, setIsActive] = useState<boolean>(isSwitchInUse);

  const handleCheckboxChange = async () => {
    setIsActive((prevIsActive) => !prevIsActive);
    await patchUserSwitch(slug[0], {
      isActive: !isActive,
      id: session?.user?.id,
    });
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
