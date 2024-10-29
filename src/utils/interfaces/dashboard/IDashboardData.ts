import { IDashboardChartData } from "./IDashboardChartData";
import { IDashboardTableData } from "./IDashboardTableData";

export interface IDashboardData {
  amountOfIncomes: number;
  amountOfExpenses: number;
  chartArray: IDashboardChartData[];
  tableIncomesArray: IDashboardTableData[];
  maxAmount: number;
}
