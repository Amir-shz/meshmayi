import { digitsEnToFa } from "@persian-tools/persian-tools";

function CarName({ name, model }: { name: string; model: string }) {
  return (
    <h2 className=" text-neutral-800 font-bold leading-8 text-[1.6rem]">
      <span>{digitsEnToFa(name)}</span>
      <span> - </span>
      <span>{digitsEnToFa(model)}</span>
    </h2>
  );
}

export default CarName;
