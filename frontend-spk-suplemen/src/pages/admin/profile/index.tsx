import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Admin/Profile/ProfileInfo";

const AdminProfilePage = () => {
  return (
    <DashboardLayout
      title="Profile"
      description="List of all Profile, create new Profile, and manage existing Profiles."
      type="admin"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default AdminProfilePage;
