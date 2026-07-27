import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { useLogout } from "@/hooks/useLogout";
import { HeartPulse, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";

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
        "fixed z-50 flex h-screen w-[280px] shrink-0 -translate-x-full flex-col justify-between border-r border-slate-100 bg-white px-6 py-8 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] lg:rounded-r-3xl",
        { "translate-x-0": isOpen },
      )}
    >
      <div className="flex flex-col w-full">
        
        <div className="flex flex-col items-center sm:items-start w-full pb-8 mb-6 border-b border-slate-100/80">
          <Link href="/admin/house?limit=8&page=1&search=" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-red-50 text-red-600 rounded-xl group-hover:scale-105 group-hover:bg-red-100 transition-all duration-300">
                <HeartPulse size={28} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Vital<span className="text-red-600">Prime</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mt-2 ml-1">
              Admin Dashboard
            </p>
          </Link>
        </div>

        <Listbox
          items={sidebarItems}
          variant="flat"
          aria-label="Dashboard Menu"
          className="p-0 gap-2"
          classNames={{
            list: "flex flex-col gap-2.5",
          }}
        >
          {(item) => {
            const isActive = router.pathname.startsWith(item.href);

            return (
              <ListboxItem
                key={item.key}
                className={cn(
                  "h-12 px-4 rounded-2xl transition-all duration-300 font-semibold group outline-none relative",
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25"
                    : "bg-transparent text-slate-600 border border-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-100 hover:-translate-y-0.5",
                )}
                startContent={
                  <div
                    className={cn(
                      "text-xl transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-red-600",
                    )}
                  >
                    {item.icon}
                  </div>
                }
                endContent={
                  isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
                  )
                }
                textValue={item.label}
                aria-labelledby={item.label}
                aria-describedby={item.label}
                as={Link}
                href={item.href}
              >
                <p className="text-sm tracking-wide ml-1">{item.label}</p>
              </ListboxItem>
            );
          }}
        </Listbox>
      </div>

      <div className="pt-8 border-t border-slate-100/80 w-full">
        <Button
          fullWidth
          variant="bordered"
          className="flex justify-start items-center rounded-2xl px-5 h-14 border border-red-200 text-red-600 bg-white hover:bg-red-600 hover:text-white shadow-sm hover:shadow-md hover:shadow-red-600/20 transition-all duration-300 font-semibold group hover:-translate-y-0.5"
          onPress={handleLogout}
        >
          <LogOut className="text-xl group-hover:scale-110 transition-transform duration-300 mr-1" strokeWidth={2.5} />
          <span className="tracking-wide">Keluar Akun</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;