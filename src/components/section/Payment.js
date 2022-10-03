import { useEffect, useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import api from '../../utils/api';
import CheckoutForm from './CheckoutForm';
import {
  STRIPE_PUB_KEY
} from '../../config';


const stripePromise = loadStripe(STRIPE_PUB_KEY);

const Payment = ({ showModal, membership }) => {
  const onShowModal = (v) => {
    showModal(v);
  }

  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const body = {
      membership: membership
    };

    const getData = async () => {
      const res = await api.post('/payments/secret', body);
      const data = await res.data;
      setClientSecret(data.client_secret);
    }

    getData();
  }, [clientSecret, membership]);

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: 'stripe',

      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
      }
    }
  };

  return (
    <div className='h-auto w-80 bg-white px-5 py-2 rounded-lg'>
      <div className='flex justify-end'>
        <button className='text-md' onClick={() => onShowModal(false)}> &#x2715; </button>
      </div>
      <div className='text-xl mb-3'>
        <p>Payment Details</p>
      </div>
    {clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm membership={membership} />
      </Elements>
    )}
    </div>
  )
}

export default Payment;
