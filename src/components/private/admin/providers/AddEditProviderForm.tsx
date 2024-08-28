"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { PrivateProviderSchema } from "@/utils/schemas/private/ProviderSchema";
import { useRouter } from "next/navigation";

const AddEditProviderFormComponent = () => {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof PrivateProviderSchema>>({
    resolver: zodResolver(PrivateProviderSchema),
    defaultValues: {
      name: "",
      email: "",
      identification: "",
      comertialName: "",
      phone: "",
    },
  });

  const handleAction: SubmitHandler<FieldValues> = async (formData) => {
    console.log('added')
    router.push("/private/admin/providers");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAction)}
        className="flex flex-col gap-6 px-4 py-4 mx-2 bg-content2 rounded-lg w-full sm:w-96"
      >
        <div className="grid gap-2">
          <div className="grid items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Jose Badilla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid items-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Eléctronico</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex:jbadilla@maskchef.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Otros campos</AccordionTrigger>
              <AccordionContent>
                <div className="grid items-center">
                  <FormField
                    control={form.control}
                    name="identification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identificación Tributaria</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="31015673"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid items-center">
                  <FormField
                    control={form.control}
                    name="comertialName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Comercial</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Wings66 CR"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid items-center">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="88774422"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button disabled={loadingRequest} type="submit" className="w-full">
            {loadingRequest && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Agregar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddEditProviderFormComponent;
