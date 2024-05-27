import styles from './component.module.css';

type HeaderProps = {
  progress: number;
};
export default function Header({ progress }: HeaderProps) {
  const styleProgress = {
    ...(Math.trunc(progress) > 0 ? { width: `${Math.trunc(progress)}%` } : { opacity: 0 }),
  };
  return (
    <div className={styles.header}>
      <h3 className={styles.heading}>Grouped Tasks</h3>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={styleProgress}>
          {Math.trunc(progress)}%
        </div>
      </div>
    </div>
  );
}
