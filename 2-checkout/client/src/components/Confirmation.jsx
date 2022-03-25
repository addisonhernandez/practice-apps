import React from 'react';

const FormOneView = ({ formOneData }) => (
  <>
    <h2>Account</h2>
    {Object.keys(formOneData).map((key) => (
      <div key={key}>
        <span>{key}: </span>
        <span>{formOneData[key]}</span>
        <br />
      </div>
    ))}
  </>
);

const FormTwoView = ({ formTwoData }) => {
  const { shippingAddress } = formTwoData;
  return (
    <>
      <h2>Shipping</h2>
      <p>Shipping address</p>
      {Object.keys(shippingAddress).map((key) => (
        <div key={key}>
          <span>{shippingAddress[key]}</span>
          <br />
        </div>
      ))}
      <p>Phone Number: {formTwoData.phoneNumber}</p>
    </>
  );
};

const FormThreeView = ({ formThreeData }) => (
  <>
    <h2>Payment</h2>
    {Object.keys(formThreeData).map((key) => (
      <div key={key}>
        <span>{key}: </span>
        <span>{formThreeData[key]}</span>
      </div>
    ))}
  </>
);

const Confirmation = (props) => {
  const { formOneData, formTwoData, formThreeData } = props.formData;
  return (
    <div className="confirmation">
      <h1>Confirmation</h1>
      <FormOneView formOneData={formOneData} />
      <FormTwoView formTwoData={formTwoData} />
      <FormThreeView formThreeData={formThreeData} />
      <button>Purchase</button>
    </div>
  );
};

export default Confirmation;
