import {
  conferenceStatus,
  conferences as conferencesData,
  faculties,
} from '../../shared/data/mockData';
import { CardList } from '../../components/CardList/CardList';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { SearchIcon } from '../../shared/assets/icons/SearchIcon';

const Conferences = () => {
  return (
    <div className="w-full lg:px-16 my-10">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Студенческие конференции</h1>
        <h5 className="text-default-500 text-lg">
          Все студенческие научно-технические конференции БНТУ
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
        <Select label="Состояние" selectionMode="multiple" className="max-w-sm">
          {conferenceStatus.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <CardList list={conferencesData} />
    </div>
  );
};

export default Conferences;
