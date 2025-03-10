import Button from "@/components/Button";
import Slider from "@/components/Slider";
import { useRef, useState } from "react";
import { HiOutlinePencil, HiPlus } from "react-icons/hi";

function EditPictures({
  pictures,
}: {
  pictures: { _id: string; src: string }[];
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [picturesInput, setPicturesInput] = useState([...pictures]);

  function handleAddPicture(e) {
    // upload
    // add to database
    // add to formstates
  }

  return (
    <>
      <div className=" rounded-xl overflow-hidden h-64 mt-4">
        <Slider pictures={picturesInput} />
      </div>
      <div className=" w-full flex justify-between gap-4 mt-6">
        <input
          type="file"
          accept="image/*"
          multiple
          // name="newPictures"
          onChange={handleAddPicture}
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          fullWidth
          type="outline"
          icon={<HiPlus />}
          size="Xbig"
          onClick={() => fileInputRef.current?.click()}
        >
          افزودن تصویر
        </Button>
        <Button fullWidth icon={<HiOutlinePencil />} size="Xbig">
          ویرایش تصویر
        </Button>
      </div>
    </>
  );
}

export default EditPictures;
