'use client';

import styles from './button.module.scss';

interface Props {
  label: string;
  icon: string;
}

const Button = (props: Props) => {
  return (
    <button type="button" className={styles.btn}>
      <span className={styles.icon + ' material-symbols-outlined'}>{props.icon}</span>
      {props.label}
    </button>
  );
};

export default Button;
