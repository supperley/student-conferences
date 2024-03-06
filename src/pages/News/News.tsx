import { newsStatus, faculties, news } from '../../shared/data/mockData';
import { CardList } from '../../components/CardList/CardList';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { SearchIcon } from '../../shared/assets/icons/SearchIcon';

const News = () => {
  return (
    <div className="w-full lg:px-16 my-10">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Новости студенческих конференций</h1>
        <h5 className="text-default-500 text-lg">
          Все новости студенческих научно-технических конференций БНТУ
        </h5>
      </div>
      <div className="mt-6 flex flex-col gap-5 justify-between items-center sm:flex-row w-full">
        <Input
          classNames={{
            base: 'h-14 max-w-sm',
            mainWrapper: 'h-full',
            inputWrapper: 'h-full',
          }}
          placeholder="Введите для поиска..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          // type="search"
          isClearable
        />
        <Select label="Факультет" selectionMode="multiple" className="max-w-sm">
          {faculties.map((faculty) => (
            <SelectItem key={faculty.value} value={faculty.value}>
              {faculty.label}
            </SelectItem>
          ))}
        </Select>
        <Select label="Тип" selectionMode="multiple" className="max-w-sm">
          {newsStatus.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <CardList list={news} />
    </div>
  );
};

export default News;
