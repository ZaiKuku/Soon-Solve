import Image from "next/image";
import styles from "../styles/notification.module.scss";

function Notification() {
  return (
    <div className={styles.notificationContainer}>
      <div>
        <Image
          src="/profile.png"
          width={50}
          height={50}
          className="rounded-full shrink-0 object-cover"
        />
      </div>
      <div className={styles.notificationBox}>
        <div className={styles.notification}>
          yoyoyoyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyoyoyoyoyo
        </div>
      </div>
    </div>
  );
}

export default Notification;
