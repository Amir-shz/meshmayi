import TextField from "@/components/TextField";
import { useState } from "react";

function EditName({ name }: { name: string }) {
  const [nameInput, setNameInput] = useState(`${name}`);

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setNameInput(e.target.value);
  }

  return (
    <TextField
      size="big"
      label="نام ماشین"
      name="name"
      id="name"
      value={nameInput}
      onChange={handleChangeName}
    />
  );
}

export default EditName;
