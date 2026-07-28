import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_SUPLEMEN } from "./Suplemen.constants";
import DropdownAction from "@/components/commons/DropdownAction";
import useChangeUrl from "@/hooks/useChangeUrl";
import useSuplemen from "./useSuplemen";
import AddSuplemenModal from "./AddSuplemenModal";
import DeleteSuplemenModal from "./DeleteSuplemenModal";

const Suplemen = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataSuplemen,
    isLoadingSuplemen,
    isRefetchingSuplemen,
    refetchSuplemen,
    selectedId,
    setSelectedId,
  } = useSuplemen();

  const addSuplemenModal = useDisclosure();
  const deleteSuplemenModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (suplemen: Record<string, unknown>, columnKey: Key) => {
      const cellValue = suplemen[columnKey as keyof typeof suplemen];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/suplemen/${suplemen.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${suplemen.id}`);
                deleteSuplemenModal.onOpen();
              }}
            />
          );
        case "c1_harga":
          return cellValue
            ? `Rp ${Number(cellValue).toLocaleString("id-ID")}`
            : "-";
        default:
          return cellValue as ReactNode;
      }
    },
    [push, deleteSuplemenModal],
  );

  console.log("Data dari Backend:", dataSuplemen);

  return (
    <section className="p-4">
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Tambah Suplemen"
          columns={COLUMN_LISTS_SUPLEMEN}
          data={dataSuplemen?.data || []}
          emptyContent="The suplemen data is still empty"
          isLoading={isLoadingSuplemen || isRefetchingSuplemen}
          onClickButtonTopContent={addSuplemenModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSuplemen?.pagination?.totalPages || 1}
        />
      )}

      <AddSuplemenModal {...addSuplemenModal} refetchSuplemen={refetchSuplemen} />
      <DeleteSuplemenModal
        {...deleteSuplemenModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchSuplemen={refetchSuplemen}
      />
    </section>
  );
};

export default Suplemen;