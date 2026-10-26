import CarCardSkeleton from "./CarCardSkeleton";

export default function CarGridSkeleton({ count = 4 }: { count?: number }) {
  return <div className="vehicle-grid" aria-hidden="true">{Array.from({ length: count }, (_, index) => <CarCardSkeleton key={index} />)}</div>;
}
