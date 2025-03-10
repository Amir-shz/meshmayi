"use client";

import { HiOutlinePencil, HiTrash } from "react-icons/hi";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "./ui/dialog";
import { deleteCar } from "@/lib/actions/car";

function DashboardCarCardBtns({ id }: { id: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    await deleteCar(id);
    setShowConfirm(false);
  }

  return (
    <div className="mt-4 flex gap-4 justify-end">
      <Button
        size="small"
        type="delete"
        icon={<HiTrash />}
        onClick={() => setShowConfirm(true)}
      >
        حذف
      </Button>

      <Button
        size="small"
        icon={<HiOutlinePencil />}
        onClick={() => router.push(`/dashboard/cars/${id}`)}
      >
        ویرایش
      </Button>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-neutral-50/[0.01] dialog__overlay">
            <DialogContent className="[&>button]:hidden max-sm:w-3/4 max-sm:rounded-md  backdrop-blur-sm">
              <DialogTitle className=" text-center">
                از حذف این آیتم مطمئن هستید؟
              </DialogTitle>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-red-700 text-neutral-50 font-medium py-2 px-4 rounded-lg"
                  onClick={handleDelete}
                >
                  حذف کردن
                </button>
                <button
                  className=" font-medium py-2 px-4"
                  onClick={() => setShowConfirm(false)}
                >
                  بازگشت
                </button>
              </div>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

export default DashboardCarCardBtns;
