import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  link: yup.string().required("Link toko wajib diisi"),
  store_name: yup.string().required("Nama toko wajib diisi"),
  description: yup.string().required("Deskripsi suplemen wajib diisi"),
  image_1: yup.mixed<FileList | string>().nullable(),
  image_2: yup.mixed<FileList | string>().nullable(),
  image_3: yup.mixed<FileList | string>().nullable(),
  rating: yup.number().typeError("Rating harus berupa angka").required("Rating wajib diisi"),
  rater: yup.number().typeError("Jumlah penilai (rater) harus berupa angka").required("Jumlah penilai wajib diisi"),
});

const useSuplemenDetailTab = () => {
  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview1 = watch("image_1");
  const preview2 = watch("image_2");
  const preview3 = watch("image_3");

  const handleUploadImage = (
    fieldName: "image_1" | "image_2" | "image_3",
    files: FileList,
    onChange: (...event: any[]) => void
  ) => {
    handleUploadFile(files, onChange, (result: any) => {
      const finalUrl = typeof result === "string" ? result : result?.fileUrl;

      if (finalUrl) {
        onChange(finalUrl);
        
        setValue(fieldName, finalUrl, { 
          shouldValidate: true, 
          shouldDirty: true 
        });
      }
    });
  };

  const handleDeleteImage = (
    fieldName: "image_1" | "image_2" | "image_3",
    onChange: (files: FileList | undefined) => void
  ) => {
    const fileUrl = getValues(fieldName) as string;
    handleDeleteFile(fileUrl, () => {
      onChange(undefined);
      setValue(fieldName, "");
    });
  };

  return {
    handleUploadImage,
    handleDeleteImage,
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
  };
};

export default useSuplemenDetailTab;