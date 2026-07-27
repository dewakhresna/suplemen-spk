import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_USER } from "./User.constants";
import DropdownAction from "@/components/commons/DropdownAction";
import useChangeUrl from "@/hooks/useChangeUrl";
import useUser from "./useUser";
import DeleteUserModal from "./DeleteUserModal";

const UserManagement = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataUser,
    isLoadingUser,
    isRefetchingUser,
    refetchUser,
    selectedId,
    setSelectedId,
  } = useUser();

  const deleteUserModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (user: Record<string, unknown>, columnKey: Key) => {
      const cellValue = user[columnKey as keyof typeof user];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/user/${user.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${user.id}`);
                deleteUserModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, deleteUserModal, setSelectedId],
  );

  return (
    <section className="p-4">
      
      {/* Jika tidak ada query, tetap tampilkan tabel */}
      <DataTable
        columns={COLUMN_LISTS_USER}
        data={dataUser?.data || []}
        emptyContent="User data is empty"
        isLoading={isLoadingUser || isRefetchingUser}
        renderCell={renderCell}
        totalPages={dataUser?.pagination?.totalPages || 1}
      />

      <DeleteUserModal
        {...deleteUserModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchUser={refetchUser}
      />
    </section>
  );
};

export default UserManagement;