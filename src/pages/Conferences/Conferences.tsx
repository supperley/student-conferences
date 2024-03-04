import { posts } from '../../shared/data/mockData';
import { NewsList } from '../../components/NewsList/NewsList';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { SearchIcon } from '../../shared/assets/icons/SearchIcon';
import { animals } from '../../shared/data/animals.ts';

const Conferences = () => {
  return (
    <div className="w-full lg:px-16 mt-12">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Студенческие конференции</h1>
        <h5 className="text-default-500 text-lg">
          Все студенческие научно-технические конференции БНТУ
        </h5>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[20rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Select
          label="Favorite Animal"
          placeholder="Select an animal"
          selectionMode="multiple"
          className="max-w-xs">
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <NewsList posts={posts} />
    </div>
  );
};

export default Conferences;
