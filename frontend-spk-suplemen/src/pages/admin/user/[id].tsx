import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailUser from "@/components/views/Admin/UserData/DetailUser/DetailUserData";
import { Spinner } from "@heroui/react";
import useDetailUser from "@/hooks/useDetailUser";

const AdminDetailUserPage = () => {
  // Panggil logika data dan mutasi
  const {
    dataUser,
    isLoadingUser,
    mutateUpdateUser,
    isPendingUpdateUser,
    isSuccessUpdateUser,
  } = useDetailUser();

  return (
    <DashboardLayout
      title="Edit User"
      description="Manage and update existing user access profiles."
      type="admin"
    >
      {/* Tampilkan indikator loading jika data dari backend belum selesai diambil */}
      {isLoadingUser ? (
        <div className="flex justify-center items-center h-64 w-full bg-white rounded-3xl border border-slate-100">
          <Spinner size="lg" color="primary" label="Loading user data..." />
        </div>
      ) : (
        /* Kirimkan props yang diwajibkan oleh TypeScript */
        <DetailUser 
          dataUser={dataUser}
          onUpdate={mutateUpdateUser}
          isPendingUpdate={isPendingUpdateUser}
          isSuccessUpdate={isSuccessUpdateUser}
        />
      )}
    </DashboardLayout>
  );
};

export default AdminDetailUserPage;