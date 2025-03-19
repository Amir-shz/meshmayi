import Button from "@/components/Button";
import Slider from "@/components/Slider";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
// import { updateCarPictures } from "@/lib/actions/car";
import { useRef, useState } from "react";
import { HiOutlineTrash, HiPlus, HiX } from "react-icons/hi";

function EditPicturesModal({
  showEditModal,
  setShowEditModal,
  pictures,
  setPictures,
  onAddPicture,
  setNewPicturesFile,
}: // newPicturesFile,
{
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  pictures: { _id: string; src: string }[];
  setPictures: React.Dispatch<
    React.SetStateAction<{ _id: string; src: string }[]>
  >;
  onAddPicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setNewPicturesFile: React.Dispatch<
    React.SetStateAction<{ _id: string; src?: string; file?: File }[]>
  >;
  // newPicturesFile: { _id: string; src?: string; file?: File }[];
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleDeletePicture() {
    const pic = pictures[activeIndex];

    setNewPicturesFile((prev) => prev.filter((el) => el._id !== pic._id));

    setPictures((prev) => prev.filter((_, index) => index !== activeIndex));
  }

  async function handleSubmit() {
    /*
    const formData = new FormData();

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

    await updateCarPictures(formData);
    */

    setShowEditModal(false);
  }

  return (
    <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-neutral-50/[0.01] dialog__overlay">
          <DialogContent
            className="[&>button]:hidden p-0 gap-0"
            style={{ borderRadius: "0.75rem", minWidth: "60%" }}
          >
            <DialogTitle className="hidden"></DialogTitle>
            <div className=" py-5 px-6 flex justify-between items-center border-b border-neutral-300">
              <p className=" text-p1_SB_desktop text-neutral-800">
                ویرایش تصویر
              </p>
              <HiX
                size={24}
                onClick={handleSubmit}
                className=" cursor-pointer"
              />
              {/* <Button
                size="big"
                type="filled"
                icon={<HiOutlineSave />}
                onClick={() => handleSubmit()}
              >
                ذخیره تغییرات
              </Button> */}
            </div>
            <div className=" mt-0 w-full grid grid-cols-10 gap-6 py-10 pl-6 pr-10">
              <div className=" col-span-6 rounded-xl overflow-hidden h-[15.1875rem] ">
                <Slider
                  pictures={pictures}
                  onChangeSlide={(num: number) => setActiveIndex(num)}
                />
              </div>
              <div className=" col-span-4 flex flex-col gap-4 self-end">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onAddPicture(e)}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  size="big"
                  type="outline"
                  icon={<HiPlus />}
                  fullWidth
                  onClick={() => fileInputRef.current?.click()}
                >
                  افزودن تصویر
                </Button>
                <Button
                  size="big"
                  type="outline"
                  icon={<HiOutlineTrash />}
                  fullWidth
                  onClick={() => handleDeletePicture()}
                >
                  حذف تصویر
                </Button>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}

export default EditPicturesModal;
