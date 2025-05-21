"use client";
import { useForm, SubmitHandler, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  responsavel: z.string().min(1, { message: "Nome do responsável é obrigatório" }),
  nomeArtistico: z.string().min(1, { message: "Nome artístico/coletivo é obrigatório" }),
  cpfCnpj: z.string().min(11, { message: "CPF ou CNPJ é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(8, { message: "Telefone/WhatsApp é obrigatório" }),
  cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
  estado: z.string().min(2, { message: "Estado é obrigatório" }),
  portfolio: z.string().url({ message: "Informe um link válido" }),
  tipoStand: z.enum(["individual", "duplo", "coletivo"], { required_error: "Selecione o tipo de stand" }),
  nomePlaca: z.string().min(1, { message: "Nome para placa é obrigatório" }),
  descricaoArte: z.string().min(1, { message: "Descreva a arte que será vendida" }),
  imagens: z.any().refine(
    (files) => files && files.length >= 1 && files.length <= 1,),
  tomada: z.boolean().optional(),
  necessidades: z.string().optional(),
  valorComprovante: z.any().refine((file) => file && file.length > 0, { message: "Comprovante de pagamento é obrigatório" }),
  termoResponsabilidade: z.literal(true, { errorMap: () => ({ message: "Aceite o termo de responsabilidade e conduta" }) }),
  redesSociais: z.string().optional(),
  avatarLogo: z.any().optional(),
  regras: z.literal(true, { errorMap: () => ({ message: "Aceite as regras do evento" }) }),
  autoral: z.literal(true, { errorMap: () => ({ message: "Confirme que o conteúdo é autoral" }) }),
});

type IFormInput = z.infer<typeof schema>;

export default function ArtistAlleyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipoStand: undefined,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <main className="pt-20 min-h-screen w-full bg-white flex items-center justify-center px-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl space-y-6 border border-purple-200"
        encType="multipart/form-data"
      >
        {/* Topo do evento */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-2">AnimeFest 2025 - Artist Alley</h1>
          <p className="text-gray-700 mb-2">
            Inscrições abertas para o Artist Alley! Leia atentamente as regras, critérios de seleção e prazos no <a href="#" className="underline text-purple-700">regulamento oficial</a>.
          </p>
          <p className="text-gray-600 text-sm">
            Atenção: Apenas trabalhos autorais serão aceitos. O envio de imagens e comprovante é obrigatório. Prazo de inscrição: até 30/06/2025.
          </p>
        </div>

        {/* Dados do artista/coletivo */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-700 font-medium mb-1">Nome completo do responsável:</label>
            <input
              {...register("responsavel")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.responsavel ? "border-red-400" : "border-gray-200"}`}
              placeholder="Nome do responsável"
            />
            {errors.responsavel && <p className="text-red-500 text-sm mt-1">{errors.responsavel.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Nome artístico ou coletivo:</label>
            <input
              {...register("nomeArtistico")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.nomeArtistico ? "border-red-400" : "border-gray-200"}`}
              placeholder="Nome artístico/coletivo"
            />
            {errors.nomeArtistico && <p className="text-red-500 text-sm mt-1">{errors.nomeArtistico.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">CPF ou CNPJ:</label>
            <input
              {...register("cpfCnpj")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.cpfCnpj ? "border-red-400" : "border-gray-200"}`}
              placeholder="CPF ou CNPJ"
            />
            {errors.cpfCnpj && <p className="text-red-500 text-sm mt-1">{errors.cpfCnpj.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">E-mail:</label>
            <input
              {...register("email")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.email ? "border-red-400" : "border-gray-200"}`}
              placeholder="E-mail para contato"
              type="email"
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Telefone/WhatsApp:</label>
            <input
              {...register("telefone")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.telefone ? "border-red-400" : "border-gray-200"}`}
              placeholder="Telefone ou WhatsApp"
            />
            {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Cidade:</label>
            <input
              {...register("cidade")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.cidade ? "border-red-400" : "border-gray-200"}`}
              placeholder="Cidade"
            />
            {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Estado:</label>
            <input
              {...register("estado")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.estado ? "border-red-400" : "border-gray-200"}`}
              placeholder="UF"
              maxLength={2}
            />
            {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-purple-700 font-medium mb-1">Link para portfólio (Instagram, site, etc.):</label>
            <input
              {...register("portfolio")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.portfolio ? "border-red-400" : "border-gray-200"}`}
              placeholder="https://instagram.com/seuartista"
              type="url"
            />
            {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio.message}</p>}
          </div>
        </div>

        {/* Informações do stand */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-700 font-medium mb-1">Tipo de stand:</label>
            <select
              {...register("tipoStand")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.tipoStand ? "border-red-400" : "border-gray-200"}`}
              defaultValue=""
            >
              <option value="" disabled>Selecione</option>
              <option value="individual">Individual</option>
              <option value="duplo">Duplo</option>
              <option value="coletivo">Coletivo</option>
            </select>
            {errors.tipoStand && <p className="text-red-500 text-sm mt-1">{errors.tipoStand.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Nome para placa do stand:</label>
            <input
              {...register("nomePlaca")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.nomePlaca ? "border-red-400" : "border-gray-200"}`}
              placeholder="Nome que aparecerá na placa"
            />
            {errors.nomePlaca && <p className="text-red-500 text-sm mt-1">{errors.nomePlaca.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-purple-700 font-medium mb-1">Descrição da arte que será vendida:</label>
          <textarea
            {...register("descricaoArte")}
            className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.descricaoArte ? "border-red-400" : "border-gray-200"}`}
            placeholder="Ex: prints, zines, chaveiros, adesivos, etc."
            rows={3}
          />
          {errors.descricaoArte && <p className="text-red-500 text-sm mt-1">{errors.descricaoArte.message}</p>}
        </div>
        <div>
          <label className="block text-purple-700 font-medium mb-1">Imagens do trabalho artístico:</label>
          <input
            {...register("imagens")}
            type="file"
            accept="image/*"
            multiple
            className={`w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500 ${
              errors.imagens ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.imagens && <p className="text-red-500 text-sm mt-1">{errors.imagens.message as string}</p>}
        </div>

        {/* Necessidades técnicas */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="inline-flex items-center text-gray-900">
              <input
                {...register("tomada")}
                type="checkbox"
                className="mr-2 accent-purple-500"
              />
              Preciso de tomada no stand
            </label>
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Necessidades especiais ou estruturas adicionais:</label>
            <input
              {...register("necessidades")}
              className="w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border-gray-200"
              placeholder="Descreva se necessário"
            />
          </div>
        </div>

        {/* Pagamento */}
        <div>
          <label className="block text-purple-700 font-medium mb-1">Valor do stand: <span className="font-bold text-green-700">R$ 350,00</span></label>
          <label className="block text-purple-700 font-medium mb-1 mt-2">Comprovante de pagamento:</label>
          <input
            {...register("valorComprovante")}
            type="file"
            accept="image/*,application/pdf"
            className={`w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500 ${errors.valorComprovante ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.valorComprovante && <p className="text-red-500 text-sm mt-1">{errors.valorComprovante.message as string}</p>}
          <label className="inline-flex items-center mt-2 text-gray-900">
            <input
              {...register("termoResponsabilidade")}
              type="checkbox"
              className="mr-2 accent-purple-500"
            />
            <span className="text-sm">
              Li e aceito o termo de responsabilidade e conduta.
            </span>
          </label>
          {errors.termoResponsabilidade && <p className="text-red-500 text-sm mt-1">{errors.termoResponsabilidade.message}</p>}
        </div>

        {/* Divulgação */}
        <div>
          <label className="block text-purple-700 font-medium mb-1">Redes sociais (opcional):</label>
          <input
            {...register("redesSociais")}
            className="w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border-gray-200"
            placeholder="Instagram, Twitter, etc."
          />
        </div>
        <div>
          <label className="block text-purple-700 font-medium mb-1">Avatar ou logo para divulgação (opcional):</label>
          <input
            {...register("avatarLogo")}
            type="file"
            accept="image/*"
            className="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500 border-gray-200"
          />
        </div>

        {/* Confirmações finais */}
        <div>
          <label className="inline-flex items-center text-gray-900">
            <input
              {...register("regras")}
              type="checkbox"
              className="mr-2 accent-purple-500"
            />
            <span className="text-sm">
              Li e aceito as regras do evento.
            </span>
          </label>
          {errors.regras && <p className="text-red-500 text-sm mt-1">{errors.regras.message}</p>}
        </div>
        <div>
          <label className="inline-flex items-center text-gray-900">
            <input
              {...register("autoral")}
              type="checkbox"
              className="mr-2 accent-purple-500"
            />
            <span className="text-sm">
              Confirmo que todo o conteúdo apresentado é autoral.
            </span>
          </label>
          {errors.autoral && <p className="text-red-500 text-sm mt-1">{errors.autoral.message}</p>}
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