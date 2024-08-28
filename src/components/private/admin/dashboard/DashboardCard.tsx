import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TDasboardProps = {
  title: string;
  icon: JSX.Element;
  mainTxt: string;
  description: string;
};

const DashboardCardComponent = ({
  title,
  icon,
  mainTxt,
  description,
}: TDasboardProps) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainTxt}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCardComponent;
