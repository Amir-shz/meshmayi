import TextField from "@/components/TextField";
import { addCommas, removeCommas } from "@persian-tools/persian-tools";
import React, { useState } from "react";

function EditPrice({ price }: { price: number }) {
  const [priceInput, setPriceInput] = useState(`${price ? price : "0"}`);

  function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    if (isNaN(removeCommas(String(e.target.value)))) return;

    setPriceInput(addCommas(e.target.value));
  }

  return (
    <TextField
      size="big"
      label="قیمت(تومان)"
      name="price"
      id="price"
      value={priceInput.toString()}
      onChange={handleChangePrice}
    />
  );
}

export default EditPrice;
