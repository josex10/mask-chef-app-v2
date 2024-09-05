"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EFilters } from "@/utils/enums/filters";
import { ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterExpenseTable = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || EFilters.day;

  const handleFilters = (value: string) => {
    router.push(`${pathName}?filter=${value}`, { scroll: false });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={"justify-start text-left font-normal"}>
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Filtros Rápidos</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={filter} onValueChange={handleFilters}>
            <DropdownMenuRadioItem value={EFilters.day}>
              Hoy
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={EFilters.week}>
              Semana Actual
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={EFilters.month}>
              Mes Actual
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Otros Filtros</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={filter} onValueChange={handleFilters}>
            <DropdownMenuRadioItem value={EFilters.day}>
              Hoy
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={EFilters.week}>
              Semana Actual
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={EFilters.month}>
              Mes Actual
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FilterExpenseTable;
