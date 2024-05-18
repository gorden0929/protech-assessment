import styles from './basic-dialog.module.scss';

interface Props {
  dialogVisible: boolean;
  currentWord: string;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BasicDialog = (props: Props) => {
  return (
    <div
      style={{
        transition: 'all 0.1s',
        opacity: props.dialogVisible ? 1 : 0,
        pointerEvents: props.dialogVisible ? 'auto' : 'none',
      }}
    >
      <div className={styles.backdrop} onClick={() => props.setDialogVisible(false)}></div>
      <div className={styles.dialog}>
        <div className={styles.dialogContent}>
          <div className={styles.diamondContainer}>
            <div className={styles.diamond}>
              <div className={styles.diamondText}>{props.currentWord}</div>
            </div>
          </div>
          <p style={{ color: 'white' }}>恭喜你获得一个{props.currentWord}字</p>
          <button type="button" className={styles.dialogDismissBtn} onClick={() => props.setDialogVisible(false)}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicDialog;
