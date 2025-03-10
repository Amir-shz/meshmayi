"use client";

import EditName from "./EditName";
import EditPrice from "./EditPrice";
import EditModel from "./EditModel";
import EditColors from "./EditColors";
import EditTechnicalSpecifications from "./EditTechnicalSpecifications";
import EditOptions from "./EditOptions";
import EditDescriptions from "./EditDescriptions";
import EditPictures from "./EditPictures";

interface carTypes {
  _id?: string;
  name: string;
  price: number;
  model: number;
  colors: string[];
  pictures: { _id: string; src: string }[];
  descriptions: string[];
  options: string[];
  technicalSpecifications: {
    label: string;
    description: string;
  }[];
}

function EditCarForm({ car }: { car: carTypes }) {
  return (
    <div className=" grid grid-cols-7 gap-8 px-8 overflow-y-scroll max-h-full pt-8 pb-28 hide-scrollbar">
      <div className=" col-span-3">
        <EditPictures pictures={car.pictures} />
        <p className=" text-p2_SB_desktop mb-2 mt-[3.3rem]">توضیحات</p>
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
  );
}

export default EditCarForm;
