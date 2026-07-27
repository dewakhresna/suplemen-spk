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
import useHouseDetailTab from "./useHouseDetailTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

export interface IHouseDetail {
  house_id?: number;
  contact?: string;
  description?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  beds?: number;
  baths?: number;
}

interface PropTypes {
  dataDetail?: IHouseDetail;
  onUpdate: (data: IHouseDetail) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const HouseDetailTab = (props: PropTypes) => {
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
  } = useHouseDetailTab();

  const getImageUrl = (imagePath?: string | FileList | null) => {
    if (!imagePath || imagePath === "") return "";

    if (typeof imagePath === "string") {
      if (imagePath.startsWith("http")) return imagePath;
      return `http://localhost:5000${imagePath}`;
    }
    if (imagePath && (imagePath as FileList).length > 0) {
      return URL.createObjectURL((imagePath as FileList)[0]);
    }
    return "";
  };

  useEffect(() => {
    if (dataDetail) {
      setValue("contact", dataDetail.contact || "");
      setValue("description", dataDetail.description || "");
      setValue("beds", dataDetail.beds || 0);
      setValue("baths", dataDetail.baths || 0);
      setValue("image_1", dataDetail.image_1 || "");
      setValue("image_2", dataDetail.image_2 || "");
      setValue("image_3", dataDetail.image_3 || "");
    }
  }, [dataDetail, setValue]);

  useEffect(() => {
    if (isSuccessUpdate) {
      reset();
    }
  }, [isSuccessUpdate, reset]);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-start">
        <h1 className="w-full text-xl font-bold">Detail Ekstra & Galeri</h1>
        <p className="w-full text-small text-default-400">
          Kelola foto, fasilitas, dan deskripsi pemasaran rumah ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit((data) => onUpdate(data as any))}
        >
          {/* BARIS 1: AREA GAMBAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* GAMBAR 1 */}
            <Controller
              name="image_1"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteImage("image_1", onChange)}
                  onUpload={(files) =>
                    handleUploadImage("image_1", files, onChange)
                  }
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errors.image_1 !== undefined}
                  errorMessage={errors.image_1?.message}
                  isDropable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
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
                  onUpload={(files) =>
                    handleUploadImage("image_2", files, onChange)
                  }
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errors.image_2 !== undefined}
                  errorMessage={errors.image_2?.message}
                  isDropable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
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
                  onUpload={(files) =>
                    handleUploadImage("image_3", files, onChange)
                  }
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errors.image_3 !== undefined}
                  errorMessage={errors.image_3?.message}
                  isDropable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
                      Gambar 3
                    </p>
                  }
                  preview={getImageUrl(preview3)}
                />
              )}
            />
          </div>

          {/* BARIS 2: KASUR & KAMAR MANDI */}
          <div className="flex gap-4">
            <Skeleton
              isLoaded={dataDetail !== undefined}
              className="w-1/2 rounded-lg"
            >
              <Controller
                name="beds"
                control={control}
                render={({ field: { value, ...fieldProps } }) => (
                  <Input
                    {...fieldProps}
                    value={value !== undefined ? String(value) : ""}
                    label="Jumlah Kamar Tidur"
                    labelPlacement="outside"
                    variant="bordered"
                    type="number"
                    isInvalid={errors.beds !== undefined}
                    errorMessage={errors.beds?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={dataDetail !== undefined}
              className="w-1/2 rounded-lg"
            >
              <Controller
                name="baths"
                control={control}
                render={({ field: { value, ...fieldProps } }) => (
                  <Input
                    {...fieldProps}
                    value={value !== undefined ? String(value) : ""}
                    label="Jumlah Kamar Mandi"
                    labelPlacement="outside"
                    variant="bordered"
                    type="number"
                    isInvalid={errors.baths !== undefined}
                    errorMessage={errors.baths?.message}
                  />
                )}
              />
            </Skeleton>
          </div>

          <Skeleton isLoaded={dataDetail !== undefined} className="rounded-lg">
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ""}
                  label="Kontak (WhatsApp / Telepon)"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Contoh: 081234567890"
                  isInvalid={errors.contact !== undefined}
                  errorMessage={errors.contact?.message}
                />
              )}
            />
          </Skeleton>

          {/* BARIS 3: DESKRIPSI */}
          <Skeleton isLoaded={dataDetail !== undefined} className="rounded-lg">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Deskripsi Properti"
                  labelPlacement="outside"
                  variant="bordered"
                  minRows={4}
                  isInvalid={errors.description !== undefined}
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </Skeleton>

          {/* TOMBOL SIMPAN */}
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500 w-fit"
            disabled={isPendingMutateUploadFile || isPendingUpdate}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Simpan Detail & Galeri"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default HouseDetailTab;
