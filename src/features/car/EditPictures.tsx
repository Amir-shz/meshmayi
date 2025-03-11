import Button from "@/components/Button";
import Slider from "@/components/Slider";
import { useRef, useState } from "react";
import { HiOutlinePencil, HiPlus } from "react-icons/hi";

import EditPicturesModal from "./EditPicturesModal";

function EditPictures({
  pictures,
  newPicturesFile,
  setNewPicturesFile,
}: {
  pictures: { _id: string; src: string }[];
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [picturesInput, setPicturesInput] = useState([...pictures]);
  const [showEditModal, setShowEditModal] = useState(false);

  function handleAddPicture(e) {
    const file = e.target.files[0];
    const id = crypto.randomUUID();

    setNewPicturesFile([...newPicturesFile, { _id: id, file: file }]);

    const newImage = {
      _id: id,
      src: URL.createObjectURL(file),
    };

    setPicturesInput((prev) => [...prev, newImage]);
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
        <Button
          fullWidth
          icon={<HiOutlinePencil />}
          size="Xbig"
          onClick={() => setShowEditModal(true)}
        >
          ویرایش تصویر
        </Button>

        <EditPicturesModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          pictures={picturesInput}
          setPictures={setPicturesInput}
          onAddPicture={handleAddPicture}
          setNewPicturesFile={setNewPicturesFile}
          newPicturesFile={newPicturesFile}
        />
      </div>
    </>
  );
}

export default EditPictures;
