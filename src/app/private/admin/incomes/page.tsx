"use client";

import SkeletonTable from "@/components/private/admin/expenses/Skeletons/SkeletonTable";
import IncomeRegisterCard from "@/components/private/admin/incomes/IncomeRegisterCard";
import MCTableWrapper from "@/components/shared/MCTable/MCTableWrapper";
import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { useGetIncomesLastCreated } from "@/lib/hooks/incomes/useGetInconesLastCreated";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { IIncome } from "@/utils/interfaces/private/admin/incomes/IIncome";
import {
  IMCTableData,
  IMCTableRow,
} from "@/utils/interfaces/shared/IMCTable/IMCTable.interfaces";

const TableHeader = {
  title: "Title",
  description: "Description",
  amountOfRows: 0,
};

const TableData: IMCTableData = {
  headers: [
    {
      showHeader: true,
      headerLabel: "Fecha de Creación",
      headerClassName: "w-1/4",
    },
    {
      showHeader: true,
      headerLabel: "Tipo de Ingreso",
      headerClassName: "w-1/4",
    },
    {
      showHeader: true,
      headerLabel: "Notas",
      headerClassName: "w-1/4",
    },
    {
      showHeader: true,
      headerLabel: "Monto",
      headerClassName: "w-1/4",
    },
  ],
  rows: [],
};

const getTableDataList = (data: string | null | undefined) => {
  let rows: IMCTableRow[] = [];
  if (data) {
    const parsedData = JSON.parse(data) as IIncome[];
    if (Array.isArray(parsedData)) {
      rows = parsedData.map((income) => {
        return {
          rowClickHandler: () => console.log("clicked"),
          isSelected: false,
          rowClassName: "w-1/4",
          columns: [
            {
              key: "1",
              columnClassName: "w-1/4",
              value: (
                <span>{convertDateToStandard(String(income.incomeDate))}</span>
              ),
            },
            {
              key: "2",
              columnClassName: "w-1/4",
              value: <span>{income.incomesType}</span>,
            },
            {
              key: "3",
              columnClassName: "w-1/4",
              value: <span>{income.notes}</span>,
            },
            {
              key: "4",
              columnClassName: "w-1/4",
              value: <TextFieldForCurrency totalAmount={income.amount} />,
            },
          ],
        };
      });
    }
  }

  TableData.rows = rows;
  return TableData;
};

const IncomesPage = () => {
  const { data, isPending } = useGetIncomesLastCreated();
  const incomeList = getTableDataList(data);

  return (
    <section className="xl:flex xl:flex-row xl:gap-2 xl:h-[80vh] xl:overflow-x-hidden">
      <div className=" xl:w-[58vw]">
        <div className="flex flex-col gap-2 md:flex-row xl:h-[20vh]">
          <IncomeRegisterCard />
        </div>

        <div>
          {isPending ? (
            <SkeletonTable />
          ) : (
            <MCTableWrapper data={incomeList} header={TableHeader} />
          )}
        </div>
      </div>
    </section>
  );
};

export default IncomesPage;
