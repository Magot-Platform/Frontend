import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ membership }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const onConfirmPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://3.70.210.80/setting/?membership=${membership}`,

      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form onSubmit={onConfirmPayment}>
      <PaymentElement />
      <button className='w-full text-white bg-yellow-500 hover:bg-yellow-700 text-md font-semibold rounded-lg p-2 mt-4 mb-2'>
        Pay $ { membership === 1 ? '49' : 99 }
      </button>
      { errorMessage && <div>{ errorMessage }</div> }
    </form>
  );

};

export default CheckoutForm;
