"use client";

import { HiOutlinePencil, HiPlus } from "react-icons/hi";
import Button from "./Button";
import Slider from "./Slider";
import TextField from "./TextField";
import {
  addCommas,
  digitsEnToFa,
  digitsFaToEn,
  removeCommas,
} from "@persian-tools/persian-tools";
import { useState } from "react";

interface carTypes {
  _id?: string;
  name: string;
  price: number;
  model: number;
  colors: string;
  pictures: { _id: string; src: string }[];
  descriptions: string[];
  options: string[];
  technicalSpecifications: {
    label: string;
    description: string;
  }[];
}

function EditCarForm({ car }: { car: carTypes }) {
  const [formStates, setFormStates] = useState({
    name: car.name,
    price: addCommas(car.price),
    model: digitsEnToFa(car.model),
    options: car.options,
    technicalSpecifications: car.technicalSpecifications,
    descriptions: car.descriptions,
    colors: car.colors,
  });

  function handleChangeName(e) {
    setFormStates({ ...formStates, name: e.target.value });
  }

  function handleChangePrice(e) {
    console.log();
    if (isNaN(removeCommas(String(e.target.value)))) return;

    setFormStates({
      ...formStates,
      price: addCommas(e.target.value),
    });
  }

  function handleChangeModel(e) {
    if (isNaN(Number(digitsFaToEn(e.target.value)))) return;

    setFormStates({ ...formStates, model: digitsEnToFa(e.target.value) });
  }

  function handleChangeColors(e) {
    setFormStates({ ...formStates, colors: e.target.value });
  }

  function handleAddOption(e) {
    e.preventDefault();
    setFormStates({ ...formStates, options: [...formStates.options, ""] });
  }

  function handleAddTechnicalSpecification(e) {
    e.preventDefault();
    setFormStates({
      ...formStates,
      technicalSpecifications: [
        ...formStates.technicalSpecifications,
        { label: "", description: "" },
      ],
    });
  }

  function handleUpdateTechnicalSpecifications(index, key, e) {
    setFormStates((prevState) => ({
      ...prevState,
      technicalSpecifications: prevState.technicalSpecifications.map(
        (item, i) => (i === index ? { ...item, [key]: e.target.value } : item)
      ),
    }));
  }

  function handleAddDescription() {
    setFormStates({
      ...formStates,
      descriptions: [...formStates.descriptions, ""],
    });
  }

  return (
    <div className=" grid grid-cols-7 gap-8 px-8 overflow-y-scroll max-h-full pt-8 pb-28 hide-scrollbar">
      <div className=" col-span-3">
        <div className=" rounded-xl overflow-hidden h-64 mt-4">
          <Slider pictures={car.pictures} />
        </div>
        <div className=" w-full flex justify-between gap-4 mt-6">
          <Button fullWidth type="outline" icon={<HiPlus />} size="Xbig">
            افزودن تصویر
          </Button>
          <Button fullWidth icon={<HiOutlinePencil />} size="Xbig">
            ویرایش تصویر
          </Button>
        </div>
        <p className=" text-p2_SB_desktop mb-2 mt-[3.3rem]">توضیحات</p>
        {formStates.descriptions.map((description, index) => (
          <textarea
            key={index}
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
        ))}
        <Button
          fullWidth
          type="outline"
          icon={<HiPlus />}
          size="Xbig"
          onClick={handleAddDescription}
        >
          افزودن
        </Button>
      </div>
      <div className=" items-start col-span-4 grid grid-cols-2 gap-x-5 gap-y-8 content-start">
        <TextField
          size="big"
          label="نام ماشین"
          name="name"
          id="name"
          value={formStates.name}
          onChange={handleChangeName}
        />
        <TextField
          size="big"
          label="قیمت(تومان)"
          name="price"
          id="price"
          value={formStates.price.toString()}
          onChange={handleChangePrice}
        />
        <TextField
          size="big"
          label="مدل(سال)"
          name="model"
          id="model"
          value={formStates.model.toString()}
          onChange={handleChangeModel}
        />
        <TextField
          size="big"
          label="رنگ ها"
          name="colors"
          id="colors"
          value={formStates.colors}
          onChange={handleChangeColors}
        />
        <div>
          <p className=" text-p2_SB_desktop mb-2">مشخصات فنی</p>
          {formStates.technicalSpecifications.map(
            (technicalSpecification, index) => (
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
            )
          )}
          <Button
            fullWidth
            type="outline"
            icon={<HiPlus />}
            size="Xbig"
            onClick={handleAddTechnicalSpecification}
          >
            افزودن
          </Button>
        </div>
        <div>
          <p className=" text-p2_SB_desktop mb-2">آپشن ها</p>
          {formStates.options.map((option, index) => (
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
            onClick={handleAddOption}
          >
            افزودن
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditCarForm;
