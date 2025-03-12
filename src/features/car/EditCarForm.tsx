"use client";

import EditName from "./EditName";
import EditPrice from "./EditPrice";
import EditModel from "./EditModel";
import EditColors from "./EditColors";
import EditTechnicalSpecifications from "./EditTechnicalSpecifications";
import EditOptions from "./EditOptions";
import EditDescriptions from "./EditDescriptions";
import EditPictures from "./EditPictures";
import Button from "@/components/Button";
import { HiOutlineSave } from "react-icons/hi";
import { useRef, useState } from "react";
import CheckBoxItem from "@/components/CheckBoxItem";

interface carTypes {
  _id?: string;
  name: string;
  price: number;
  model: number;
  colors: string[];
  labels: string[];
  pictures: { _id: string; src: string }[];
  descriptions: string[];
  options: string[];
  technicalSpecifications: {
    label: string;
    description: string;
  }[];
}

function EditCarForm({
  car,
  title,
  btnText,
  action,
}: {
  car: carTypes;
  title: string;
  btnText: string;
  action: (formdata: FormData) => Promise<void>;
}) {
  // const formRef = useRef<HTMLFormElement>(undefined);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [newPicturesFile, setNewPicturesFile] = useState<
    { _id: string; src?: string; file?: File }[]
  >([...car.pictures]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      // newPicturesFile.forEach((file) =>
      //   file.src
      //     ? formData.append("picturesSrc", file.src)
      //     : formData.append("picturesFiles", file.file)
      // );

      newPicturesFile.forEach((file) => {
        if (file.src) {
          formData.append("picturesSrc", file.src);
        } else if (file.file) {
          formData.append("picturesFiles", file.file);
        }
      });

      await action(formData);
    }
  }

  return (
    <form
      // action={editCar}
      onSubmit={handleSubmit}
      ref={formRef}
      className="col-span-full items-start h-full rounded-2xl bg-neutral-100 border border-neutral-300 "
    >
      <input type="hidden" name="id" defaultValue={car._id} />
      <div className=" border-b border-neutral-300 col-span-full p-8 flex justify-between items-center">
        <p className=" text-h4_B_desktop text-neutral-700 leading-8">{title}</p>
        <Button size="big" type="filled" icon={<HiOutlineSave />} submit>
          {btnText}
        </Button>
      </div>
      <div className=" grid grid-cols-7 gap-8 px-8 overflow-y-scroll max-h-full pt-8 pb-28 hide-scrollbar">
        <div className=" col-span-3">
          <EditPictures
            pictures={car.pictures}
            newPicturesFile={newPicturesFile}
            setNewPicturesFile={setNewPicturesFile}
          />
          <div className=" my-6 flex flex-wrap gap-3">
            <CheckBoxItem
              name="label"
              label="پیشنهاد ویژه"
              checked={car.labels?.includes("پیشنهاد ویژه")}
            />
            <CheckBoxItem
              name="label"
              label="جدید"
              checked={car.labels?.includes("جدید")}
            />
          </div>
          <p className=" text-p2_SB_desktop mb-2">توضیحات</p>
          <EditDescriptions descriptions={car.descriptions} />
        </div>
        <div className=" items-start col-span-4 grid grid-cols-2 gap-x-5 gap-y-8 content-start">
          <EditName name={car.name} />
          <EditPrice price={car.price} />
          <EditModel model={car.model} />
          <EditColors colors={car.colors} />

          <div>
            <p className=" text-p2_SB_desktop mb-2">مشخصات فنی</p>
            <EditTechnicalSpecifications
              technicalSpecifications={car.technicalSpecifications}
            />
          </div>
          <div>
            <p className=" text-p2_SB_desktop mb-2">آپشن ها</p>
            <EditOptions options={car.options} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditCarForm;
