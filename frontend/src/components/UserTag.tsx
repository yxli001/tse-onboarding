import defaultPfp from "/userDefault.svg";

import { User } from "src/api/users";
import styles from "src/components/UserTag.module.css";

export interface UserTagProps {
  user?: User;
  className?: string;
}

export const UserTag = ({ user, className }: UserTagProps) => {
  return (
    <div className={`${styles.tag} ${className}`}>
      {user ? (
        <>
          <img
            src={user.profilePictureURL ? user.profilePictureURL : defaultPfp}
            alt="User Profile"
            className={styles.pfp}
          />
          <span className={styles.name}>{user.name}</span>
        </>
      ) : (
        <span className={styles.name}>Not assigned</span>
      )}
    </div>
  );
};
