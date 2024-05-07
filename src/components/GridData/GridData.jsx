import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  SelectItem,
} from '@nextui-org/react';

import React from 'react';
import { PlusIcon } from '../../shared/assets/icons/PlusIcon';
import { ChevronDownIcon } from '../../shared/assets/icons/ChevronDownIcon';
import { SearchIcon } from '../../shared/assets/icons/SearchIcon';
import { CustomCard } from '../CustomCard/CustomCard';
import { faculties, newsType } from '../../shared/data/dataMap';

const GridData = ({ data, onOpenModalAdd }) => {
  const [filterValue, setFilterValue] = React.useState('');
  const hasSearchFilter = Boolean(filterValue);
  const [facultiesFilter, setFacultiesFilter] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState('all');

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const onSearchChange = React.useCallback((value) => {
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
    let filteredData = [...data];

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
  }, [filterValue, facultiesFilter, typeFilter]);

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
    <>
      <div className="flex flex-col sm:flex-row mt-6 justify-between gap-3 items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Введите для поиска..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
          <Dropdown>
            <DropdownTrigger className="flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Факультет
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Table Columns"
              closeOnSelect={false}
              // selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setFacultiesFilter}>
              {faculties.map((faculty) => (
                <DropdownItem key={faculty.label} value={faculty.label}>
                  {faculty.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Тип
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Table Columns"
              closeOnSelect={false}
              // selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setTypeFilter}>
              {newsType.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onPress={() => {
              onOpenModalAdd();
            }}>
            Добавить
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {items.map((card, idx) => (
          <CustomCard key={idx} data={card} />
        ))}
      </div>
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
    </>
  );
};

export default GridData;