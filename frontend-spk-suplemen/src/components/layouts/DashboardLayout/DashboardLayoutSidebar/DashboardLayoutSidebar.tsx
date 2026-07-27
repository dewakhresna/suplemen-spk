import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { useLogout } from "@/hooks/useLogout";
import Image from "next/image";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();

  const handleLogout = useLogout();

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-[280px] shrink-0 -translate-x-full flex-col justify-between border-r border-slate-200 bg-white px-5 py-6 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none shadow-slate-200/50",
        { "translate-x-0": isOpen },
      )}
    >
      <div className="flex flex-col w-full">
        {/* Area Logo dengan spacing & separator */}
        <div className="flex justify-center items-center w-full pb-6 mb-6 border-b border-slate-100">
          {/* <Image
            src="/images/general/logo.svg"
            alt="EstatePrime Logo"
            width={160}
            height={50}
            className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push("/admin/house?limit=8&page=1&search=")}
            priority
          /> */}
          <Link href="/admin/house?limit=8&page=1&search=" className="flex items-center gap-2 text-blue-600">
            <Building2 size={32} strokeWidth={1.5} />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Estate<span className="text-blue-600">Prime</span>
            </span>
          </Link>
        </div>

        {/* Menu Navigasi */}
        <Listbox
          items={sidebarItems}
          variant="flat"
          aria-label="Dashboard Menu"
          className="p-0 gap-2"
          classNames={{
            list: "flex flex-col gap-2",
          }}
        >
          {(item) => {
            const isActive = router.pathname.startsWith(item.href);

            return (
              <ListboxItem
                key={item.key}
                className={cn(
                  "h-12 px-4 rounded-xl transition-all duration-200 font-medium group",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/30"
                    : "bg-transparent text-slate-600 hover:bg-blue-50 hover:text-blue-600",
                )}
                startContent={
                  <div
                    className={cn(
                      "text-xl transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-blue-600",
                    )}
                  >
                    {item.icon}
                  </div>
                }
                textValue={item.label}
                aria-labelledby={item.label}
                aria-describedby={item.label}
                as={Link}
                href={item.href}
              >
                <p className="text-sm tracking-wide">{item.label}</p>
              </ListboxItem>
            );
          }}
        </Listbox>
      </div>

      {/* Area Logout Bawah */}
      <div className="pt-6 border-t border-slate-100 w-full">
        <Button
          color="danger"
          fullWidth
          variant="bordered"
          className="flex justify-start items-center rounded-xl px-4 h-12 border-slate-200 text-slate-600 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium"
          onPress={handleLogout}
        >
          <CiLogout className="text-xl" />
          <span className="ml-1 tracking-wide">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
