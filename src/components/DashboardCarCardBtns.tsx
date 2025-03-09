"use client";

import { HiOutlinePencil, HiTrash } from "react-icons/hi";
import Button from "./Button";
import { useRouter } from "next/navigation";

function DashboardCarCardBtns({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="mt-4 flex gap-4 justify-end">
      <Button size="small" type="delete" icon={<HiTrash />}>
        حذف
      </Button>

      <Button
        size="small"
        icon={<HiOutlinePencil />}
        onClick={() => router.push(`/dashboard/cars/${id}`)}
      >
        ویرایش
      </Button>
    </div>
  );
}

export default DashboardCarCardBtns;
