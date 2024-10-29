import MCLayoutTabComponent from "@/components/shared/MCLayoutButtons.component";

const tabs = [
  {
    class: "",
    href: "/private/admin/incomes",
    text: "Nuevo",
    compareTab: "new",
  },
  {
    class: "",
    href: "/private/admin/incomes/search",
    text: "Buscar",
    compareTab: "search",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-2">
      <MCLayoutTabComponent
        tabs={tabs}
        appPage={"incomes"}
        defaultTab={"new"}
      />
      <div>{children}</div>
    </div>
  );
}
