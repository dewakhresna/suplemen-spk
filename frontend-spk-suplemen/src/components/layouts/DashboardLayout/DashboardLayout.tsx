import Head from "next/head";
import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN } from "./DashboardLayout.constans";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import environment from "@/config/environment";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";

  return (
    <>
      <PageHead title={title} />
      <Head>
        <link
          rel="icon"
          href={`${baseUrl}/uploads/logo-vitalprime.png`}
          type="image/png"
        ></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
        
        {/* Overlay untuk mobile sidebar (menutup sidebar jika di-klik di luar area) */}
        {open && (
          <div 
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <DashboardLayoutSidebar
          sidebarItems={SIDEBAR_ADMIN}
          isOpen={open}
        />
        
        {/* Konten Utama */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
          
          {/* Navbar diubah menjadi sticky dengan efek glassmorphism tipis */}
          <Navbar
            className="sticky top-0 z-30 w-full bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 px-6 lg:px-10 py-2"
            isBlurred={false}
            classNames={{ wrapper: "p-0 w-full max-w-full" }}
            position="sticky"
          >
            <div className="flex flex-col justify-center w-full">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                  {title}
                </h1>
                <NavbarMenuToggle
                  aria-label={open ? "Close Menu" : "Open Menu"}
                  onClick={() => setOpen(!open)}
                  className="lg:hidden text-slate-600"
                />
              </div>
              {/* Deskripsi dipindahkan ke dalam Navbar area agar tetap rapi */}
              {description && (
                <p className="text-sm text-slate-500 mt-1 font-medium">{description}</p>
              )}
            </div>
          </Navbar>

          {/* Area Render Children (Dengan custom scrollbar spacing) */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-4 pb-24">
            {children}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;