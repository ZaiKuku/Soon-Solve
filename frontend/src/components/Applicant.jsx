import Image from "next/image";
import styles from "../styles/Applicant.module.scss";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function Applicant() {
  return (
    <div className={styles.applicantContainer}>
      <Image
        src="/profile.png"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className={styles.nameTitleContainer}>
        <div className={styles.applicantName}>Benson</div>
      </div>
      <div className={styles.container}>
        <ChatIcon />
        <div className={styles.numberContainer}>
          <i className="fa-solid fa-xl fa-clipboard-list" />
          <div className={styles.number}>5</div>
        </div>
        <div className={styles.checkCancelContainer}>
          <CheckCircleIcon style={{ color: "#4BD37B", fontSize: "40px" }} />
          <CancelIcon style={{ color: "#FD5154", fontSize: "40px" }} />
        </div>
      </div>
    </div>
  );
}

export default Applicant;
