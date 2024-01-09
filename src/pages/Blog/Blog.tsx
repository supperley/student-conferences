import { Spacer } from '@nextui-org/react';
import { CustomCard } from './CustomCard';

const Blog = () => {
  return (
    <div className="flex">
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
    </div>
  );
};

export default Blog;
