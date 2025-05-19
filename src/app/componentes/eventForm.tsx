"use client";
import { useForm, SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    // Dados pessoais
    nome: z.string().min(1, { message: "Nome é obrigatório" }),
    idade: z.string().min(1, { message: "Idade é obrigatória" }),
    contato: z.string().min(1, { message: "Contato é obrigatório" }),
    // Personagem
    personagem: z.string().min(1, { message: "Nome do personagem é obrigatório" }),
    obra: z.string().min(1, { message: "Obra é obrigatória" }),
    versao: z.string().optional(),
    fotosReferencia: z.any().refine((files) => files?.length > 0, {
        message: "Pelo menos uma foto de referência é obrigatória",
    }),
    // Categoria
    categoria: z.enum(["individual", "grupo", "desfile", "performance"], {
        required_error: "Selecione uma categoria",
    }),
    // Uploads
    trilhaSonora: z.any().optional(),
    fotosCosplay: z.any().refine((files) => files?.length > 0, {
        message: "Pelo menos uma foto do cosplay é obrigatória",
    }),
    videoReferencia: z.any().optional(),
    // Termo
    aceite: z.literal(true, {
        errorMap: () => ({ message: "É necessário aceitar o termo para participar" }),
    }),
});

type FormInput = z.infer<typeof schema>;

