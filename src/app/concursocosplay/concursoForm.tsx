"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    idade: z.coerce.number().min(13, { message: "Idade é obrigatória" }),
    categoria: z.enum(["Desfile individual", "Desfile solo", "Apresentação"], { required_error: "Selecione uma categoria" }),
    foto: z.any().refine((file) => file && file.length > 0, { message: "Adicione uma foto" }),
    aceite: z.literal(true, { errorMap: () => ({ message: "É necessário concordar com o regulamento" }) }),
});

type IFormInput = z.infer<typeof schema>;

export default function Concursoform() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: "",
            email: "",
            idade: undefined,
            categoria: undefined,
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };

    return (
        <main className="pt-20 min-h-screen w-full bg-white flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6 border border-purple-200"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Inscrição Concurso Cosplay</h2>

                <div>
                    <label className="block text-purple-700 font-medium mb-1">Nome:</label>
                    <input
                        {...register("nome")}
                        className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                            errors.nome ? "border-red-400" : "border-gray-200"
                        }`}
                        placeholder="Digite seu nome"
                    />
                    {errors.nome && (
                        <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-purple-700 font-medium mb-1">Email:</label>
                    <input
                        {...register("email")}
                        className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                            errors.email ? "border-red-400" : "border-gray-200"
                        }`}
                        placeholder="Digite seu email"
                        type="email"
                        autoComplete="off"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-purple-700 font-medium mb-1">Idade:</label>
                    <input
                        {...register("idade", { valueAsNumber: true })}
                        type="number"
                        min={1}
                        className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                            errors.idade ? "border-red-400" : "border-gray-200"
                        }`}
                        placeholder="Digite sua idade"
                    />
                    {errors.idade && (
                        <p className="text-red-500 text-sm mt-1">{errors.idade.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-purple-700 font-medium mb-1">Categoria:</label>
                    <select
                        {...register("categoria")}
                        className={`w-full px-4 py-2 border rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                            errors.categoria ? "border-red-400" : "border-gray-200"
                        }`}
                        defaultValue=""
                    >
                        <option value="" disabled>Selecione uma categoria</option>
                        <option value="Desfile individual">Desfile individual</option>
                        <option value="Desfile solo">Desfile solo</option>
                        <option value="Apresentação">Apresentação</option>
                    </select>
                    {errors.categoria && (
                        <p className="text-red-500 text-sm mt-1">{errors.categoria.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-purple-700 font-medium mb-1">Adicionar foto:</label>
                    <input
                        {...register("foto")}
                        type="file"
                        accept="image/*"
                        className={`w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500 ${
                            errors.foto ? "border-red-400" : "border-gray-200"
                        }`}
                    />
                    {errors.foto && (
                        <p className="text-red-500 text-sm mt-1">{errors.foto.message as string}</p>
                    )}
                </div>

                <div>
                    <label className="inline-flex items-center text-gray-900">
                        <input
                            {...register("aceite")}
                            type="checkbox"
                            className="mr-2 accent-purple-500"
                        />
                        <span className="text-sm">
                            Concordo com o regulamento do concurso.
                        </span>
                    </label>
                    {errors.aceite && (
                        <p className="text-red-500 text-sm mt-1">{errors.aceite.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full hover:shadow-lg transition duration-300 font-bold text-lg transform hover:scale-105"
                >
                    Enviar Inscrição
                </button>
            </form>
        </main>
    );
}