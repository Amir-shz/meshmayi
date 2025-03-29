import { digitsEnToFa } from "@persian-tools/persian-tools";

function CarName({ name, model }: { name: string; model: string }) {
  return (
    <h2 className=" flex gap-1 text-neutral-800 font-bold leading-8 text-[1.6rem] max-sm:font-semibold max-sm:text-[1.215rem] max-sm:leading-5 max-sm:mt-1">
      <span>{digitsEnToFa(name)}</span>
      <span>-</span>
      <span>{digitsEnToFa(model)}</span>
    </h2>
  );
}

export default CarName;
