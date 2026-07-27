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
import { Plus, PackageX } from "lucide-react";

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
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 pb-2 lg:flex-row lg:items-center">
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-xs"
            placeholder="Cari nama produk..."
            startContent={
              <CiSearch className="text-slate-400 group-focus-within:text-red-500 text-lg transition-colors" />
            }
            onClear={handleClearSearch}
            onChange={handleSearch}
            classNames={{
              inputWrapper: "bg-white border border-slate-200 shadow-sm hover:border-red-300 focus-within:!border-red-500 focus-within:!ring-4 focus-within:!ring-red-100 transition-all duration-300 rounded-2xl h-12 px-4",
              input: "text-sm text-slate-900 placeholder:text-slate-400",
            }}
          />
        )}
        {buttonTopContentLabel && (
          <Button 
            color="primary" 
            onPress={onClickButtonTopContent}
            className="w-full lg:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-2xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-0.5 transition-all duration-300 px-6 h-12"
            startContent={<Plus size={18} strokeWidth={2.5} />}
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
    showSearch,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-between pt-4">
        {showLimit && (
          <Select
            className="hidden sm:max-w-36 lg:block"
            size="md"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<span className="text-sm font-medium text-slate-600">Tampilkan:</span>}
            disallowEmptySelection
            classNames={{
              trigger: "bg-white border border-slate-200 shadow-sm rounded-xl h-11 hover:border-red-300 transition-colors",
              value: "text-slate-900 font-medium",
            }}
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem 
                key={item.value}
                className="text-slate-700 data-[selected=true]:bg-red-50 data-[selected=true]:text-red-700"
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
            classNames={{
              wrapper: "gap-2",
              item: "w-9 h-9 text-sm rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-red-50 hover:border-red-200 text-slate-700 transition-all",
              cursor: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-md shadow-red-600/20 rounded-xl",
              prev: "bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 text-slate-600",
              next: "bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 text-slate-600",
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
    showLimit,
  ]);

  return (
    <Table
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      topContent={TopContent}
      topContentPlacement="outside"
      removeWrapper
      classNames={{
        base: "max-w-full",
        table: "bg-white border border-slate-200 shadow-xl shadow-red-900/5 rounded-3xl overflow-hidden min-w-full",
        thead: "bg-gradient-to-r from-red-50/80 to-red-100/50",
        th: "py-5 px-6 text-xs font-bold uppercase tracking-wider text-red-900 bg-transparent border-b border-red-100",
        td: "py-5 px-6 text-sm font-medium text-slate-700 border-b border-slate-100/50",
        tr: "group hover:bg-red-50/40 transition-colors duration-300",
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
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="p-4 bg-slate-50 text-slate-300 rounded-full mb-4">
              <PackageX size={48} strokeWidth={1.5} />
            </div>
            <p className="text-lg font-bold text-slate-700">{emptyContent}</p>

          </div>
        }
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className="flex flex-col h-full w-full items-center justify-center bg-white/80 backdrop-blur-sm z-10 py-20">
            <Spinner color="danger" size="lg" />
            <span className="mt-4 text-sm font-semibold text-red-600 animate-pulse">Mengambil data...</span>
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