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
import useDeleteHouseModal from "./useDeleteHouseModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchHouse: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteHouseModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchHouse,
  } = props;

  const {
    mutateDeleteHouse,
    isPendingMutateDeleteHouse,
    isSuccessMutateDeleteHouse,
  } = useDeleteHouseModal();

  useEffect(() => {
    if (isSuccessMutateDeleteHouse) {
      onClose();
      refetchHouse();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteHouse, onClose, refetchHouse, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Home Data</ModalHeader>
        <ModalBody>
          <p className="text-medium text-slate-700">
            Are you sure you want to delete this property's data? This action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteHouse}
          >
            Batalkan
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteHouse}
            onPress={() => mutateDeleteHouse(selectedId)}
          >
            {isPendingMutateDeleteHouse ? (
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

export default DeleteHouseModal;