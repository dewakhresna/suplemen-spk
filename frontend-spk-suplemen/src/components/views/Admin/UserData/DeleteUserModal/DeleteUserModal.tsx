import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteUserModal from "./useDeleteUserModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUser: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteUserModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchUser,
  } = props;

  const {
    mutateDeleteUser,
    isPendingMutateDeleteUser,
    isSuccessMutateDeleteUser,
  } = useDeleteUserModal();

  useEffect(() => {
    if (isSuccessMutateDeleteUser) {
      onClose();
      refetchUser();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteUser, onClose, refetchUser, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Hapus Data Pengguna</ModalHeader> 
        <ModalBody>
          <p className="text-medium text-slate-700">
            Apakah Anda yakin ingin menghapus data pengguna ini? Tindakan ini tidak dapat dibatalkan.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteUser}
          >
            Batalkan
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteUser}
            onPress={() => mutateDeleteUser(selectedId)}
          >
            {isPendingMutateDeleteUser ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Ya, Hapus Data"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;