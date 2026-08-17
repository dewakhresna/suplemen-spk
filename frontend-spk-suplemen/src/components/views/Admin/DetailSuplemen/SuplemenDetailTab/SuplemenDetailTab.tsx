import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import Image from "next/image";
import useSuplemenDetailTab from "./useSuplemenDetailTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { MdOutlineStorefront } from "react-icons/md";
import environment from "@/config/environment";

export interface ISuplemenDetail {
  suplemen_id?: number;
  link?: string;
  store_name?: string;
  description?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  rating?: number;
  rater?: number;
}

interface PropTypes {
  dataDetail?: ISuplemenDetail;
  onUpdate: (data: ISuplemenDetail) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const SuplemenDetailTab = (props: PropTypes) => {
  const { dataDetail, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    control,
    errors,
    handleSubmit,
    reset,
    setValue,

    preview1,
    preview2,
    preview3,
  } = useSuplemenDetailTab();

  const getImageUrl = (imagePath?: string | FileList | null) => {
    if (!imagePath || imagePath === "") return "";

    if (typeof imagePath === "string") {
      if (imagePath.startsWith("http")) return imagePath;
      const baseUrl =
        environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";
      return `${baseUrl}${imagePath}`;
    }
    if (imagePath && (imagePath as FileList).length > 0) {
      return URL.createObjectURL((imagePath as FileList)[0]);
    }
    return "";
  };

  useEffect(() => {
    if (dataDetail) {
      setValue("store_name", dataDetail.store_name || "");
      setValue("link", dataDetail.link || "");
      setValue("description", dataDetail.description || "");
      setValue("image_1", dataDetail.image_1 || "");
      setValue("image_2", dataDetail.image_2 || "");
      setValue("image_3", dataDetail.image_3 || "");
      setValue("rating", dataDetail.rating || 0);
      setValue("rater", dataDetail.rater || 0);
    }
  }, [dataDetail, setValue]);

  useEffect(() => {
    if (isSuccessUpdate) {
      reset();
    }
  }, [isSuccessUpdate, reset]);

  return (
    <Card className="w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-2 sm:p-6 lg:p-8">
      {/* --- CARD HEADER --- */}
      <CardHeader className="flex flex-col items-start gap-2 border-b border-slate-100 pb-6 mb-2">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-inner border border-red-100/50">
            <FiInfo className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Detail Ekstra & Galeri
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Kelola foto produk, informasi toko, dan deskripsi pemasaran suplemen ini.
            </p>
          </div>
        </div>
      </CardHeader>
      
      {/* --- CARD BODY --- */}
      <CardBody className="pt-4 overflow-visible">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit((data) => onUpdate(data as any))}
        >
          {/* --- SECTION 1: AREA GAMBAR --- */}
          <div className="flex flex-col gap-5 bg-red-50/40 border border-red-100 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-red-200/50 pb-3">
              <FiImage className="text-red-600 text-lg" />
              <div>
                <h3 className="font-semibold text-slate-800 leading-tight">Galeri Suplemen</h3>
                <p className="text-xs text-slate-500 mt-0.5">Unggah hingga 3 gambar resolusi tinggi.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* GAMBAR 1 */}
              <Controller
                name="image_1"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage("image_1", onChange)}
                    onUpload={(files) => handleUploadImage("image_1", files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image_1 !== undefined}
                    errorMessage={errors.image_1?.message}
                    isDropable
                    label={
                      <p className="mb-2 text-sm font-medium text-slate-700">
                        Gambar 1 (Utama)
                      </p>
                    }
                    preview={getImageUrl(preview1)}
                  />
                )}
              />

              {/* GAMBAR 2 */}
              <Controller
                name="image_2"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage("image_2", onChange)}
                    onUpload={(files) => handleUploadImage("image_2", files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image_2 !== undefined}
                    errorMessage={errors.image_2?.message}
                    isDropable
                    label={
                      <p className="mb-2 text-sm font-medium text-slate-700">
                        Gambar 2
                      </p>
                    }
                    preview={getImageUrl(preview2)}
                  />
                )}
              />

              {/* GAMBAR 3 */}
              <Controller
                name="image_3"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage("image_3", onChange)}
                    onUpload={(files) => handleUploadImage("image_3", files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image_3 !== undefined}
                    errorMessage={errors.image_3?.message}
                    isDropable
                    label={
                      <p className="mb-2 text-sm font-medium text-slate-700">
                        Gambar 3
                      </p>
                    }
                    preview={getImageUrl(preview3)}
                  />
                )}
              />
            </div>
          </div>

          {/* --- SECTION 2: INFORMASI TOKO & RATING --- */}
          <div className="flex flex-col gap-5 bg-slate-50/50 border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
              <MdOutlineStorefront className="text-red-600 text-lg" />
              <div>
                <h3 className="font-semibold text-slate-800 leading-tight">Detail Market & Performa</h3>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Skeleton isLoaded={dataDetail !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="store_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      label="Nama Toko / Penjual"
                      labelPlacement="outside"
                      variant="bordered"
                      placeholder="Contoh: Suplemen Official"
                      isInvalid={errors.store_name !== undefined}
                      errorMessage={errors.store_name?.message}
                      classNames={{
                        inputWrapper: "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 rounded-xl h-12",
                        label: "text-slate-700 font-medium pb-1"
                      }}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={dataDetail !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      label="Link Pembelian"
                      labelPlacement="outside"
                      variant="bordered"
                      placeholder="https://..."
                      isInvalid={errors.link !== undefined}
                      errorMessage={errors.link?.message}
                      classNames={{
                        inputWrapper: "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 rounded-xl h-12",
                        label: "text-slate-700 font-medium pb-1"
                      }}
                    />
                  )}
                />
              </Skeleton>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <Skeleton isLoaded={dataDetail !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="rating"
                  control={control}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="Rating Produk (1-5)"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      step="0.1"
                      isInvalid={errors.rating !== undefined}
                      errorMessage={errors.rating?.message}
                      classNames={{
                        inputWrapper: "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 rounded-xl h-12",
                        label: "text-slate-700 font-medium pb-1"
                      }}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={dataDetail !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="rater"
                  control={control}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="Jumlah Ulasan (Rater)"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      isInvalid={errors.rater !== undefined}
                      errorMessage={errors.rater?.message}
                      classNames={{
                        inputWrapper: "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 rounded-xl h-12",
                        label: "text-slate-700 font-medium pb-1"
                      }}
                    />
                  )}
                />
              </Skeleton>
            </div>
            
            {/* BARIS 3: DESKRIPSI */}
            <Skeleton isLoaded={dataDetail !== undefined} className="rounded-xl mt-2">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Deskripsi Lengkap"
                    labelPlacement="outside"
                    variant="bordered"
                    minRows={4}
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    classNames={{
                      inputWrapper: "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 rounded-xl",
                      label: "text-slate-700 font-medium pb-1"
                    }}
                  />
                )}
              />
            </Skeleton>
          </div>

          {/* TOMBOL SIMPAN */}
          <div className="flex justify-end mt-2">
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-800 transition-all duration-300 rounded-xl px-10 h-12 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              type="submit"
              disabled={isPendingMutateUploadFile || isPendingUpdate}
            >
              {isPendingUpdate ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  <span>Menyimpan Perubahan...</span>
                </div>
              ) : (
                "Simpan Detail & Galeri"
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default SuplemenDetailTab;