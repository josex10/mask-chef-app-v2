import { EDashoardChartDataType } from "@/utils/enums/dashboard/EDashboardChartDataType";

export interface IDashboardStageChartData {
  date: Date;
  amount: number;
  type: EDashoardChartDataType;
  incomeType?: string;
}
