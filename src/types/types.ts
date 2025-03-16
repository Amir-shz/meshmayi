export interface carTypes {
  _id: string;
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
  };
}
