import { Banknote, ConciergeBell, DollarSign, ReceiptText } from "lucide-react";
import DashboardCardComponent from "@/components/private/admin/dashboard/DashboardCard";
import DashboardTableWrapperComponent from "@/components/private/admin/dashboard/DashboardTableWrapper";
import DashboardChartWrapperComponent from "@/components/private/admin/dashboard/DashboardChartWrapper";

export default function Dashboard() {
  // initialValidationAction();
  
  const cardsHeaderData = [
    {
      title: "Ganancias",
      icon: <Banknote className="h-4 w-4 text-muted-foreground" />,
      mainTxt: "$5,189.02",
      description: "-5.8% la semana anterior",
    },
    {
      title: "Total de Ventas",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      mainTxt: "$45,231.89",
      description: "+20.1% la semana anterior",
    },
    {
      title: "Gastos",
      icon: <ReceiptText className="h-4 w-4 text-muted-foreground" />,
      mainTxt: "$40,231.89",
      description: "+12.7% de la semana anterior",
    },
    {
      title: "Ordenes Vendidas",
      icon: <ConciergeBell className="h-4 w-4 text-muted-foreground" />,
      mainTxt: "224",
      description: "-3.7% de la semana anterior",
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {cardsHeaderData.map((data, index) => {
            return (
              <DashboardCardComponent
                key={index}
                title={data.title}
                icon={data.icon}
                mainTxt={data.mainTxt}
                description={data.description}
              />
            );
          })}
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <DashboardChartWrapperComponent />
          <DashboardTableWrapperComponent />
        </div>
      </main>
    </div>
  );
}
