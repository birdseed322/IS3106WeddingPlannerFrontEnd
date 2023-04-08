import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import React, { useState } from "react";

function FinalisePriceAction(props) {
  const [totalPrice, setTotalPrice] = useState();

  return (
    <>
      <div className="grid">
        <span className="p-float-label my-5">
          <InputNumber
            id="totalPrice"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.value)}
            mode="currency"
            currency="SGD"
          />
          <label htmlFor="totalPrice">Total Price</label>
        </span>
        <Button
          className="mx-1 h-min align-self-center"
          label="Set Price"
          onClick={() => props.handleSetPrice(totalPrice)}
        />
      </div>
    </>
  );
}

export default FinalisePriceAction;
