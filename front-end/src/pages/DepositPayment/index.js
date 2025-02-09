import { useState } from 'react';
import * as DepositService from '../../services/DepositService';

const DepositPaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [orderInfo, setOrderInfo] = useState('');

  const handlePayment = async () => {
    try {
      const response = await DepositService.postDeposit(amount, orderInfo);
      console.log(response);
      if (response.statusCode === 200) {
        window.location.href = response.data;
      } else {
        alert('Failed to create payment URL');
      }
    } catch (error) {
      alert('Error creating payment URL');
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={orderInfo}
        onChange={(e) => setOrderInfo(e.target.value)}
        placeholder="Order Info"
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default DepositPaymentPage;