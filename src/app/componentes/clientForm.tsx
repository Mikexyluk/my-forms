"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

type IFormInput = z.infer<typeof schema>;

export default function ClientForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Cadastro</h2>

                <div>
                    <label className="block text-gray-300 font-medium mb-1">Nome:</label>
                    <input
                        {...register("name")}
                        className={`w-full px-4 py-2 border rounded bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.name ? "border-red-500" : "border-gray-700"
                        }`}
                        placeholder="Digite seu nome"
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-300 font-medium mb-1">Email:</label>
                    <input
                        {...register("email")}
                        className={`w-full px-4 py-2 border rounded bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-700"
                        }`}
                        placeholder="Digite seu email"
                        type="email"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-300 font-medium mb-1">Senha:</label>
                    <input
                        {...register("password")}
                        className={`w-full px-4 py-2 border rounded bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.password ? "border-red-500" : "border-gray-700"
                        }`}
                        placeholder="Digite sua senha"
                        type="password"
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
