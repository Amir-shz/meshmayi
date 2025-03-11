import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { useState } from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";

function EditDescriptions({ descriptions }: { descriptions: string[] }) {
  const [descriptionsInput, setDescriptionInput] = useState([...descriptions]);

  function handleAddDescription() {
    setDescriptionInput([...descriptionsInput, ""]);
  }

  function handleRemoveDescription(index: number) {
    setDescriptionInput((prev) => prev.filter((el, idx) => index !== idx));
  }

  return (
    <>
      {descriptionsInput.map((description, index) => (
        <div key={index} className=" relative">
          <textarea
            name="description"
            defaultValue={description}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height =
                e.currentTarget.scrollHeight - 24 + "px";
            }}
            style={{ height: "48px" }}
            className=" rounded-lg border hover:border-primary-500 focus:outline-none focus:border-primary-500 bg-neutral-50 text-neutral-600 duration-300 px-4 h-10 text-p2_M_desktop w-full mb-2 resize-none hide-scrollbar py-3"
          />
          <IconButton
            size="lg"
            onClick={() => handleRemoveDescription(index)}
            className="absolute top-0 left-0 -translate-x-1 -translate-y-2"
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
        onClick={() => handleAddDescription()}
      >
        افزودن
      </Button>
    </>
  );
}

export default EditDescriptions;
