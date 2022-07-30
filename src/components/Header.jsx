import styles from '../styles/header.module.css';
import { useBraintree } from '../context/braintree';


export function Header() {
  const { clientToken } = useBraintree();
  return (
    <>
      <h3 className={styles.pageTitle}>Gustavo Dupin - Braintree </h3>
      <p className={styles.tokenLabel}>
        {
          clientToken ? (<>Your current token is  <strong>{clientToken.slice(0,64)}</strong>  (first 64 digits)</>) : 'You currently do not have a token'
        }
      </p>
    </>
  )
}