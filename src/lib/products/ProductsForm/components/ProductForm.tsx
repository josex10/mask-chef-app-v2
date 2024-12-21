"use client";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import MCCheckboxField from "@/components/shared/MCCheckboxField";
import MCComboboxField from "@/components/shared/MCComboboxField";
import MCInputField from "@/components/shared/MCInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { saveProduct } from "@/lib/actions/private/admin/products/ActionProductSaveProduct";
import { SchemaProductData } from "@/utils/schemas/products/SchemaProductsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IProductFormProps } from "../interfaces";
import { EProductFormType } from "../enums";
import { IProduct } from "../../interfaces";
import { ActionEditProduct } from "../actions/ActionEditProduct";

const useGetFormConfiguration = (
  product: IProduct | null,
  formType: EProductFormType
) => {
  return {
    form: useForm<z.infer<typeof SchemaProductData>>({
      resolver: zodResolver(SchemaProductData),
      defaultValues: setDefaultValues(product, formType),
    }),
  };
};

const setDefaultValues = (
  product: IProduct | null,
  formType: EProductFormType
) => {
  const requiredFillValues =
    formType === EProductFormType.EDIT && product ? true : false;
  return {
    name: requiredFillValues ? product?.name : "",
    minStockLevel: requiredFillValues ? product?.minStockLevel : 0,
    maxStockLevel: requiredFillValues ? product?.maxStockLevel : 0,
    reOrderStockLevel: requiredFillValues ? product?.reOrderStockLevel : 0,
    isAvailable: requiredFillValues ? product?.isAvailable : true,
    inventoryRequired: requiredFillValues ? product?.handleInventory : false,
    price: requiredFillValues ? product?.price : 0,
    providers: requiredFillValues ? product?.providerBy : "",
    categories: requiredFillValues ? product?.category : "",
    unitOfMeasures: requiredFillValues ? product?.unitOfMeasure : "",
  };
};

const ProductForm = ({
  categories,
  providers,
  unitOfMeasures,
  formType,
  product,
}: IProductFormProps) => {
  const router = useRouter();
  const { form } = useGetFormConfiguration(product, formType);
  const [isLoading, setIsLoading] = useState(false);
  const [handleInventory, setHandleInventory] = useState(
    form.getValues().inventoryRequired
  );

  const handleSubmit: SubmitHandler<z.infer<typeof SchemaProductData>> = async (
    data
  ) => {
    try {
      setIsLoading(true);
      const result =
        formType === EProductFormType.CREATE
          ? await saveProduct(data)
          : await ActionEditProduct(data, product?.id);
      if (result.error) throw new Error(result.message);
      toast.success(result.message, {
        description: new Date().toLocaleString(),
      });
      setIsLoading(false);
      if (formType === EProductFormType.CREATE) {
        router.push(`/private/admin//products/view/${result.data}`);
      }
    } catch (error: any) {
      toast.error(`${error && error}`, {
        description: new Date().toLocaleString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setHandleInventory(
        (data) => (data = value.inventoryRequired ? true : false)
      );
    });
    if (handleInventory) {
      form.setValue("price", 0);
    } else {
      form.setValue("minStockLevel", 0);
      form.setValue("maxStockLevel", 0);
      form.setValue("reOrderStockLevel", 0);
    }
    return () => subscription.unsubscribe();
  }, [form, handleInventory]);

  useEffect(() => {
    if (formType === EProductFormType.EDIT && !product) {
      toast.error("No se encontró el producto", {
        description: new Date().toLocaleString(),
      });
      router.push("/private/admin/products");
    }
  }, [formType, product, router]);

  return (
    <Form {...form}>
      <section className="shadow-2xl border border-solid rounded-lg m-2">
        <p className="flex items-center font-bold bg-muted rounded-t-lg h-16 px-8">
          {formType === EProductFormType.EDIT
            ? "Editar Producto"
            : "Crear Producto"}
        </p>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-center w-full px-8  py-8 gap-4 "
        >
          <MCInputField
            control={form.control}
            name="name"
            label="Nombre"
            placeholder="Ex: Tomates"
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
            isRequired={true}
          />

          <MCComboboxField
            control={form.control}
            name="categories"
            label="Categorías"
            placeholder="Seleccione"
            placeholderSearch="Buscar..."
            data={categories ? categories : []}
            disabled={isLoading}
            isRequired={true}
          />
          <MCComboboxField
            control={form.control}
            name="unitOfMeasures"
            label="Unidades de medida"
            placeholder="Seleccione"
            placeholderSearch="Buscar..."
            data={unitOfMeasures ? unitOfMeasures : []}
            disabled={isLoading}
            isRequired={true}
          />

          <MCInputField
            control={form.control}
            name="price"
            label="Precio"
            placeholder="Ex: 100.00"
            type="number"
            disabled={isLoading || handleInventory}
          />

          <MCCheckboxField
            control={form.control}
            name="isAvailable"
            label="Disponible"
            disabled={isLoading}
            description="Este producto estará disponible en el sistema"
          />

          <MCCheckboxField
            control={form.control}
            name="inventoryRequired"
            label="Inventario"
            disabled={isLoading}
            description="Deseas administrar este producto en inventario?"
          />

          {handleInventory && (
            <>
              <p className="flex items-center font-bold bg-muted rounded-lg h-16 justify-center">
                Información de Inventario
              </p>
              <MCInputField
                control={form.control}
                name="minStockLevel"
                label="Nivel mínimo de inventario"
                placeholder="Ex: 4"
                disabled={isLoading}
              />
              <MCInputField
                control={form.control}
                name="maxStockLevel"
                label="Nivel máximo de inventario"
                placeholder="Ex: 8"
                disabled={isLoading}
              />
              <MCInputField
                control={form.control}
                name="reOrderStockLevel"
                label="Nivel de inventario para reordenar"
                placeholder="Ex: 6"
                disabled={isLoading}
              />
            </>
          )}

          {isLoading ? (
            <div className="flex justify-center mt-4">
              {" "}
              <LoadingSpinner size={24} className="animate-spin" />
            </div>
          ) : (
            <div className="flex justify-end gap-4 mt-4">
              <Button type="submit" variant="default" disabled={isLoading}>
                {formType === EProductFormType.EDIT ? "Editar" : "Crear"}
              </Button>
            </div>
          )}
        </form>
      </section>
    </Form>
  );
};

export default ProductForm;
