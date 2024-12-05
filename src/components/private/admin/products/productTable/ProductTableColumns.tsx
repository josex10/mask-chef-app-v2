"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { useRouter } from "next/navigation";
import { IProductsTable } from "@/utils/interfaces/products/IProductsTable";



export const ProductTableColumns: ColumnDef<IProductsTable>[] = [
  {
    accessorKey: "name",
    header: "Producto",
    enableHiding: false,
    cell: ({ row }) => {
      const nameText = (row.getValue("name") as string).toLowerCase();
      let result = nameText.charAt(0).toUpperCase() + nameText.slice(1);

      return (
        <div className="text-right">
          <span>{result}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      return (
        <div className="text-right">
          <TextFieldForCurrency totalAmount={amount} />
        </div>
      );
    },
  },
  {
    accessorKey: "unitOfMeasure",
    header: "U.Medida",
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "providerBy",
    header: "Proveedor",
  },
  {
    accessorKey: "handleInventory",
    header: () => <div className="text-center">Inventarios</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.getValue("handleInventory") ? (
            <CircleCheck color="#16a34a" />
          ) : (
            <CircleX color="#dc2626" />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "createdBy",
    header: "Creado por",
  },

  {
    accessorKey: "isAvailable",
    header: () => <div className="text-center">Habilitado</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.getValue("isAvailable") ? (
            <CircleCheck color="#16a34a" />
          ) : (
            <CircleX color="#dc2626" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ProductTableActionLink id={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ProductTableActionLink = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <>
      <DropdownMenuItem
        onClick={() => router.push(`/private/admin/products/view/${id}`)}
      >
        Ver Detalle Producto
      </DropdownMenuItem>
    </>
  );
};
