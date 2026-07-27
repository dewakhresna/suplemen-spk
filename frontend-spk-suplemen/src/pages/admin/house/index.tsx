import DashboardLayout from "@/components/layouts/DashboardLayout";
import House from "@/components/views/Admin/House/house";

const AdminHousePage = () => {
  return (
    <DashboardLayout
      title="House"
      description="List of all House, create new house, and manage existing houses."
      type="admin"
    >
      <House />
    </DashboardLayout>
  );
};

export default AdminHousePage;
