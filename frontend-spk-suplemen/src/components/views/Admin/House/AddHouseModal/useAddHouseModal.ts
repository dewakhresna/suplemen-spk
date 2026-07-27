import { ToasterContext } from "@/contexts/ToasterContext";
import houseServices from "@/services/house.service";
import instance from "@/libs/axios/instance"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  nama: yup.string().required("The name of the house is mandatory"),
  c1_harga: yup.number().typeError("Prices must be numbers").required("Price is mandatory"),
  c2_jarak: yup.number().typeError("Distance must be a number").required("Distance is required"),
  c3_keamanan: yup.number().typeError("Security value must be a number").required("Security is mandatory"),
  c4_luas: yup.number().typeError("Area must be a number").required("Area is required"),
  
  contact: yup.string().required("Contact is mandatory"),
  description: yup.string().required("Description is mandatory"),
  beds: yup.number().typeError("Beds must be a number").required("Beds are required"),
  baths: yup.number().typeError("Baths must be a number").required("Baths are required"),
  
  image_1: yup.mixed().nullable(),
  image_2: yup.mixed().nullable(),
  image_3: yup.mixed().nullable(),
});

const useAddHouseModal = () => {
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

  const addHouseAndDetail = async (payload: any) => {
    const housePayload = {
      nama: payload.nama,
      c1_harga: payload.c1_harga,
      c2_jarak: payload.c2_jarak,
      c3_keamanan: payload.c3_keamanan,
      c4_luas: payload.c4_luas,
    };
    const houseRes = await houseServices.addHouse(housePayload);
    
    const newHouseId = houseRes.data?.data?.id || houseRes.data?.data?.house?.id; 

    const formData = new FormData();
    formData.append("house_id", String(newHouseId));
    formData.append("contact", payload.contact);
    formData.append("description", payload.description);
    formData.append("beds", String(payload.beds));
    formData.append("baths", String(payload.baths));

    if (payload.image_1 && payload.image_1.length > 0) {
      formData.append("image_1", payload.image_1[0]);
    }
    if (payload.image_2 && payload.image_2.length > 0) {
      formData.append("image_2", payload.image_2[0]);
    }
    if (payload.image_3 && payload.image_3.length > 0) {
      formData.append("image_3", payload.image_3[0]);
    }

    await instance.post("/house-details/create", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return houseRes;
  };

  const {
    mutate: mutateAddHouse,
    isPending: isPendingMutateAddHouse,
    isSuccess: isSuccessMutateAddHouse,
  } = useMutation({
    mutationFn: addHouseAndDetail, 
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data?.meta?.message || "A system error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Home data and details added successfully!",
      });
      reset(); 
    },
  });

  const handleAddHouse = (data: any) => mutateAddHouse(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddHouse,
    isPendingMutateAddHouse,
    isSuccessMutateAddHouse,
    handleOnClose,
  };
};

export default useAddHouseModal;