import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  nama: yup.string().required("The name of the house is mandatory"),
  c1_harga: yup.number().typeError("Prices must be numbers").required("Price is mandatory"),
  c2_jarak: yup.number().typeError("Distance must be a number").required("Distance is required"),
  c3_keamanan: yup.number().typeError("Security value must be a number").required("Security is mandatory"),
  c4_luas: yup.number().typeError("Area must be a number").required("Area is required"),
});

const useHouseData = () => {
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

export default useHouseData;