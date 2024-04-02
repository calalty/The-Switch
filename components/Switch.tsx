import styles from "../styles/switch.module.scss";

export const Switch = () => {
  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span>
          <em></em>
          <strong></strong>
        </span>
      </label>
    </div>
  );
};

export default Switch;
