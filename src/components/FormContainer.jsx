import styles from '../styles/form.module.css';

export function FormContainer({children}){
  return (
    <form id='cardForm' onSubmit={e => e.preventDefault()} className={styles.cardForm}>
      {children}
    </form>
  )
}