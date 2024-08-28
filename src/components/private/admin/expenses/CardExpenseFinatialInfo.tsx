import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const getCarfIntfo = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
};

type CardExpenseFinatialInfoProps = {
  loader?: boolean;
};

const CardExpenseFinatialInfo = async ({
  loader = false,
}: CardExpenseFinatialInfoProps) => {
  if (loader) {
    await getCarfIntfo();
  }

  return (
    <Card x-chunk="dashboard-05-chunk-1">
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">$1,329</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
};

export default CardExpenseFinatialInfo;
