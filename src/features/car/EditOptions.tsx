import Button from "@/components/Button";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

function EditOptions({ options }: { options: string[] }) {
  const [optionsInput, setOptionsInput] = useState([...options]);

  function handleAddOption() {
    setOptionsInput([...optionsInput, ""]);
  }

  return (
    <>
      {optionsInput.map((option, index) => (
        <input
          key={index}
          type="text"
          name="option"
          defaultValue={option}
          className="rounded-lg border hover:border-primary-500 focus:outline-none focus:border-primary-500 bg-neutral-50 text-neutral-600 duration-300 pr-4 h-12 text-p2_M_desktop w-full mb-2"
        />
      ))}
      <Button
        fullWidth
        type="outline"
        icon={<HiPlus />}
        size="Xbig"
        onClick={() => handleAddOption()}
      >
        افزودن
      </Button>
    </>
  );
}

export default EditOptions;
