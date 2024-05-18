import styles from './word.module.scss';

interface Props {
  label: string;
  count: number;
}

const Word = (props: Props) => {
  return (
    <div className={styles.word + ' ' + (props.count === 0 ? styles.wordEmpty : '')}>
      {props.count > 0 ? <div className={styles.wordCount}>{props.count}</div> : ''}
      <span>{props.label}</span>
    </div>
  );
};

export default Word;
