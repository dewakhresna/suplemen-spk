import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  nama: yup.string().required("Nama suplemen wajib diisi"),
  c1_harga: yup.number().typeError("Harga harus berupa angka").required("Harga wajib diisi"),
  c2_ulasan_negatif: yup.number().typeError("Ulasan negatif harus berupa angka").required("Ulasan negatif wajib diisi"),
  c3_kandungan_nutrisi: yup.number().typeError("Kandungan nutrisi harus berupa angka").required("Kandungan nutrisi wajib diisi"),
  c4_efektivitas_manfaat: yup.number().typeError("Efektivitas manfaat harus berupa angka").required("Efektivitas manfaat wajib diisi"),
});

const useSuplemenData = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });
  
  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useSuplemenData;