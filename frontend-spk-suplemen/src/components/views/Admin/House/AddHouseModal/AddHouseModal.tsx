import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddHouseModal from "./useAddHouseModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import InputFile from "@/components/ui/InputFile";
import { FiHome, FiInfo, FiList, FiImage } from "react-icons/fi";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchHouse: () => void;
}

const AddHouseModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchHouse } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddHouse,
    isPendingMutateAddHouse,
    isSuccessMutateAddHouse,
    handleOnClose,
  } = useAddHouseModal();

  useEffect(() => {
    if (isSuccessMutateAddHouse) {
      onClose();
      refetchHouse();
    }
  }, [isSuccessMutateAddHouse, onClose, refetchHouse]);

  const disabledSubmit = isPendingMutateAddHouse;

  const customInputClasses = {
    inputWrapper:
      "bg-white border-slate-200 shadow-sm hover:border-blue-400 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300 rounded-xl",
    label: "text-slate-600 font-medium",
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      size="3xl"
      onClose={() => handleOnClose(onClose)}
      classNames={{
        base: "rounded-3xl shadow-2xl bg-white border border-slate-100",
        backdrop: "bg-slate-900/40 backdrop-blur-sm",
        header: "border-b border-slate-100 py-5 px-6 sm:px-8",
        body: "p-0",
        footer: "border-t border-slate-100 py-5 px-6 sm:px-8",
        closeButton: "hover:bg-slate-100 active:bg-slate-200 right-6 top-6 transition-colors",
      }}
    >
      <form onSubmit={handleSubmitForm(handleAddHouse)}>
        <ModalContent>
          {/* --- MODAL HEADER --- */}
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner border border-blue-100/50">
                <FiHome className="text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Add New Property
                </h2>
                <p className="text-sm font-normal text-slate-500 mt-0.5">
                  Create a new property listing for your marketplace.
                </p>
              </div>
            </div>
          </ModalHeader>

          {/* --- MODAL BODY --- */}
          <ModalBody>
            <div className="flex flex-col gap-8 px-6 py-6 sm:px-8 sm:py-8">
              
              {/* --- SECTION 1: PROPERTY INFORMATION --- */}
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                  <FiInfo className="text-blue-600 text-lg" />
                  <div>
                    <h3 className="font-semibold text-slate-800 leading-tight">Property Information</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Main criteria used to evaluate the property (TOPSIS).</p>
                  </div>
                </div>

                <Controller
                  name="nama"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="House/Cluster Name"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.nama !== undefined}
                      errorMessage={errors.nama?.message}
                      classNames={customInputClasses}
                    />
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Controller
                    name="c1_harga"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="C1 - Price (Rupiah)"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.c1_harga !== undefined}
                        errorMessage={errors.c1_harga?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                  <Controller
                    name="c2_jarak"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="C2 - Distance to Center (Km)"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.c2_jarak !== undefined}
                        errorMessage={errors.c2_jarak?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Controller
                    name="c3_keamanan"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="C3 - Security (1-5)"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.c3_keamanan !== undefined}
                        errorMessage={errors.c3_keamanan?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                  <Controller
                    name="c4_luas"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="C4 - Surface Area (m2)"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.c4_luas !== undefined}
                        errorMessage={errors.c4_luas?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                </div>
              </div>

              {/* --- SECTION 2: HOUSE DETAILS --- */}
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                  <FiList className="text-blue-600 text-lg" />
                  <div>
                    <h3 className="font-semibold text-slate-800 leading-tight">House Details</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Additional information displayed to buyers.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Controller
                    name="beds"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="Jumlah Kamar Tidur"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.beds !== undefined}
                        errorMessage={errors.beds?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                  <Controller
                    name="baths"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="Jumlah Kamar Mandi"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.baths !== undefined}
                        errorMessage={errors.baths?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="contact"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Kontak Pemilik/Agen"
                      variant="bordered"
                      placeholder="Contoh: 0812xxxx"
                      isInvalid={errors.contact !== undefined}
                      errorMessage={errors.contact?.message}
                      classNames={customInputClasses}
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Deskripsi Properti"
                      variant="bordered"
                      minRows={3}
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                      classNames={{
                        inputWrapper:
                          "bg-white border-slate-200 shadow-sm hover:border-blue-400 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300 rounded-xl",
                        label: "text-slate-600 font-medium",
                      }}
                    />
                  )}
                />
              </div>

              {/* --- SECTION 3: PROPERTY IMAGES --- */}
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-blue-50/40 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-blue-200/50 pb-3">
                  <FiImage className="text-blue-600 text-lg" />
                  <div>
                    <h3 className="font-semibold text-slate-800 leading-tight">Property Images</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Upload high-quality images to attract buyers.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Controller
                    name="image_1"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="group rounded-2xl transition-all duration-300">
                        <InputFile
                          name="image_1"
                          isDropable
                          preview={
                            value && (value as FileList).length > 0
                              ? URL.createObjectURL((value as FileList)[0])
                              : ""
                          }
                          onUpload={(files) => onChange(files)}
                          onDelete={() => onChange(null)}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="image_2"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="group rounded-2xl transition-all duration-300">
                        <InputFile
                          name="image_2"
                          isDropable
                          preview={
                            value && (value as FileList).length > 0
                              ? URL.createObjectURL((value as FileList)[0])
                              : ""
                          }
                          onUpload={(files) => onChange(files)}
                          onDelete={() => onChange(null)}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="image_3"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="group rounded-2xl transition-all duration-300">
                        <InputFile
                          name="image_3"
                          isDropable
                          preview={
                            value && (value as FileList).length > 0
                              ? URL.createObjectURL((value as FileList)[0])
                              : ""
                          }
                          onUpload={(files) => onChange(files)}
                          onDelete={() => onChange(null)}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

            </div>
          </ModalBody>

          {/* --- MODAL FOOTER --- */}
          <ModalFooter className="flex justify-end gap-3">
            <Button
              variant="bordered"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
              className="border-slate-200 text-slate-600 bg-white hover:bg-slate-50 font-medium rounded-xl px-6 transition-colors"
            >
              Batalkan
            </Button>
            <Button 
              type="submit" 
              disabled={disabledSubmit}
              color="primary"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-transform rounded-xl px-8"
            >
              {isPendingMutateAddHouse ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  <span>Saving Property...</span>
                </div>
              ) : (
                "Save Property"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddHouseModal;