import { CiFolderOn, CiUser, CiHome, CiWallet } from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: "house",
    label: "Data Rumah",
    href: "/admin/house",
    icon: <CiHome />,
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
  // {
  //   key: "banner",
  //   label: "Banner",
  //   href: "/admin/banner",
  //   icon: <CiBookmark />,
  // },
  // {
  //   key: "transaction",
  //   label: "Transaction",
  //   href: "/admin/transaction",
  //   icon: <CiWallet />,
  // },
];

const SIDEBAR_MEMBER = [
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: <CiWallet />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/member/profile",
    icon: <CiFolderOn />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
