import { carTypes } from "@/types/types";

export type CarDetail = Omit<carTypes, "technicalSpecifications"> & {
  technicalSpecifications: { label: string; description: string; _id?: string }[];
};
