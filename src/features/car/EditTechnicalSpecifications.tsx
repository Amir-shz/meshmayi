import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import TextField from "@/components/TextField";
import React, { useState } from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";

function EditTechnicalSpecifications({
  technicalSpecifications,
}: {
  technicalSpecifications: {
    label: string;
    description: string;
  }[];
}) {
  const [technicalSpecificationsInput, setTechnicalSpecificationsInput] =
    useState([...technicalSpecifications]);

  function handleAddTechnicalSpecification() {
    setTechnicalSpecificationsInput((prev) => [
      ...prev,
      {
        label: "",
        description: "",
      },
    ]);
  }

  function handleUpdateTechnicalSpecifications(
    index: number,
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setTechnicalSpecificationsInput((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [key]: e.target.value } : item
      )
    );
  }

  function handleRemoveTechnicalSpecification(index: number) {
    setTechnicalSpecificationsInput((prev) =>
      prev.filter((el, idx) => index !== idx)
    );
  }

  return (
    <>
      {technicalSpecificationsInput.map((technicalSpecification, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border border-neutral-400 mb-2 relative"
        >
          <TextField
            label="لیبل(تایتل)"
            name="technicalSpecificationLabel"
            id="technicalSpecificationLabel"
            value={technicalSpecification.label}
            onChange={(e) =>
              handleUpdateTechnicalSpecifications(index, "label", e)
            }
          />
          <TextField
            label="توضیحات"
            name="technicalSpecificationDescription"
            id="technicalSpecificationDescription"
            value={technicalSpecification.description}
            onChange={(e) =>
              handleUpdateTechnicalSpecifications(index, "description", e)
            }
          />
          <IconButton
            size="lg"
            onClick={() => handleRemoveTechnicalSpecification(index)}
            className="absolute top-0 left-0  -translate-x-1 -translate-y-2"
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
        onClick={() => handleAddTechnicalSpecification()}
      >
        افزودن
      </Button>
    </>
  );
}

export default EditTechnicalSpecifications;
