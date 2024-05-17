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
import { ChevronDownIcon } from '../../shared/assets/icons/ChevronDownIcon';
import { PlusIcon } from '../../shared/assets/icons/PlusIcon';
import { SearchIcon } from '../../shared/assets/icons/SearchIcon';
import { chipDataMap, facultiesDataMap } from '../../shared/data/dataMap';
import { CustomCard } from '../CustomCard/CustomCard';

const GridData = ({ data, onOpenModalAdd, isAddButton = false }) => {
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

    //todo
    if (facultiesFilter !== 'all' && Array.from(facultiesFilter).length) {
      console.log(Array.from(facultiesFilter));
      filteredData = filteredData.filter((item) =>
        item?.faculties.some((faculty) =>
          Array.from(facultiesFilter).includes(facultiesDataMap[faculty]?.label),
        ),
      );
    }

    if (typeFilter !== 'all' && Array.from(typeFilter).length) {
      filteredData = filteredData.filter((item) => Array.from(typeFilter).includes(item.chip));
    }

    return filteredData;
  }, [data, filterValue, facultiesFilter, typeFilter]);

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

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  return (
    <div className="flex flex-col gap-6">
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
              {Object.values(facultiesDataMap).map((faculty) => (
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
              {Object.values(chipDataMap).map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {isAddButton && (
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={() => {
                onOpenModalAdd();
              }}>
              Добавить
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row justify-between items-center">
        <span className="text-default-400 text-small">Всего {data.length} элементов</span>
        <label className="flex items-center text-default-400 text-small">
          Элементов на странице:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
          </select>
        </label>
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {items.map((card, idx) => (
          <CustomCard key={card?._id || idx} data={card} />
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
    </div>
  );
};

export default GridData;
