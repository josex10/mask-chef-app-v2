"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authLoginAction } from "@/lib/actions/public/auth/AuthLoginAction";
import { AuthLoginSchema } from "@/utils/schemas/public/auth/AuthLoginSchema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

const AuthLoginFormComponent = () => {
  const form = useForm<z.infer<typeof AuthLoginSchema>>({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loadingRequest, setLoadingRequest] = useState(false);

  const handleAction: SubmitHandler<FieldValues> = async (formData) => {
    const { error } = await authLoginAction(formData);

    if (error) {
      toast.error(error);
      setLoadingRequest(false);
      return;
    }

    //TODO: ADD THE COOKIES FOR THE SESSION
    router.push("/private/admin");
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
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loadingRequest} type="submit" className="w-full">
              {loadingRequest && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Iniciar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default AuthLoginFormComponent;
