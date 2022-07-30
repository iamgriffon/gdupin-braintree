import { useState } from 'react';
import { Api } from '../services/axios';
import braintree from 'braintree-web';
import styles from '../styles/home.module.css';
import { useBraintree } from '../context/braintree';
import { FormContainer } from '../components/formContainer';
import { Header } from '../components/Header';
import { FormInput } from '../components/formInput';

export default function Home() {

  const [cardType, setCardType] = useState('');
  const [hasCardType, setHasCardType] = useState(false);
  const { clientToken, saveToken } = useBraintree()

  async function getToken() {
    await Api.post('token')
      .then(res => res.data)
      .then(data => {
        saveToken(data);
      })
  }

  function createClientInstance() {
    braintree.client.create({
      authorization: clientToken
    }, function (err, clientInstance) {
      if (err) {
        console.error(err);
        return;
      }
      createHostedFields(clientInstance);
      console.log('Client Instance Successfully Created!', clientInstance)
    });
  }

  function createHostedFields(clientInstance) {
    const form = document.getElementById('cardForm');
    braintree.hostedFields.create({
      client: clientInstance,
      fields: {
        number: {
          selector: '#card-number',
          placeholder: '4111 1111 1111 1111'
        },
        cardholderName: {
          selector: '#cc-name',
          placeholder: 'braintree'
        },
        cvv: {
          selector: '#cvv',
          placeholder: '•••'
        },
        expirationDate: {
          selector: '#cc-expiration',
          placeholder: 'MM/YYYY'
        },
        postalCode: {
          selector: '#zip-code',
          placeholder: '11111'
        }
      }
    }, function (err, hostedFieldsInstance) {
      if (err) {
        console.error(err);
        return;
      }
      var tokenize = function (event) {
        event.preventDefault();
        hostedFieldsInstance.tokenize(function (err, payload) {
          if (err) {
            alert('Something went wrong. Check your card details and try again.');
            return;
          }
          alert('Submit your nonce (' + payload.nonce + ') to your server here!');
        });
      };

      form.addEventListener('submit', tokenize, false);
    }, function (err, hostedFieldsInstance) {
      hostedFieldsInstance.on('cardTypeChange', (e) => {
        if (e.cards.length === 1) {
          const newCard = e.cards[0].niceType;
          setHasCardType(true)
          setCardType(`Pay With: ${newCard}`)
        } else {
          setHasCardType(false)
          setCardType(`Please input a valid card number!`)
        }
      })
    });
  }

  return (
    <div>
      <Header />

      <div className={styles.buttonContainer}>
        <button onClick={getToken} className={styles.button}>Get Client Token from BT</button>
        <button onClick={createClientInstance} className={styles.button}>Generate Hosted Fields</button>
      </div>

      <FormContainer>
        <FormInput title="Cardholder Name: " id="cc-name"/>
        <FormInput title="Credit Card Number: " id="card-number"/>
        <FormInput title="Expiration Date: " id="cc-expiration"/>
        <FormInput title="CVV Number: " id="cvv"/>
        <FormInput title="Cardholder Zip Code: " id="zip-code"/>
      {hasCardType ? (<button className={styles.buttonGreen}>{cardType}</button>) : (<button className={styles.button} disabled>You currently do not have a card type</button>)}
      </FormContainer>
    </div>
  )
}
