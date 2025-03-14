import TextField from "@/components/TextField";
import { digitsEnToFa, digitsFaToEn } from "@persian-tools/persian-tools";
import { useState } from "react";

function EditModel({ model }: { model: number }) {
  const [modelInput, setModelInput] = useState(
    `${model ? digitsEnToFa(model) : "0"}`
  );

  function handleChangeModel(e: React.ChangeEvent<HTMLInputElement>) {
    if (isNaN(Number(digitsFaToEn(e.target.value)))) return;

    setModelInput(digitsEnToFa(e.target.value));
  }

  return (
    <TextField
      size="big"
      label="مدل(سال)"
      name="model"
      id="model"
      value={modelInput.toString()}
      onChange={handleChangeModel}
    />
  );
}

export default EditModel;
