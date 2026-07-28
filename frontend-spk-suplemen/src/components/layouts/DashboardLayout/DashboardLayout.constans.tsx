import { CiFolderOn, CiUser, CiMedicalClipboard } from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: "house",
    label: "Data Suplemen",
    href: "/admin/suplemen",
    icon: <CiMedicalClipboard />,
  },
  {
    key: "user",
    label: "Data Pengguna",
    href: "/admin/user",
    icon: <CiFolderOn />,
  },
  {
    key: "user",
    label: "Edit Profil Admin",
    href: "/admin/profile",
    icon: <CiUser />,
  },
];

export { SIDEBAR_ADMIN };
