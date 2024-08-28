"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import ICountry from "@/utils/interfaces/private/admin/country";
import { RegisterSchema } from "@/utils/schemas/register/RegisterSchema";
import { registerAction } from "@/lib/actions/register/RegisterActions";
import { useRouter } from "next/navigation";

type TRegisterFormProps = {
  countries: ICountry[];
};

const RegisterForm = ({ countries }: TRegisterFormProps) => {
  const router = useRouter()
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      restaurantName: "",
      email: "",
      country: "",
      address: "",
      phone: "",
      favorite: true,
      legalNumber: 0,
    },
  });

  const handleAction: SubmitHandler<FieldValues> = async (formData) => {
    const response = await registerAction(formData);
    if (response) {
      toast.error(response);
      return;
    }
    toast.success("Registro exitoso");
    router.push("/stage");
  };
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAction)}
        className="flex flex-col gap-6 px-4 py-4 mx-2 bg-content2 rounded-lg w-full sm:w-96"
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* RESTAURANT NAME */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Restaurante</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex:Burrito Loco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* EMAIL */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Eléctronico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex:jbadilla@maskchef.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* COUNTRY */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* LEGAL NUMBER */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="legalNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>N. Tributario</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Ex: 31234568" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ADDRESS */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* PHONE */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* FAVORITE */}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="favorite"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Favorito
                      </FormLabel>
                      <FormDescription>
                        Esta opción te permitirá tener acceso a este restaurante de manera automatica, en caso de tener mas restaurantes registrados.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterForm;
