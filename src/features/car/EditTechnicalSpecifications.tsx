import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

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

  function handleUpdateTechnicalSpecifications(index, key, e) {
    setTechnicalSpecificationsInput((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [key]: e.target.value } : item
      )
    );
  }

  return (
    <>
      {technicalSpecificationsInput.map((technicalSpecification, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border border-neutral-400 mb-2"
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
