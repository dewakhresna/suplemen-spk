import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  showLimit?: boolean;
  showSearch?: boolean;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();
  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    showLimit = true,
    showSearch = true,
    totalPages,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-4 pb-4 lg:flex-row lg:items-center">
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-[320px]"
            placeholder="Search properties..."
            startContent={<CiSearch className="text-slate-400 text-lg mr-1" />}
            onClear={handleClearSearch}
            onChange={handleSearch}
            variant="bordered"
            radius="lg"
            classNames={{
              inputWrapper:
                "bg-white border-slate-200 shadow-sm hover:border-blue-400 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300",
              input: "text-slate-700 placeholder:text-slate-400",
            }}
          />
        )}
        {buttonTopContentLabel && (
          <Button
            color="primary"
            onPress={onClickButtonTopContent}
            className="w-full lg:w-auto bg-blue-600 text-white font-medium rounded-xl shadow-md shadow-blue-500/20 hover:scale-[1.02] hover:bg-blue-700 transition-all duration-300 px-6 h-11"
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-center justify-between gap-6 pt-4 lg:flex-row">
        {showLimit && (
          <Select
            className="w-full sm:w-auto min-w-[200px]"
            size="md"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={
              <p className="text-sm font-medium text-slate-500 mr-1">
                Tampilkan:
              </p>
            }
            disallowEmptySelection
            variant="bordered"
            classNames={{
              trigger:
                "bg-white border-slate-200 rounded-xl shadow-sm hover:border-blue-400 focus-within:!border-blue-500 transition-all duration-300 h-10",
              value: "text-slate-700 font-medium",
            }}
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem key={item.value} textValue={item.label}>
                <span className="text-slate-700">{item.label}</span>
              </SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="primary"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
            classNames={{
              wrapper: "gap-2",
              item: "w-9 h-9 text-slate-600 font-medium bg-transparent hover:bg-slate-100 rounded-lg transition-colors duration-200",
              cursor:
                "bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/30 rounded-lg",
              prev: "bg-transparent hover:bg-slate-100 rounded-lg text-slate-500",
              next: "bg-transparent hover:bg-slate-100 rounded-lg text-slate-500",
            }}
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      topContent={TopContent}
      topContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn(
          "bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 transition-all",
          { "overflow-x-hidden": isLoading },
        ),
        th: "bg-blue-50/70 text-blue-700 text-xs uppercase font-bold tracking-wider py-4 border-b border-slate-200 first:rounded-l-xl last:rounded-r-xl",
        tr: "group hover:bg-blue-50/40 transition-colors duration-300 border-b border-slate-100 last:border-none",
        td: "py-4 text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors duration-300 align-middle",
        emptyWrapper: "py-16 text-slate-400 text-center font-medium",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={
          <div className="flex flex-col items-center justify-center gap-2">
            <CiSearch className="text-4xl text-slate-300" />
            <p>{emptyContent || "No properties found."}</p>
          </div>
        }
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-md rounded-xl z-10 absolute inset-0">
            <Spinner color="primary" size="lg" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
