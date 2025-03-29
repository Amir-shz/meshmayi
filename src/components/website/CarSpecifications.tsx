import { digitsEnToFa } from "@persian-tools/persian-tools";

function CarSpecifications({
  technicalSpecifications,
}: {
  technicalSpecifications: {
    label: string;
    description: string;
    _id: string;
  }[];
}) {
  return (
    <div>
      <h3 className=" text-h5_SB_desktop text-neutral-800 mb-4 max-sm:text-p2_SB_desktop max-sm:mb-2">
        مشخصات فنی
      </h3>
      <div className=" grid grid-cols-3 gap-3 max-sm:grid-cols-2">
        {technicalSpecifications.map(
          (technicalSpecification: {
            label: string;
            description: string;
            _id: string;
          }) => (
            <div
              key={technicalSpecification._id}
              className=" p-4 max-sm:p-2 flex flex-col gap-4 max-sm:gap-2 rounded-lg bg-neutral-100 border border-neutral-300"
            >
              <p className=" text-p1_SB_desktop max-sm:text-p2_SB_mobile text-neutral-800">
                {digitsEnToFa(technicalSpecification.label)}
              </p>
              <p className=" text-p2_M_desktop max-sm:text-p4_M_mobile text-neutral-500">
                {digitsEnToFa(technicalSpecification.description)}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CarSpecifications;
