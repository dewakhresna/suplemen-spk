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
import useDeleteSuplemenModal from "./useDeleteSuplemeModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSuplemen: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteSuplemenModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchSuplemen,
  } = props;

  const {
    mutateDeleteSuplemen,
    isPendingMutateDeleteSuplemen,
    isSuccessMutateDeleteSuplemen,
  } = useDeleteSuplemenModal();

  useEffect(() => {
    if (isSuccessMutateDeleteSuplemen) {
      onClose();
      refetchSuplemen();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteSuplemen, onClose, refetchSuplemen, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Hapus Data Suplemen</ModalHeader>
        <ModalBody>
          <p className="text-medium text-slate-700">
            Apakah Anda yakin ingin menghapus data suplemen ini? Tindakan ini tidak dapat dibatalkan.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteSuplemen}
          >
            Batalkan
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteSuplemen}
            onPress={() => mutateDeleteSuplemen(selectedId)}
          >
            {isPendingMutateDeleteSuplemen ? (
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

export default DeleteSuplemenModal;