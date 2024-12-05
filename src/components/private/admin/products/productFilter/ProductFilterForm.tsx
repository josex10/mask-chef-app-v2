"use client";
import { usePathname, useSearchParams } from "next/navigation";
import MCComboboxField from "@/components/shared/MCComboboxField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SchemaProductsFormFilter } from "@/utils/schemas/products/SchemaProductsFromFilter";
import { useState } from "react";
import { useRouterPush } from "@/lib/hooks/shared/useRouterPush";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { HelperSharedCreateOrRemoveQueryString } from "@/utils/helpers/HelperSharedCreateOrRemoveQueryString";

type QueryParam = {
  name: string;
  value: string;
  needToDelete: boolean;
};

type TProductsFormFilterProps = {
  products: IComboboxOption[];
  categories: IComboboxOption[];
  providers: IComboboxOption[];
  unitOfMeasures: IComboboxOption[];
};

const useGetFormConfiguration = () => {
  return {
    form: useForm<z.infer<typeof SchemaProductsFormFilter>>({
      resolver: zodResolver(SchemaProductsFormFilter),
      defaultValues: useSetDefaultValues(),
    }),
  };
};

const useSetDefaultValues = () => {
  const searchParams = useSearchParams();
  return {
    name: searchParams.get("name") || "0",
    categories: searchParams.get("categories") || "0",
    providers: searchParams.get("providers") || "0",
    unitOfMeasures: searchParams.get("unitOfMeasures") || "0",
  };
};

const ProductsFilterForm = ({
  products,
  categories,
  providers,
  unitOfMeasures,
}: TProductsFormFilterProps) => {
  const pathname = usePathname();
  const { form } = useGetFormConfiguration();
  const [isLoading, setIsLoading] = useState(false);
  const routerPush = useRouterPush();
  const searchParams = useSearchParams();

  const handleSubmit: SubmitHandler<
    z.infer<typeof SchemaProductsFormFilter>
  > = async (data) => {
    try {
      setIsLoading(true);
      const arrayOfParams: QueryParam[] = Object.keys(data).map((key) => ({
        name: key,
        value: (data as Record<string, any>)[key],
        needToDelete:
          (data as Record<string, any>)[key] === "0" ||
          (data as Record<string, any>)[key] === "",
      }));
      if (arrayOfParams.length) {
        await routerPush(
          `${pathname}?${HelperSharedCreateOrRemoveQueryString({
            data: arrayOfParams,
            searchParams,
            resetPagination: true,
          })}`
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error al enviar el formulario", error);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    form.reset({
      categories: "0",
      providers: "0",
      unitOfMeasures: "0",
      name: "0",
    });
    await routerPush(`${pathname}`);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <div className="flex flex-col gap-4 md:w-[60%] justify-center">
            <MCComboboxField
              control={form.control}
              name="name"
              label="Producto"
              placeholder="Seleccione"
              placeholderSearch="Buscar..."
              data={products ? products : []}
              disabled={isLoading}
            />
            <MCComboboxField
              control={form.control}
              name="providers"
              label="Proveedores"
              placeholder="Seleccione"
              placeholderSearch="Buscar..."
              data={providers ? providers : []}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-4 md:w-[40%] justify-center">
            <MCComboboxField
              control={form.control}
              name="categories"
              label="Categorías"
              placeholder="Seleccione"
              placeholderSearch="Buscar..."
              data={categories ? categories : []}
              disabled={isLoading}
            />
            <MCComboboxField
              control={form.control}
              name="unitOfMeasures"
              label="Unidades de medida"
              placeholder="Seleccione"
              placeholderSearch="Buscar..."
              data={unitOfMeasures ? unitOfMeasures : []}
              disabled={isLoading}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-4">
            <LoadingSpinner size={24} className="animate-spin" />
          </div>
        ) : (
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={handleReset} variant="ghost" disabled={isLoading}>
              Limpiar
            </Button>
            <Button type="submit" variant="default" disabled={isLoading}>
              Filtrar
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default ProductsFilterForm;
