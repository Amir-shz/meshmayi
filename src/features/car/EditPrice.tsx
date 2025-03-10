import TextField from "@/components/TextField";
import { addCommas, removeCommas } from "@persian-tools/persian-tools";
import { useState } from "react";

function EditPrice({ price }: { price: number }) {
  const [priceInput, setPriceInput] = useState(`${price}`);

  function handleChangePrice(e) {
    if (isNaN(removeCommas(String(e.target.value)))) return;

    setPriceInput(addCommas(e.target.value));
  }

  return (
    <TextField
      size="big"
      label="قیمت(تومان)"
      name="price"
      id="price"
      // value={formStates.price.toString()}
      value={priceInput.toString()}
      onChange={handleChangePrice}
    />
  );
}

export default EditPrice;
