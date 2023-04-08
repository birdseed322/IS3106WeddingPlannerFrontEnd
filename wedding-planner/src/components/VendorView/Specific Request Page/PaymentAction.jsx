import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import React, { useState } from "react";

function PaymentAction(props) {
  const [payment, setPayment] = useState();

  return (
    <>
      <div className="grid">
        <span className="p-float-label my-5">
          <InputNumber
            id="payment"
            value={payment}
            onChange={(e) => setPayment(e.value)}
            mode="currency"
            currency="SGD"
          />
          <label htmlFor="payment">Payment</label>
        </span>
        <Button
          className="mx-1 h-min align-self-center"
          label="Pay"
          onClick={() => props.handlePayment(payment)}
        />
      </div>
    </>
  );
}

export default PaymentAction;
