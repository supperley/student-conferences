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
        <Select label="Факультет" selectionMode="multiple" className="max-w-xs">
          {faculties.map((faculty) => (
            <SelectItem key={faculty.value} value={faculty.value}>
              {faculty.label}
            </SelectItem>
          ))}
        </Select>
        <Select label="Состояние" selectionMode="multiple" className="max-w-xs">
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
