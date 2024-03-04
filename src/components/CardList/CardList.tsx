import { CustomCard } from '../CustomCard/CustomCard';

export const CardList = ({ list }) => {
  return (
    <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {list.map((card, idx) => (
        <CustomCard key={idx} {...card} />
      ))}
    </div>
  );
};
