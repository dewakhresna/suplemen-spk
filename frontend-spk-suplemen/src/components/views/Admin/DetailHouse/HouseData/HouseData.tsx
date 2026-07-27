import { IHouse } from "@/types/House";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useHouseData from "./useHouseData";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataHouse?: IHouse;
  onUpdate: (data: IHouse) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const HouseData = (props: PropTypes) => {
  const { dataHouse, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useHouseData();

  useEffect(() => {
    if (dataHouse) {
      setValueUpdateInfo("nama", `${dataHouse.nama || ""}`);
      setValueUpdateInfo("c1_harga", dataHouse.c1_harga || 0);
      setValueUpdateInfo("c2_jarak", dataHouse.c2_jarak || 0);
      setValueUpdateInfo("c3_keamanan", dataHouse.c3_keamanan || 0);
      setValueUpdateInfo("c4_luas", dataHouse.c4_luas || 0);
    }
  }, [dataHouse, setValueUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo(); 
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  const inputClassNames = {
    inputWrapper:
      "bg-white border-slate-200 shadow-sm hover:border-blue-300 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300 rounded-xl h-12",
    label: "text-slate-700 font-medium pb-1",
  };

  return (
    <Card className="w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-2 sm:p-6 lg:p-8">
      {/* --- CARD HEADER --- */}
      <CardHeader className="flex flex-col items-start gap-2 border-b border-slate-100 pb-6 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏡</span>
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            Property Information
          </h1>
        </div>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Manage and update property criteria used for evaluation and display.
        </p>
      </CardHeader>

      {/* --- CARD BODY --- */}
      <CardBody className="pt-4 overflow-visible">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          
          {/* --- SECTION 1: PROPERTY DETAILS --- */}
          <div className="flex flex-col gap-5 bg-blue-50/40 border border-slate-100 rounded-2xl p-5 sm:p-6">
            <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2">
              Property Details
            </h3>
            <Skeleton isLoaded={!!dataHouse?.nama} className="rounded-xl">
              <Controller
                name="nama"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="House/Cluster Name"
                    variant="bordered"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={errorsUpdateInfo.nama !== undefined}
                    errorMessage={errorsUpdateInfo.nama?.message}
                    classNames={inputClassNames}
                  />
                )}
              />
            </Skeleton>
          </div>

          {/* --- SECTION 2: EVALUATION CRITERIA --- */}
          <div className="flex flex-col gap-6 bg-blue-50/40 border border-slate-100 rounded-2xl p-5 sm:p-6">
            <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-1">
              Property Evaluation Criteria
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Skeleton isLoaded={dataHouse?.c1_harga !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c1_harga"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C1 - Price (Rupiah)"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      isInvalid={errorsUpdateInfo.c1_harga !== undefined}
                      errorMessage={errorsUpdateInfo.c1_harga?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={dataHouse?.c2_jarak !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c2_jarak"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C2 - Distance to Center (Km)"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      isInvalid={errorsUpdateInfo.c2_jarak !== undefined}
                      errorMessage={errorsUpdateInfo.c2_jarak?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <Skeleton isLoaded={dataHouse?.c3_keamanan !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c3_keamanan"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C3 - Security (1-5)"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      isInvalid={errorsUpdateInfo.c3_keamanan !== undefined}
                      errorMessage={errorsUpdateInfo.c3_keamanan?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={dataHouse?.c4_luas !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c4_luas"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C4 - Area (m2)"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      isInvalid={errorsUpdateInfo.c4_luas !== undefined}
                      errorMessage={errorsUpdateInfo.c4_luas?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>
            </div>
          </div>

          {/* --- CARD FOOTER / ACTION BUTTON --- */}
          <div className="flex justify-end mt-2">
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 rounded-xl px-10 h-12 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              type="submit"
              disabled={isPendingUpdate || !dataHouse?.id}
            >
              {isPendingUpdate ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  <span>Saving Changes...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
          
        </form>
      </CardBody>
    </Card>
  );
};

export default HouseData;