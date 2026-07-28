import { Tab, Tabs } from "@heroui/react";
import useDetailSuplemen from "./useDetailSuplemen";
import SuplemenData from "./SuplemenData";
import SuplemenDetailTab from "./SuplemenDetailTab";

const DetailSuplemen = () => {
  const {
    dataSuplemen,
    handleUpdateSuplemen,
    isPendingMutateUpdateSuplemen,
    isSuccessMutateUpdateSuplemen,

    dataSuplemenDetail,
    handleUpdateSuplemenDetail,
    isPendingMutateUpdateSuplemenDetail,
    isSuccessMutateUpdateSuplemenDetail,
  } = useDetailSuplemen();

  return (
    <div className="p-4">
      <Tabs aria-label="Options" color="danger" variant="underlined">
        {/* TAB 1: DATA SUPLEMEN (Kriteria SPK) */}
        <Tab key="info" title="Data Suplemen">
          <SuplemenData
            dataSuplemen={dataSuplemen}
            onUpdate={handleUpdateSuplemen}
            isPendingUpdate={isPendingMutateUpdateSuplemen}
            isSuccessUpdate={isSuccessMutateUpdateSuplemen}
          />
        </Tab>

        {/* TAB 2: DETAIL TAMBAHAN (Galeri, Toko, Deskripsi) */}
        <Tab key="detail" title="Detail Tambahan">
          <SuplemenDetailTab
            dataDetail={dataSuplemenDetail}
            onUpdate={handleUpdateSuplemenDetail}
            isPendingUpdate={isPendingMutateUpdateSuplemenDetail}
            isSuccessUpdate={isSuccessMutateUpdateSuplemenDetail}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailSuplemen;