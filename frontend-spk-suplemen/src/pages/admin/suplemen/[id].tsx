import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSuplemen from "@/components/views/Admin/DetailSuplemen/DetailSuplemen";

const AdminDetailSuplemenPage = () => {
    return (
        <DashboardLayout
            title="Suplemen"
            description="List of all Suplemen, create new Suplemen, and manage existing Suplemen."
            type="admin"
        >
            <DetailSuplemen />
        </DashboardLayout>
    );
};

export default AdminDetailSuplemenPage;