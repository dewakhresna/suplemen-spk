import { ISuplemen } from "@/types/Suplemen";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useSuplemenData from "./useSuplemenData";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { HeartPulse } from "lucide-react";

interface PropTypes {
  dataSuplemen?: ISuplemen;
  onUpdate: (data: ISuplemen) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const SuplemenData = (props: PropTypes) => {
  const { dataSuplemen, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useSuplemenData();

  useEffect(() => {
    if (dataSuplemen) {
      setValueUpdateInfo("nama", `${dataSuplemen.nama || ""}`);
      setValueUpdateInfo("c1_harga", dataSuplemen.c1_harga || 0);
      setValueUpdateInfo("c2_ulasan_negatif", dataSuplemen.c2_ulasan_negatif || 0);
      setValueUpdateInfo("c3_kandungan_nutrisi", dataSuplemen.c3_kandungan_nutrisi || 0);
      setValueUpdateInfo("c4_efektivitas_manfaat", dataSuplemen.c4_efektivitas_manfaat || 0);
    }
  }, [dataSuplemen, setValueUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo(); 
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  const inputClassNames = {
    inputWrapper:
      "bg-white border-slate-200 shadow-sm hover:border-red-400 focus-within:!border-red-600 focus-within:!ring-2 focus-within:!ring-red-100 transition-all duration-300 rounded-xl h-12",
    label: "text-slate-700 font-medium pb-1",
  };

  return (
    <Card className="w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-2 sm:p-6 lg:p-8">
      {/* --- CARD HEADER --- */}
      <CardHeader className="flex flex-col items-start gap-2 border-b border-slate-100 pb-6 mb-2">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-inner border border-red-100/50">
            <HeartPulse className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Informasi Suplemen
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Kelola dan perbarui kriteria suplemen yang digunakan untuk evaluasi SPK.
            </p>
          </div>
        </div>
      </CardHeader>

      {/* --- CARD BODY --- */}
      <CardBody className="pt-4 overflow-visible">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          
          {/* --- SECTION 1: SUPLEMEN DETAILS --- */}
          <div className="flex flex-col gap-5 bg-slate-50/50 border border-slate-100 rounded-2xl p-5 sm:p-6">
            <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">
              Identitas Suplemen
            </h3>
            <Skeleton isLoaded={!!dataSuplemen?.nama} className="rounded-xl">
              <Controller
                name="nama"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nama Suplemen"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Contoh: Whey Protein Gold"
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
          <div className="flex flex-col gap-6 bg-slate-50/50 border border-slate-100 rounded-2xl p-5 sm:p-6">
            <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-1">
              Kriteria Evaluasi TOPSIS
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Skeleton isLoaded={dataSuplemen?.c1_harga !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c1_harga"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C1 - Harga (Rp) [Cost]"
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

              <Skeleton isLoaded={dataSuplemen?.c2_ulasan_negatif !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c2_ulasan_negatif"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C2 - Ulasan Negatif [Cost]"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      step="0.1"
                      isInvalid={errorsUpdateInfo.c2_ulasan_negatif !== undefined}
                      errorMessage={errorsUpdateInfo.c2_ulasan_negatif?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <Skeleton isLoaded={dataSuplemen?.c3_kandungan_nutrisi !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c3_kandungan_nutrisi"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C3 - Kandungan Nutrisi [Benefit]"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      isInvalid={errorsUpdateInfo.c3_kandungan_nutrisi !== undefined}
                      errorMessage={errorsUpdateInfo.c3_kandungan_nutrisi?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={dataSuplemen?.c4_efektivitas_manfaat !== undefined} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="c4_efektivitas_manfaat"
                  control={controlUpdateInfo}
                  render={({ field: { value, ...fieldProps } }) => (
                    <Input
                      {...fieldProps}
                      value={value !== undefined ? String(value) : ""}
                      label="C4 - Efektivitas (Skor) [Benefit]"
                      labelPlacement="outside"
                      variant="bordered"
                      type="number"
                      step="0.1"
                      isInvalid={errorsUpdateInfo.c4_efektivitas_manfaat !== undefined}
                      errorMessage={errorsUpdateInfo.c4_efektivitas_manfaat?.message}
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
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-800 transition-all duration-300 rounded-xl px-10 h-12 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              type="submit"
              disabled={isPendingUpdate || !dataSuplemen?.id}
            >
              {isPendingUpdate ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  <span>Menyimpan Perubahan...</span>
                </div>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </div>
          
        </form>
      </CardBody>
    </Card>
  );
};

export default SuplemenData;