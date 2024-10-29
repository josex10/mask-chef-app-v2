"use server";

import { Banknote, Calendar, DollarSign, ReceiptText } from "lucide-react";
import DashboardCardComponent from "@/components/private/admin/dashboard/DashboardCard";
import DashboardTableWrapperComponent from "@/components/private/admin/dashboard/DashboardTableWrapper";
import DashboardChartWrapperComponent from "@/components/private/admin/dashboard/DashboardChartWrapper";
import { GetIncomesAmountByDate } from "@/lib/actions/private/admin/incomes/GetIncomesAmountByDate";
import { getExpensesAmountByDate } from "@/lib/actions/private/admin/expenses/GetExpenseAmountByDate";
import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { getMonthInSpanishFromDate } from "@/utils/helpers/dates";
import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import { format } from "date-fns";
import DashboardDateButton from "@/components/private/admin/dashboard/DashboardDateButton";
import { EDashoardChartDataType } from "@/utils/enums/dashboard/EDashboardChartDataType";
import { IDashboardData } from "@/utils/interfaces/dashboard/IDashboardData";
import { IDashboardStageChartData } from "@/utils/interfaces/dashboard/IDashboardStageChartData";

const getTotalAmountCards = (
  amountOfIncomes: number,
  amountOfExpenses: number,
  filterDate: Date
) => {
  return [
    {
      title: "Mes del Reporte",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      mainTxt: <span>{getMonthInSpanishFromDate(filterDate)}</span>,
      description: <span>2024</span>,
    },
    {
      title: "Ganancias",
      icon: <Banknote className="h-4 w-4 text-muted-foreground" />,
      mainTxt: (
        <TextFieldForCurrency
          totalAmount={amountOfIncomes - amountOfExpenses}
        />
      ),
      description: <span></span>,
    },
    {
      title: "Total de Ventas",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      mainTxt: <TextFieldForCurrency totalAmount={amountOfIncomes} />,
      description: <span></span>,
    },
    {
      title: "Gastos",
      icon: <ReceiptText className="h-4 w-4 text-muted-foreground" />,
      mainTxt: <TextFieldForCurrency totalAmount={amountOfExpenses} />,
      description: <span></span>,
    },
  ];
};

const dashboardData: IDashboardData | null = {
  amountOfIncomes: 0,
  amountOfExpenses: 0,
  chartArray: [],
  tableIncomesArray: [],
  maxAmount: 0,
};

const resetDashboardData = () => {
  dashboardData.amountOfIncomes = 0;
  dashboardData.amountOfExpenses = 0;
  dashboardData.chartArray = [];
  dashboardData.tableIncomesArray = [];
  dashboardData.maxAmount = 0;
};
const handleServerResponse = (response: string, isIncome = false) => {
  const tmpResponse = JSON.parse(response) as IServerActionResponse;
  const incomesParseArray = tmpResponse.data as IDashboardStageChartData[];

  incomesParseArray.forEach((item) => {
    isIncome
      ? (dashboardData.amountOfIncomes = dashboardData.amountOfIncomes +=
          item.amount)
      : (dashboardData.amountOfExpenses = dashboardData.amountOfExpenses +=
          item.amount);
    dashboardData.maxAmount =
      item.amount > dashboardData.maxAmount
        ? item.amount
        : dashboardData.maxAmount;
    groupingDataForChart(item);
    groupingDataForTable(item);
  });
};

const groupingDataForChart = (singleData: IDashboardStageChartData) => {
  const dateFormat = "MM/dd/yyyy";
  const groupFound = dashboardData.chartArray.find(
    (item) =>
      format(new Date(item.date), dateFormat) ===
      format(new Date(singleData.date), dateFormat)
  );
  groupFound
    ? singleData.type === EDashoardChartDataType.incomes
      ? (groupFound.incomes += singleData.amount)
      : (groupFound.expenses += singleData.amount)
    : dashboardData.chartArray.push({
        date: format(new Date(singleData.date), dateFormat),
        expenses:
          singleData.type === EDashoardChartDataType.expenses
            ? singleData.amount
            : 0,
        incomes:
          singleData.type === EDashoardChartDataType.incomes
            ? singleData.amount
            : 0,
        maxAmount: 0,
      });

  dashboardData.chartArray.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
};

const groupingDataForTable = (singleData: IDashboardStageChartData) => {
  const incomeType = singleData.incomeType ? singleData.incomeType : "Otros";
  const groupFound = dashboardData.tableIncomesArray.find(
    (item) => item.type === incomeType
  );
  groupFound
    ? (groupFound.amount += singleData.amount)
    : dashboardData.tableIncomesArray.push({
        type: incomeType,
        amount: singleData.amount,
      });
  dashboardData.tableIncomesArray.sort((a, b) => {
    return b.amount - a.amount;
  });
};

const addChartMaxAmount = () => {
  dashboardData.chartArray.forEach((item) => {
    item.maxAmount = dashboardData.maxAmount;
  });
};

export default async function Dashboard() {
  resetDashboardData();
  const filterDate = new Date();
  const resutaurantSelected = await getSelectedRestaurantFromCookie();
  const incomeData = await GetIncomesAmountByDate(
    resutaurantSelected?.id || "",
    filterDate
  );
  const expenseData = await getExpensesAmountByDate(
    resutaurantSelected?.id || "",
    filterDate
  );
  handleServerResponse(incomeData, true);
  handleServerResponse(expenseData);
  addChartMaxAmount();

  const cardsHeaderData = getTotalAmountCards(
    dashboardData?.amountOfIncomes || 0,
    dashboardData?.amountOfExpenses || 0,
    filterDate
  );

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

        <DashboardDateButton />

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <DashboardChartWrapperComponent
            chartData={dashboardData?.chartArray || []}
          />
          <DashboardTableWrapperComponent
            tableData={dashboardData?.tableIncomesArray || []}
          />
        </div>
      </main>
    </div>
  );
}
