"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IMCTableData,
  IMCTableRow,
  IMCTableWrapperDescriptionProps,
  IMCTableWrapperProps,
} from "@/utils/interfaces/shared/IMCTable/IMCTable.interfaces";

const MCTableWrapperBodyRow = ({ row }: { row: IMCTableRow }) => {
  return (
    <TableRow
      onClick={() => row.rowClickHandler()}
      className={row.rowClassName}
    >
      {row?.columns?.map((column, index) => (
        <TableCell key={index} className={column.columnClassName}>
          {column.value}
        </TableCell>
      ))}
    </TableRow>
  );
};

const MCTableWrapperBody = ({ data }: { data: IMCTableData }) => {
  return (
    <div className="flex-1 overflow-auto">
      <Table className="z-0">
        <TableBody>
          {data?.rows?.map((row, index) => (
            <MCTableWrapperBodyRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const MCTableWrapperHeaderRow = ({ data }: { data: IMCTableData }) => {
  return (
    <TableRow>
      {data?.headers?.map((row, index) => (
        <TableHead key={index} className={row.headerClassName}>
          {row.headerLabel}
        </TableHead>
      ))}
    </TableRow>
  );
};

const MCTableWrapperHeader = ({ data }: { data: IMCTableData }) => {
  return (
    <div className="sticky top-0 z-10 bg-background">
      <Table>
        <TableHeader>
          <MCTableWrapperHeaderRow data={data} />
        </TableHeader>
      </Table>
    </div>
  );
};

const MCTableWrapperDescription = ({
  title,
  description,
  amountOfRows,
}: IMCTableWrapperDescriptionProps) => {
  return (
    <section className="flex flex-row justify-between">
      <CardHeader className="px-7">
        <CardTitle>{title && title}</CardTitle>
        <CardDescription>{description && description}</CardDescription>
      </CardHeader>

      <CardHeader className="px-7 flex flex-col justify-end">
        <CardDescription>
          Número de Registros: {amountOfRows ? amountOfRows : 0}
        </CardDescription>
      </CardHeader>
    </section>
  );
};
const MCTableWrapper = ({ data, header }: IMCTableWrapperProps) => {
  return (
    <>
      {header && (
        <MCTableWrapperDescription
          title={header.title}
          description={header.description}
          amountOfRows={data?.rows?.length}
        />
      )}
      <Card className="max-h-[500px] mb-5 overflow-y-auto mt-2 xl:h-[46vh]">
        <CardContent>
          <MCTableWrapperHeader data={data} />
          {!data || data?.rows?.length === 0 ? (
            <SharedCenterMessage message="Sin Resultados" />
          ) : (
            <MCTableWrapperBody data={data} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MCTableWrapper;
