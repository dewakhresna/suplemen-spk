import DashboardLayout from "@/components/layouts/DashboardLayout";
import Suplemen from "@/components/views/Admin/Suplemen/suplemen";

const AdminSuplemenPage = () => {
  return (
    <DashboardLayout
      title="Suplemen"
      description="List of all Suplemen, create new Suplemen, and manage existing Suplemens."
      type="admin"
    >
      <Suplemen />
    </DashboardLayout>
  );
};

export default AdminSuplemenPage;
