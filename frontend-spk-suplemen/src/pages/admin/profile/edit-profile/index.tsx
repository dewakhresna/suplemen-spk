import DashboardLayout from "@/components/layouts/DashboardLayout";
import EditProfile from "@/components/views/Admin/Profile/EditProfile/EditProfile";

const AdminEditProfilePage = () => {
  return (
    <DashboardLayout
      title="Edit Profil"
      description="Kelola data dirimu"
      type="admin"
    >
      <EditProfile />
    </DashboardLayout>
  );
};

export default AdminEditProfilePage;
