import DashboardLayout from "@/components/layouts/DashboardLayout";
import Password from "@/components/views/Admin/Profile/EditPassword/EditPassword";

const AdminPasswordPage = () => {
  return (
    <DashboardLayout
      title="Edit Password"
      description="Kelola Passwordmu"
      type="admin"
    >
      <Password />
    </DashboardLayout>
  );
};

export default AdminPasswordPage;