export default function CosplayContestForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        // Aqui você pode tratar os arquivos e enviar para o backend
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 bg-fixed bg-no-repeat font-sans">
            <div className="w-full max-w-2xl px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-yellow-300 mb-2 tracking-wider">ANIME EXPO 2025</h1>
                    <h2 className="text-3xl font-bold text-pink-400 mb-6 animate-pulse">Concurso de Cosplay</h2>
                </div>
                
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-xl border-2 border-pink-500 w-full max-w-2xl space-y-6"
                    encType="multipart/form-data"
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E')",
                    }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-pink-400 border-b-2 border-pink-500 pb-2">
                        Inscrição Concurso de Cosplay
                    </h2>

                    {/* Dados Pessoais */}
                    <fieldset className="border-2 border-blue-500 rounded-lg p-4 mb-4 bg-gray-800 bg-opacity-70">
                        <legend className="text-lg text-blue-300 font-bold px-2 rounded bg-gray-900 border border-blue-500">Dados Pessoais</legend>
                        <div className="mb-3">
                            <label className="block text-pink-300 font-medium mb-1">Nome:</label>
                            <input
                                {...register("nome")}
                                className={`w-full px-4 py-2 border-2 rounded-md bg-gray-900 text-cyan-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                    errors.nome ? "border-red-500" : "border-cyan-700"
                                }`}
                                placeholder="Seu nome completo"
                            />
                            {errors.nome && <p className="text-red-400 text-sm mt-1">{errors.nome.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-pink-300 font-medium mb-1">Idade:</label>
                            <input
                                {...register("idade")}
                                type="number"
                                min={0}
                                className={`w-full px-4 py-2 border-2 rounded-md bg-gray-900 text-cyan-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                    errors.idade ? "border-red-500" : "border-cyan-700"
                                }`}
                                placeholder="Sua idade"
                            />
                            {errors.idade && <p className="text-red-400 text-sm mt-1">{errors.idade.message}</p>}
                        </div>
                        <div>
                            <label className="block text-pink-300 font-medium mb-1">Contato (email ou telefone):</label>
                            <input
                                {...register("contato")}
                                className={`w-full px-4 py-2 border-2 rounded-md bg-gray-900 text-cyan-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                    errors.contato ? "border-red-500" : "border-cyan-700"
                                }`}
                                placeholder="Seu email ou telefone"
                            />
                            {errors.contato && <p className="text-red-400 text-sm mt-1">{errors.contato.message}</p>}
                        </div>
                    </fieldset>

                    {/* Personagem */}
                    <fieldset className="border-2 border-purple-500 rounded-lg p-4 mb-4 bg-gray-800 bg-opacity-70">
                        <legend className="text-lg text-purple-300 font-bold px-2 rounded bg-gray-900 border border-purple-500">Sobre o Personagem</legend>
                        <div className="mb-3">
                            <label className="block text-pink-300 font-medium mb-1">Nome do personagem:</label>
                            <input
                                {...register("personagem")}
                                className={`w-full px-4 py-2 border-2 rounded-md bg-gray-900 text-cyan-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                    errors.personagem ? "border-red-500" : "border-cyan-700"
                                }`}
                                placeholder="Ex: Naruto Uzumaki"
                            />
                            {errors.personagem && (
                                <p className="text-red-400 text-sm mt-1">{errors.personagem.message}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="block text-pink-300 font-medium mb-1">Obra:</label>
                            <input
                                {...register("obra")}
                                className={`w-full px-4 py-2 border-2 rounded-md bg-gray-900 text-cyan-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                    errors.obra ? "border-red-500" : "border-cyan-700"
                                }`}
                                placeholder="Ex: Naruto"
                            />
                            {errors.obra && <p className="text-red-400 text-sm mt-1">{errors.obra.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-pink-300 font-medium mb-1">Versão (opcional):</label>
                            <input
                                {...register("versao")}
                                className="w-full px-4 py-2 border-2 rounded-md bg-gray-900 text-cyan-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 border-cyan-700"
                                placeholder="Ex: Shippuden, clássico, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-pink-300 font-medium mb-1">Fotos de referência:</label>
                            <input
                                {...register("fotosReferencia")}
                                type="file"
                                accept="image/*"
                                multiple
                                className={`w-full text-cyan-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700 ${
                                    errors.fotosReferencia ? "border-red-500" : "border-cyan-700"
                                }`}
                            />
                            {errors.fotosReferencia && (
                                <p className="text-red-400 text-sm mt-1">{errors.fotosReferencia.message as string}</p>
                            )}
                        </div>
                    </fieldset>

                    {/* Categoria */}
                    <fieldset className="border-2 border-yellow-500 rounded-lg p-4 mb-4 bg-gray-800 bg-opacity-70">
                        <legend className="text-lg text-yellow-300 font-bold px-2 rounded bg-gray-900 border border-yellow-500">Categoria</legend>
                        <div className="flex flex-col gap-2">
                            <label className="inline-flex items-center text-cyan-100 hover:text-pink-300 transition-colors">
                                <input
                                    {...register("categoria")}
                                    type="radio"
                                    value="individual"
                                    className="mr-2 accent-pink-500 h-4 w-4"
                                />
                                Individual
                            </label>
                            <label className="inline-flex items-center text-cyan-100 hover:text-pink-300 transition-colors">
                                <input
                                    {...register("categoria")}
                                    type="radio"
                                    value="grupo"
                                    className="mr-2 accent-pink-500 h-4 w-4"
                                />
                                Grupo
                            </label>
                            <label className="inline-flex items-center text-cyan-100 hover:text-pink-300 transition-colors">
                                <input
                                    {...register("categoria")}
                                    type="radio"
                                    value="desfile"
                                    className="mr-2 accent-pink-500 h-4 w-4"
                                />
                                Desfile
                            </label>
                            <label className="inline-flex items-center text-cyan-100 hover:text-pink-300 transition-colors">
                                <input
                                    {...register("categoria")}
                                    type="radio"
                                    value="performance"
                                    className="mr-2 accent-pink-500 h-4 w-4"
                                />
                                Performance
                            </label>
                        </div>
                        {errors.categoria && (
                            <p className="text-red-400 text-sm mt-1">{errors.categoria.message}</p>
                        )}
                    </fieldset>

                    {/* Uploads */}
                    <fieldset className="border-2 border-cyan-500 rounded-lg p-4 mb-4 bg-gray-800 bg-opacity-70">
                        <legend className="text-lg text-cyan-300 font-bold px-2 rounded bg-gray-900 border border-cyan-500">Uploads</legend>
                        <div className="mb-3">
                            <label className="block text-pink-300 font-medium mb-1">Trilha sonora (opcional):</label>
                            <input
                                {...register("trilhaSonora")}
                                type="file"
                                accept="audio/*"
                                className="w-full text-cyan-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 border-cyan-700"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-pink-300 font-medium mb-1">Fotos do cosplay:</label>
                            <input
                                {...register("fotosCosplay")}
                                type="file"
                                accept="image/*"
                                multiple
                                className={`w-full text-cyan-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 ${
                                    errors.fotosCosplay ? "border-red-500" : "border-cyan-700"
                                }`}
                            />
                            {errors.fotosCosplay && (
                                <p className="text-red-400 text-sm mt-1">{errors.fotosCosplay.message as string}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-pink-300 font-medium mb-1">Vídeo de referência (opcional):</label>
                            <input
                                {...register("videoReferencia")}
                                type="file"
                                accept="video/*"
                                className="w-full text-cyan-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 border-cyan-700"
                            />
                        </div>
                    </fieldset>

                    {/* Termo de aceitação */}
                    <fieldset className="border-2 border-green-500 rounded-lg p-4 mb-4 bg-gray-800 bg-opacity-70">
                        <legend className="text-lg text-green-300 font-bold px-2 rounded bg-gray-900 border border-green-500">Termo de Aceitação</legend>
                        <div className="flex items-start gap-2">
                            <input
                                {...register("aceite")}
                                type="checkbox"
                                className="mt-1 h-5 w-5 accent-pink-500"
                            />
                            <span className="text-cyan-100 text-sm">
                                Declaro que li e aceito as regras do concurso e autorizo o uso da minha imagem para fins de divulgação do evento.
                            </span>
                        </div>
                        {errors.aceite && (
                            <p className="text-red-400 text-sm mt-1">{errors.aceite.message}</p>
                        )}
                    </fieldset>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-lg"
                    >
                        ENVIAR INSCRIÇÃO
                    </button>
                </form>
            </div>
        </div>
    );
}