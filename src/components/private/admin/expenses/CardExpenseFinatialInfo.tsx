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
import CardExpenseFinatialInfoSkeleton from "./CardExpenseFinatialInfoSkeleton";
import useStoreAuth from "@/store/private/admin/auth";
import { EFilters } from "@/utils/enums/filters";

type TCardExpenseFinatialInfoProps = {
  filter: EFilters
};

const CardExpenseFinatialInfo = ({filter}: TCardExpenseFinatialInfoProps) => {
  const rest = useStoreAuth((state) => state.selectedRestaurant);

  const {data, isLoading} = useQuery<number>({
    queryKey: [`expensesFinantialInfo`, filter],
    queryFn: async () => getExpensesSummary(rest?.id, filter),
  });

  //TODO: get filter from state, its not implemented yet
  if (isLoading) {
    return <CardExpenseFinatialInfoSkeleton />;
  }

  return (
    <Card x-chunk="dashboard-05-chunk-1">
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-2xl">
          <TextFieldForCurrency totalAmount={Number(data)} />
        </CardTitle>
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
