import styles from "./UserEmptyCard.module.css"

export default function UserEmptyCard() {
  return (
    <div className={styles.UserEmptyCard}>
      <div className={styles.Empty}>
        <p>No rental</p>
      </div>
      
      <button className={styles.Button}>Make a rent?</button>
    </div>
  );
}