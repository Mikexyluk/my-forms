"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IClient } from "../types/types";
import { createClient } from "../services/api";

/*interface IFormInput {
  name: string;
  email: string;
  password: string;
}*/

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
});

type IFormInput = z.infer<typeof schema>;

interface IClientFormProps {
  client?: IClient;
}

export default function ClientForm({ client }: IClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: client?.nome,
      email: client?.email,
    },
  });
  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   console.log(data);
  const onSubmit = async (data: IFormInput) => {
    const formdata = new FormData();
    formdata.append("nome", data.name);
    formdata.append("email", data.email);

    try {
      const response = await createClient(formdata);

      if (response.status === "sucess") {
        console.log("Sucesso");
      } else {
        console.log("erro");
      }
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label htmlFor="name">Nome:</label>
        <input {...register("name")} className="border border-b-blue-950" />
        {/* <input {...register("name", { required: true, maxLength: 20 })} />  */}
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="email">Email:</label>
        <input {...register("email")} className="border border-b-blue-950" />
        {errors.email && <p>{errors.email.message}</p>}

        <button type="submit" className="border border-b-blue-950">
          Enviar
        </button>
        {/* <input type="submit" /> */}
      </form>
    </>
  );
}
