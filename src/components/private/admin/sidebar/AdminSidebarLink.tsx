import { Badge } from "@/components/ui/badge";
import { Home, LineChart, ReceiptText, Truck } from "lucide-react";
import Link from "next/link";

const links = [
  {
    label: "Inicio",
    icon: <Home size="25"/>,
    url: "/private/admin",
    badge: null,
  },
  {
    label: "Proveedores",
    icon: <Truck size="25" />,
    url: "/private/admin/providers",
    badge: null,
  },
  {
    label: "Gastos",
    icon: <ReceiptText size="25" />,
    url: "/private/admin/expenses",
    badge: null,
  },
  {
    label: "Reportes",
    icon: <LineChart size="25" />,
    url: "/private/admin/reports",
    badge: null,
  }
];

const AdminSidebarLinksComponent = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map((link, index) => (
        <Link
          href={link.url}
          key={index}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          {link.icon}
          {link.label}

          {link.badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {link.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default AdminSidebarLinksComponent;
