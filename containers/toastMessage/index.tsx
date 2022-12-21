import styles from "./Toast.module.scss";

const Toast = (message: string, type: string) => {
  if (type === "error") {
    return (
      <div className={`${styles.alert} ${styles.alert_error}`}>{message}</div>
    );
  }
};

export default Toast;
