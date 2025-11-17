import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const PAYPAL_CLIENT_ID = "AWmWczVQp725MQeAzl2TxicFt5lcyZ0yFlmHuO9LH0HzmTu7lx_YG1WAF31_CYgifBXAB2uxsGBAFW5F";
  const [selectedPlan, setSelectedPlan] = useState('');
  const [amount, setAmount] = useState('0');

  const plans = [
    { name: "1 Month", price: "100" },
    { name: "3 Months", price: "250" },
    { name: "6 Months", price: "450" }
  ];

  useEffect(() => {
    if (amount !== '0') {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.paypal) {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { value: amount }
                }]
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`✅ Payment successful! Thank you, ${details.payer.name.given_name}`);
                navigate('/thank-you');
              });
            },
            onError: (err) => {
              console.error('❌ Payment Error:', err);
              alert('Payment failed. Please try again.');
            }
          }).render('#paypal-button-container');
        }
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [amount, navigate]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.name);
    setAmount(plan.price);
  };

  return (
    <div className="container mt-5">
      <h2>Select Subscription Plan</h2>
      <div className="mb-4">
        {plans.map((plan, index) => (
          <button
            key={index}
            className={`btn btn-outline-primary m-2 ${selectedPlan === plan.name ? 'active' : ''}`}
            onClick={() => handlePlanSelect(plan)}
          >
            {plan.name} - ₹{plan.price}
          </button>
        ))}
      </div>

      {amount !== '0' && (
        <>
          <h4>Pay ₹{amount} with PayPal</h4>
          <div id="paypal-button-container"></div>
        </>
      )}
    </div>
  );
};

export default Payment;
