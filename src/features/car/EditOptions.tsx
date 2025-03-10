import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { useState } from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";

function EditOptions({ options }: { options: string[] }) {
  const [optionsInput, setOptionsInput] = useState([...options]);

  function handleAddOption() {
    setOptionsInput([...optionsInput, ""]);
  }

  function handleRemoveOption(index: number) {
    setOptionsInput((prev) => prev.filter((el, idx) => index !== idx));
  }

  return (
    <>
      {optionsInput.map((option, index) => (
        <div key={index} className=" relative">
          <input
            type="text"
            name="option"
            defaultValue={option}
            className="rounded-lg border hover:border-primary-500 focus:outline-none focus:border-primary-500 bg-neutral-50 text-neutral-600 duration-300 pr-4 h-12 text-p2_M_desktop w-full mb-2"
          />
          <IconButton
            size="lg"
            onClick={() => handleRemoveOption(index)}
            className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2"
          >
            <HiOutlineTrash className="text-red-500" />
          </IconButton>
        </div>
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
