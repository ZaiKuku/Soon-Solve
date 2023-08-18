import { ProfileMenu } from "./PersonalMeau";
import styles from "../styles/Header.module.scss";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.soonSolve}>Soon Solve</div>
      <div className="absolute right-[5vw]">
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Header;
