"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(8, { message: "Telefone é obrigatório" }),
  cpf: z.string().min(11, { message: "CPF é obrigatório" }),
  quantidade: z.coerce.number().min(1, { message: "Quantidade mínima é 1" }),
  tipo: z.enum(["Inteira", "Meia-entrada", "VIP"], { required_error: "Selecione o tipo de ingresso" }),
  desconto: z.string().optional(),
  comprovante: z.any().optional(),
  declaracaoMeia: z.boolean().optional(),
  pagamento: z.enum(["cartao", "pix", "boleto", "paypal"], { required_error: "Selecione uma forma de pagamento" }),
  cartaoNumero: z.string().optional(),
  cartaoValidade: z.string().optional(),
  cartaoCVV: z.string().optional(),
  cartaoNome: z.string().optional(),
  termos: z.literal(true, { errorMap: () => ({ message: "Você deve aceitar os termos de uso e política de privacidade" }) }),
});

type IFormInput = z.infer<typeof schema>;

export default function IngressoForm() {
  const [, setTipoIngresso] = useState<string>("");
  const [, setPagamento] = useState<string>("");


  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantidade: 1,
      tipo: undefined,
      pagamento: undefined,

    },
  });

  const tipoSelecionado = watch("tipo");
  const pagamentoSelecionado = watch("pagamento");


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
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-2">AnimeFest 2025</h1>
          <p className="text-lg text-gray-700">Data: 10/08/2025 &nbsp;|&nbsp; Horário: 10h às 22h</p>
          <p className="text-lg text-gray-700">Local: Centro de Convenções, Av. dos Eventos, 123</p>
        </div>

        {/* Dados do comprador */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-700 font-medium mb-1">Nome completo:</label>
            <input
              {...register("nome")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.nome ? "border-red-400" : "border-gray-200"}`}
              placeholder="Digite seu nome completo"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">E-mail:</label>
            <input
              {...register("email")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.email ? "border-red-400" : "border-gray-200"}`}
              placeholder="Digite seu e-mail"
              type="email"
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Telefone:</label>
            <input
              {...register("telefone")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.telefone ? "border-red-400" : "border-gray-200"}`}
              placeholder="Digite seu telefone"
              type="tel"
            />
            {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">CPF:</label>
            <input
              {...register("cpf")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.cpf ? "border-red-400" : "border-gray-200"}`}
              placeholder="Digite seu CPF"
              type="text"
              maxLength={14}
            />
            {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>}
          </div>
        </div>

        {/* Seleção de ingresso */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-700 font-medium mb-1">Quantidade:</label>
            <input
              {...register("quantidade", { valueAsNumber: true })}
              type="number"
              min={1}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.quantidade ? "border-red-400" : "border-gray-200"}`}
              placeholder="Quantidade"
            />
            {errors.quantidade && <p className="text-red-500 text-sm mt-1">{errors.quantidade.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Tipo de ingresso:</label>
            <select
              {...register("tipo")}
              className={`w-full px-4 py-2 border rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.tipo ? "border-red-400" : "border-gray-200"}`}
              defaultValue=""
              onChange={e => setTipoIngresso(e.target.value)}
            >
              <option value="" disabled>Selecione o tipo</option>
              <option value="Inteira">Inteira</option>
              <option value="Meia-entrada">Meia-entrada</option>
              <option value="VIP">VIP</option>
            </select>
            {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo.message}</p>}
          </div>
          <div>
            <label className="block text-purple-700 font-medium mb-1">Código de desconto:</label>
            <input
              {...register("desconto")}
              className="w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border-gray-200"
              placeholder="Se tiver, insira aqui"
            />
          </div>
        </div>

        {/* Se meia-entrada, comprovante e declaração */}
        {tipoSelecionado === "Meia-entrada" && (
          <div className="bg-purple-50 border border-purple-200 rounded p-4 mb-2">
            <label className="block text-purple-700 font-medium mb-1">Comprovante de meia-entrada:</label>
            <input
              {...register("comprovante")}
              type="file"
              accept="image/*,application/pdf"
              className="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500 border-gray-200"
            />
            <label className="inline-flex items-center mt-2 text-gray-900">
              <input
                {...register("declaracaoMeia")}
                type="checkbox"
                className="mr-2 accent-purple-500"
              />
              <span className="text-sm">
                Declaro que as informações do comprovante são verdadeiras.
              </span>
            </label>
          </div>
        )}

        {/* Pagamento */}
        <div>
          <label className="block text-purple-700 font-medium mb-1">Forma de pagamento:</label>
          <select
            {...register("pagamento")}
            className={`w-full px-4 py-2 border rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300 ${errors.pagamento ? "border-red-400" : "border-gray-200"}`}
            defaultValue=""
            onChange={e => setPagamento(e.target.value)}
          >
            <option value="" disabled>Selecione</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="pix">Pix</option>
            <option value="boleto">Boleto</option>
            <option value="paypal">PayPal</option>
          </select>
          {errors.pagamento && <p className="text-red-500 text-sm mt-1">{errors.pagamento.message}</p>}
        </div>

        {/* Dados do cartão */}
        {pagamentoSelecionado === "cartao" && (
          <div className="grid md:grid-cols-2 gap-4 bg-purple-50 border border-purple-200 rounded p-4 mb-2">
            <div>
              <label className="block text-purple-700 font-medium mb-1">Número do cartão:</label>
              <input
                {...register("cartaoNumero")}
                className="w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border-gray-200"
                placeholder="Número do cartão"
                maxLength={19}
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-1">Validade:</label>
              <input
                {...register("cartaoValidade")}
                className="w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border-gray-200"
                placeholder="MM/AA"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-1">CVV:</label>
              <input
                {...register("cartaoCVV")}
                className="w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border-gray-200"
                placeholder="CVV"
                maxLength={4}
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-1">Nome do titular:</label>
              <input
                {...register("cartaoNome")}
                className="w-full px-4 py-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 border-gray-200"
                placeholder="Nome impresso no cartão"
              />
            </div>
          </div>
        )}

        {/* Entrega do ingresso */}
        

       

        {/* Aceite dos termos */}
        <div>
          <label className="inline-flex items-center text-gray-900">
            <input
              {...register("termos")}
              type="checkbox"
              className="mr-2 accent-purple-500"
            />
            <span className="text-sm">
              Aceito os <a href="#" className="underline text-purple-700">termos de uso</a> e a <a href="#" className="underline text-purple-700">política de privacidade</a>.
            </span>
          </label>
          {errors.termos && (
            <p className="text-red-500 text-sm mt-1">{errors.termos.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full hover:shadow-lg transition duration-300 font-bold text-lg transform hover:scale-105"
        >
          Comprar Ingresso
        </button>
      </form>
    </main>
  );
}