import { ToasterContext } from "@/contexts/ToasterContext";
import suplemenServices from "@/services/suplemen.service";
import instance from "@/libs/axios/instance"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  nama: yup.string().required("Nama suplemen wajib diisi"),
  c1_harga: yup.number().typeError("Harga harus berupa angka").required("Harga wajib diisi"),
  c2_ulasan_negatif: yup.number().typeError("Ulasan negatif harus berupa angka").required("Ulasan negatif wajib diisi"),
  c3_kandungan_nutrisi: yup.number().typeError("Kandungan nutrisi harus berupa angka").required("Kandungan nutrisi wajib diisi"),
  c4_efektivitas_manfaat: yup.number().typeError("Efektivitas manfaat harus berupa angka").required("Efektivitas manfaat wajib diisi"),
  
  link: yup.string().required("Link toko wajib diisi"),
  store_name: yup.string().required("Nama toko wajib diisi"),
  description: yup.string().required("Deskripsi suplemen wajib diisi"),
  
  image_1: yup.mixed().nullable(),
  image_2: yup.mixed().nullable(),
  image_3: yup.mixed().nullable(),

  rating: yup.number().typeError("Rating harus berupa angka").required("Rating wajib diisi"),
  rater: yup.number().typeError("Jumlah penilai (rater) harus berupa angka").required("Jumlah penilai wajib diisi"),
});

const useAddSuplemenModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnClose = (onClose: () => void) => {
    reset(); 
    onClose();
  };

  const addSuplemenAndDetail = async (payload: any) => {
    const suplemenPayload = {
      nama: payload.nama,
      c1_harga: payload.c1_harga,
      c2_ulasan_negatif: payload.c2_ulasan_negatif,
      c3_kandungan_nutrisi: payload.c3_kandungan_nutrisi,
      c4_efektivitas_manfaat: payload.c4_efektivitas_manfaat,
    };
    
    const suplemenRes = await suplemenServices.addSuplemen(suplemenPayload);
    
    const newSuplemenId = suplemenRes.data?.data?.id || suplemenRes.data?.data?.suplemen?.id; 

    const formData = new FormData();
    formData.append("suplemen_id", String(newSuplemenId));
    formData.append("link", payload.link);
    formData.append("store_name", payload.store_name);
    formData.append("description", payload.description);
    formData.append("rating", String(payload.rating));
    formData.append("rater", String(payload.rater));

    if (payload.image_1 && payload.image_1.length > 0) {
      formData.append("image_1", payload.image_1[0]);
    }
    if (payload.image_2 && payload.image_2.length > 0) {
      formData.append("image_2", payload.image_2[0]);
    }
    if (payload.image_3 && payload.image_3.length > 0) {
      formData.append("image_3", payload.image_3[0]);
    }

    await instance.post("/suplemen-details/create", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return suplemenRes;
  };

  const {
    mutate: mutateAddSuplemen,
    isPending: isPendingMutateAddSuplemen,
    isSuccess: isSuccessMutateAddSuplemen,
  } = useMutation({
    mutationFn: addSuplemenAndDetail, 
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data?.meta?.message || "Terjadi kesalahan sistem",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Data suplemen dan detail berhasil ditambahkan!",
      });
      reset(); 
    },
  });

  const handleAddSuplemen = (data: any) => mutateAddSuplemen(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddSuplemen,
    isPendingMutateAddSuplemen,
    isSuccessMutateAddSuplemen,
    handleOnClose,
  };
};

export default useAddSuplemenModal;