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
import { getExpensesSummary } from "@/lib/actions/private/admin/expenses/GetExpensesSummary";
import { useQuery } from "@tanstack/react-query";
import useStoreAuth from "@/store/private/admin/auth";
import CardExpenseFinatialInfoSkeleton from "./Skeletons/CardExpenseFinatialInfoSkeleton";
import { useSearchParams } from "next/navigation";
import { getStartAndEndDateBasedOnDateString } from "@/utils/helpers/expenses";
import { converDateToUnix } from "@/utils/helpers/dates";

type TCardExpenseFinatialInfoProps = {
  content: string;
};

const CardExpenseFinatialInfo = ({content}: TCardExpenseFinatialInfoProps) => {
  const searchParams = useSearchParams();
  const rest = useStoreAuth((state) => state.selectedRestaurant);
  const { startDate, endDate } = getStartAndEndDateBasedOnDateString(searchParams.get("startDate"), searchParams.get("endDate"));

  const {data, isLoading} = useQuery<number>({
    queryKey: [`expensesFinantialInfo`, converDateToUnix(startDate), converDateToUnix(endDate)],
    queryFn: async () => getExpensesSummary(rest?.id, startDate, endDate),
  });

  //TODO: get filter from state, its not implemented yet
  if (isLoading) {
    return <CardExpenseFinatialInfoSkeleton />;
  }

  return (
    <Card className="sm:col-span-2">
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
