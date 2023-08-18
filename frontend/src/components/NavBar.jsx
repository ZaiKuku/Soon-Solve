import Link from "next/link";
import styles from "../styles/NavBar.module.scss";

function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <Link href="/allTasks" className={styles.searchContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 43 43"
          fill="none"
        >
          <path
            d="M18.7615 1.0569C8.95627 1.06457 0.986261 9.04706 0.993933 18.8523C1.0016 28.6575 8.98409 36.6275 18.7893 36.6198C21.7867 36.6174 24.7328 35.9039 27.2211 34.5302C27.4207 34.77 27.642 34.9909 27.8821 35.1902L32.9665 40.2666C33.436 40.7941 34.0084 41.22 34.6485 41.5183C35.2886 41.8166 35.9829 41.9809 36.6888 42.0011C37.3947 42.0213 38.0973 41.8971 38.7534 41.6359C39.4096 41.3748 40.0054 40.9823 40.5044 40.4826C41.0033 39.9829 41.3949 39.3864 41.655 38.7299C41.9151 38.0733 42.0382 37.3705 42.0169 36.6647C41.9956 35.9588 41.8302 35.2648 41.5309 34.6251C41.2317 33.9855 40.8048 33.4138 40.2766 32.9451L35.1922 27.8686C34.9445 27.6213 34.6719 27.4002 34.3788 27.2088C35.7486 24.7183 36.61 21.8218 36.6076 18.7736C36.5999 8.96839 28.6174 0.99838 18.8122 1.00605L18.7615 1.0569ZM18.7654 6.13731C25.8272 6.13178 31.4709 11.7666 31.4764 18.8284C31.479 22.1815 30.2622 25.2815 28.1302 27.5693C28.0794 27.6202 28.0287 27.671 27.9779 27.7219C27.7381 27.9215 27.5172 28.1427 27.3179 28.3828C25.0842 30.4168 22.0368 31.5876 18.7346 31.5902C11.6728 31.5958 6.02911 25.9609 6.02358 18.8991C6.01806 11.8374 11.6529 6.19368 18.7147 6.18815L18.7654 6.13731Z"
            fill="black"
          />
        </svg>
        <div className={styles.search}>search</div>
      </Link>
      <Link href="/userTasks" className={styles.missionContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 44 39"
          fill="none"
        >
          <path
            d="M15.257 6.30006H41.1855"
            stroke="black"
            strokeWidth="4.44761"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 5.82857L4.88571 7.71426L9.59997 3"
            stroke="black"
            strokeWidth="4.44761"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 19.9714L4.88571 21.8571L9.59997 17.1429"
            stroke="black"
            strokeWidth="4.44761"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 34.1143L4.88571 36L9.59997 31.2857"
            stroke="black"
            strokeWidth="4.44761"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.257 20.4429H41.1855"
            stroke="black"
            strokeWidth="4.44761"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.257 34.5858H41.1855"
            stroke="black"
            strokeWidth="4.44761"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.mission}>Mission List</div>
      </Link>

      <button className={styles.notificationsContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 41 45"
          fill="none"
        >
          <path
            d="M32.1667 15.3663C32.1667 12.0865 30.9376 8.94113 28.7495 6.62201C26.5616 4.30286 23.5942 3 20.5 3C17.4058 3 14.4383 4.30286 12.2504 6.62201C10.0625 8.94113 8.83333 12.0865 8.83333 15.3663C8.83333 29.7937 3 33.9157 3 33.9157H38C38 33.9157 32.1667 29.7937 32.1667 15.3663Z"
            stroke="black"
            strokeWidth="4.00285"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.6931 40.4365C29.3513 41.0221 28.8607 41.5083 28.2702 41.846C27.6798 42.184 27.0106 42.3619 26.3292 42.3619C25.6479 42.3619 24.9786 42.184 24.3883 41.846C23.7979 41.5083 23.3072 41.0221 22.9653 40.4365"
            stroke="black"
            strokeWidth="4.00285"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.notifications}>notifications</div>
      </button>
      <Link href="/userProfile" className={styles.profileContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 34 33"
          fill="none"
        >
          <path
            d="M17 0C12.325 0 8.5 4.5016 8.5 10.0482C8.5 15.5948 12.325 20.0964 17 20.0964C21.675 20.0964 25.5 15.5948 25.5 10.0482C25.5 4.5016 21.675 0 17 0ZM8.1175 20.0964C3.6125 20.2974 0 23.7941 0 28.135V32.1543H34V28.135C34 23.7941 30.43 20.2974 25.8825 20.0964C23.5875 22.5482 20.4425 24.1157 17 24.1157C13.5575 24.1157 10.4125 22.5482 8.1175 20.0964Z"
            fill="black"
          />
        </svg>
        <div className={styles.profile}>profile</div>
      </Link>
    </div>
  );
}

export default NavBar;
