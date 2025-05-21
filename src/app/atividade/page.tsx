import Navbar from "../componentes/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen w-full bg-white">
        {/* Banner Promocional */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-20 flex flex-col items-center justify-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Bem-vindo ao AnimeFest!
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-8 font-medium drop-shadow">
            O maior evento de anime da região. Garanta já seu ingresso e viva uma experiência inesquecível!
          </p>
          <a
            href="/vendaingresso"
            className="inline-block bg-white text-purple-700 font-bold py-4 px-12 rounded-full hover:shadow-xl transition duration-300 transform hover:scale-105 text-xl"
          >
            Comprar Ingressos
          </a>
        </section>
        <section className="my-16 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Destaques do Evento</h2>
          <ul className="grid md:grid-cols-2 gap-8">
            <li className="bg-white rounded-lg shadow-md p-6">
              <h3 className=" text-purple-700 font-semibold text-lg mb-2">Cosplay</h3>
              <p className="text-gray-600 mb-4">Concurso de cosplay com prêmios incríveis para os melhores trajes!</p>
              <a
                href="/concursocosplay"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-full hover:shadow-lg transition duration-300"
              >
                Inscreva-se no Concurso
              </a>
            </li>
            <li className="bg- rounded-lg shadow-md p-6">
              <h3 className="text-purple-700 font-semibold text-lg mb-2">Artisty Alley</h3>
              <p className="text-gray-600 mb-4">Se inscreva para vender suas artes</p>
              <a
                href="/estandesartistyalley"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-full hover:shadow-lg transition duration-300"
              >
                Cadastre seu Estande
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}