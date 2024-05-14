"use client";

import styles from "../styles/button.module.scss";

type Props = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  isRounded?: boolean;
};

export const Button = ({
  text,
  onClick,
  disabled,
  isRounded = true,
}: Props) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.button} text-lg font-mono font-black ${isRounded ? "rounded-md" : "rounded-tl-none rounded-bl-none"
      }`}
  >
    <span className={styles.front}>{text}</span>
  </button>
);
