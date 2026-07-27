import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailHouse from "@/components/views/Admin/DetailHouse/DetailHouse";

const AdminDetailHousePage = () => {
    return (
        <DashboardLayout
            title="House"
            description="List of all House, create new house, and manage existing houses."
            type="admin"
        >
            <DetailHouse />
        </DashboardLayout>
    );
};

export default AdminDetailHousePage;