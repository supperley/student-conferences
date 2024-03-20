import { newsStatus, faculties, news } from '../../shared/data/mockData';
import { CardList } from '../../components/CardList/CardList';
import { Button, Input, Pagination, Select, SelectItem, Selection } from '@nextui-org/react';
import { SearchIcon } from '../../shared/assets/icons/SearchIcon';
import React from 'react';

export const chipDataMap = {
  conference: { name: 'Конференция', color: 'success' },
};

const News = () => {
  const [filterValue, setFilterValue] = React.useState('');
  const hasSearchFilter = Boolean(filterValue);
  const [facultiesFilter, setFacultiesFilter] = React.useState<Selection>('all');
  const [typeFilter, setTypeFilter] = React.useState<Selection>('all');

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...news];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => {
        return item.title.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    if (facultiesFilter !== 'all' && Array.from(facultiesFilter).length) {
      filteredData = filteredData.filter((item) =>
        Array.from(facultiesFilter).includes(item.tags[0]),
      );
    }

    if (typeFilter !== 'all' && Array.from(typeFilter).length) {
      filteredData = filteredData.filter((item) => Array.from(typeFilter).includes(item.chip));
    }

    return filteredData;
  }, [news, filterValue, facultiesFilter, typeFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  // const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRowsPerPage(Number(e.target.value));
  //   setPage(1);
  // }, []);

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
          isClearable
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Select
          label="Факультет"
          selectionMode="multiple"
          className="max-w-sm"
          onSelectionChange={setFacultiesFilter}>
          {faculties.map((faculty) => (
            <SelectItem key={faculty.label} value={faculty.label}>
              {faculty.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Тип"
          selectionMode="multiple"
          className="max-w-sm"
          onSelectionChange={setTypeFilter}>
          {newsStatus.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <CardList list={items} chipDataMap={chipDataMap} />
      <div className="mt-6 py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Назад
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Вперед
          </Button>
        </div>
      </div>
    </div>
  );
};

export default News;
