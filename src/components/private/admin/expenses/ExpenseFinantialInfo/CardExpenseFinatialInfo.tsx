"use client";

import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CardExpenseFinatialInfoSkeleton from "../Skeletons/CardExpenseFinatialInfoSkeleton";
import { useExpenseTotalAmountOfTable } from "@/lib/hooks/expenses/useExpenseTotalAmountOfTable";

type TCardExpenseFinatialInfoProps = {
  content: string;
};

const CardExpenseFinatialInfo = ({
  content,
}: TCardExpenseFinatialInfoProps) => {
  const { data, isLoading } = useExpenseTotalAmountOfTable();

  if (isLoading) {
    return <CardExpenseFinatialInfoSkeleton />;
  }

  return (
    <Card className="sm:col-span-2 md:h-[20vh]">
      <CardHeader className="pb-2">
        <CardDescription>Monto Total</CardDescription>
        <CardTitle className="text-2xl">
          <TextFieldForCurrency totalAmount={Number(data)} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{content}</div>
      </CardContent>
      <CardFooter>
        <Progress value={100} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
};

export default CardExpenseFinatialInfo;
