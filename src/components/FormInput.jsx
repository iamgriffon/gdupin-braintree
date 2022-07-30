import styles from '../styles/form.module.css';

export function FormInput(props) {
  return (
    <>
      <label className={styles.hostedFieldsLabel}>{props?.title}</label>
      <div id={props?.id} className={styles.hostedField} />
    </>
  )
}

