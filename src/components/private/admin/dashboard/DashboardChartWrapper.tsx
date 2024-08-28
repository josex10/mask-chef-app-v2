import { TrendingUp } from 'lucide-react';
import DashboardChartComponent from './DashboardChart'
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card";

const DashboardChartWrapperComponent = () => {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader>
        <CardTitle>Comparativa de Ventas</CardTitle>
        <CardDescription>
          Muestra la comparativa de ventas de esta semana y la semana anterior.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DashboardChartComponent />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Aumento de un 5% en las ventas de esta semana <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Semana 33 vs Semana 34
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default DashboardChartWrapperComponent