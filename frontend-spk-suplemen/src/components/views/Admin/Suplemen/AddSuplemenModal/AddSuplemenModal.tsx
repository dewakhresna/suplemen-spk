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
import useAddSuplemenModal from "./useAddSuplemenModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import InputFile from "@/components/ui/InputFile";
import { FiInfo, FiList, FiImage } from "react-icons/fi";
import { HeartPulse} from "lucide-react";
import { MdOutlineStorefront } from "react-icons/md";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSuplemen: () => void;
}

const AddSuplemenModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchSuplemen } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddSuplemen,
    isPendingMutateAddSuplemen,
    isSuccessMutateAddSuplemen,
    handleOnClose,
  } = useAddSuplemenModal();

  useEffect(() => {
    if (isSuccessMutateAddSuplemen) {
      onClose();
      refetchSuplemen();
    }
  }, [isSuccessMutateAddSuplemen, onClose, refetchSuplemen]);

  const disabledSubmit = isPendingMutateAddSuplemen;

  const customInputClasses = {
    inputWrapper:
      "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 focus-within:!ring-2 focus-within:!ring-red-100 transition-all duration-300 rounded-xl",
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
      <form onSubmit={handleSubmitForm(handleAddSuplemen)}>
        <ModalContent>
          {/* --- MODAL HEADER --- */}
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-inner border border-red-100/50">
                <HeartPulse className="text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Tambah Data Suplemen
                </h2>
                <p className="text-sm font-normal text-slate-500 mt-0.5">
                  Tambahkan suplemen baru untuk rekomendasi sistem.
                </p>
              </div>
            </div>
          </ModalHeader>

          {/* --- MODAL BODY --- */}
          <ModalBody>
            <div className="flex flex-col gap-8 px-6 py-6 sm:px-8 sm:py-8">
              
              {/* --- SECTION 1: KRITERIA TOPSIS --- */}
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                  <FiInfo className="text-red-600 text-lg" />
                  <div>
                    <h3 className="font-semibold text-slate-800 leading-tight">Informasi & Kriteria Utama</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Kriteria ini akan digunakan dalam perhitungan algoritma TOPSIS.</p>
                  </div>
                </div>

                <Controller
                  name="nama"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Nama Suplemen"
                      placeholder="Contoh: Whey Protein Gold"
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
                        label="C1 - Harga (Rp) [Cost]"
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
                    name="c2_ulasan_negatif"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="C2 - Ulasan Negatif [Cost]"
                        variant="bordered"
                        type="number"
                        step="0.1"
                        isInvalid={errors.c2_ulasan_negatif !== undefined}
                        errorMessage={errors.c2_ulasan_negatif?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Controller
                    name="c3_kandungan_nutrisi"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="C3 - Kandungan Nutrisi [Benefit]"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.c3_kandungan_nutrisi !== undefined}
                        errorMessage={errors.c3_kandungan_nutrisi?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                  <Controller
                    name="c4_efektivitas_manfaat"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="C4 - Efektivitas (Skor) [Benefit]"
                        variant="bordered"
                        type="number"
                        step="0.1"
                        isInvalid={errors.c4_efektivitas_manfaat !== undefined}
                        errorMessage={errors.c4_efektivitas_manfaat?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                </div>
              </div>

              {/* --- SECTION 2: DETAIL SUPLEMEN (Toko, Rating) --- */}
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                  <MdOutlineStorefront className="text-red-600 text-lg" />
                  <div>
                    <h3 className="font-semibold text-slate-800 leading-tight">Detail Market & Toko</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Informasi tambahan untuk ditampilkan kepada pengguna.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Controller
                    name="store_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Nama Toko / Penjual"
                        variant="bordered"
                        className="flex-1"
                        isInvalid={errors.store_name !== undefined}
                        errorMessage={errors.store_name?.message}
                        classNames={customInputClasses}
                      />
                    )}
                  />
                  <Controller
                    name="link"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Link Pembelian (URL)"
                        variant="bordered"
                        className="flex-1"
                        placeholder="https://..."
                        isInvalid={errors.link !== undefined}
                        errorMessage={errors.link?.message}
                        classNames={customInputClasses}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="Rating Produk (1-5)"
                        variant="bordered"
                        type="number"
                        step="0.1"
                        isInvalid={errors.rating !== undefined}
                        errorMessage={errors.rating?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                  <Controller
                    name="rater"
                    control={control}
                    render={({ field: { value, ...fieldProps } }) => (
                      <Input
                        {...fieldProps}
                        value={value !== undefined ? String(value) : ""}
                        label="Jumlah Ulasan (Rater)"
                        variant="bordered"
                        type="number"
                        isInvalid={errors.rater !== undefined}
                        errorMessage={errors.rater?.message}
                        className="flex-1"
                        classNames={customInputClasses}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Deskripsi Lengkap"
                      variant="bordered"
                      minRows={3}
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                      classNames={{
                        inputWrapper:
                          "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 focus-within:!ring-2 focus-within:!ring-red-100 transition-all duration-300 rounded-xl",
                        label: "text-slate-600 font-medium",
                      }}
                    />
                  )}
                />
              </div>

              {/* --- SECTION 3: GAMBAR PRODUK --- */}
              <div className="flex flex-col gap-5 rounded-2xl border border-red-100 bg-red-50/40 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-red-200/50 pb-3">
                  <FiImage className="text-red-600 text-lg" />
                  <div>
                    <h3 className="font-semibold text-slate-800 leading-tight">Gambar Suplemen</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Unggah hingga 3 gambar produk yang menarik.</p>
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
              color="danger"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-md shadow-red-600/20 hover:scale-[1.02] transition-transform rounded-xl px-8"
            >
              {isPendingMutateAddSuplemen ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  <span>Menyimpan...</span>
                </div>
              ) : (
                "Simpan Suplemen"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddSuplemenModal;