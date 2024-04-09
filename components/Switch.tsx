'use client';

import { useState } from "react";
import styles from "../styles/switch.module.scss";
import { useSession } from "next-auth/react";
import { patchUserSwitch } from "@/api/patchUserSwitch";

export const Switch = ({ slug }: { slug: string }) => {
  const { data: session } = useSession();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleCheckboxChange = async () => {
    setIsActive(prevIsActive => !prevIsActive);

   await patchUserSwitch(slug, {isActive, session})
  };

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isActive}
        onChange={handleCheckboxChange}
      />
      <span>
        <em></em>
        <strong></strong>
      </span>
    </label>
  );
};
