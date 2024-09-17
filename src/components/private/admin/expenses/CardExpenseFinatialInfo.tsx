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
import { useGetExpensesQueryParams } from "@/utils/helpers/expenses";
import { convertUnixToDate } from "@/utils/helpers/dates";

type TCardExpenseFinatialInfoProps = {
  content: string;
};

const CardExpenseFinatialInfo = ({
  content,
}: TCardExpenseFinatialInfoProps) => {
  const rest = useStoreAuth((state) => state.selectedRestaurant);
  const { startDate: startDateUnix, endDate: endDateUnix } =
    useGetExpensesQueryParams();

  const { data, isLoading } = useQuery<number>({
    queryKey: [`expensesFinantialInfo`, startDateUnix, endDateUnix],
    queryFn: async () =>
      getExpensesSummary(
        rest?.id,
        convertUnixToDate(startDateUnix),
        convertUnixToDate(endDateUnix)
      ),
  });

  //TODO: get filter from state, its not implemented yet
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
