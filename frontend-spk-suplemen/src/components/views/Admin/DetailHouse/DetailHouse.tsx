import { Tab, Tabs } from "@heroui/react";
import useDetailHouse from "./useDetailHouse";
import HouseData from "./HouseData";
import HouseDetailTab from "./HouseDetailTab";

const DetailHouse = () => {
  const {
    dataHouse,
    handleUpdateHouse,
    isPendingMutateUpdateHouse,
    isSuccessMutateUpdateHouse,

    dataHouseDetail,
    handleUpdateHouseDetail,
    isPendingMutateUpdateHouseDetail,
    isSuccessMutateUpdateHouseDetail,
  } = useDetailHouse();

  return (
    <div className="p-4">
      <Tabs aria-label="Options" color="primary" variant="underlined">
        {/* TAB 1: DATA RUMAH (Kriteria SPK) */}
        <Tab key="info" title="Data Rumah">
          <HouseData
            dataHouse={dataHouse}
            onUpdate={handleUpdateHouse}
            isPendingUpdate={isPendingMutateUpdateHouse}
            isSuccessUpdate={isSuccessMutateUpdateHouse}
          />
        </Tab>

        {/* TAB 2: DETAIL TAMBAHAN (Galeri, Fasilitas, Deskripsi) */}
        <Tab key="detail" title="Detail Tambahan">
          <HouseDetailTab
            dataDetail={dataHouseDetail}
            onUpdate={handleUpdateHouseDetail}
            isPendingUpdate={isPendingMutateUpdateHouseDetail}
            isSuccessUpdate={isSuccessMutateUpdateHouseDetail}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailHouse;
