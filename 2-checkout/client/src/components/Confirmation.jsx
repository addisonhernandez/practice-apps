import React from 'react';

const Confirmation = (props) => {
  const { formOneData, formTwoData, formThreeData } = props.formData;
  return (
    <div className="confirmation">
      <h1>Confirmation</h1>
      <h2>Account</h2>
      {Object.keys(formOneData).map((key) => (
        <div key={key}>
          <span>{key}: </span>
          <span>{formOneData[key]}</span>
          <br />
        </div>
      ))}
      {/* <div>{JSON.stringify(formOneData)}</div> */}
      <h2>Shipping</h2>
      <p>Shipping address</p>
      {Object.keys(formTwoData.shippingAddress).map((key) => (
        <div key={key}>
          <span>{formOneData[key]}</span>
          <br />
        </div>
      ))}
      <div>{JSON.stringify(formTwoData)}</div>
      <h2>Payment</h2>
      <div>{JSON.stringify(formThreeData)}</div>
    </div>
  );
};

export default Confirmation;
