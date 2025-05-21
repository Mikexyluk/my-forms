import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">AF</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  AnimeFest
                </span>
              </div>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-800 hover:text-purple-600 font-medium transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-purple-600 font-medium transition duration-300"
            >
              Comprar Ingressos
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              Inscrever-se
            </a>
          </div>

          {/* Mobile menu button (apenas ícone, sem funcionalidade) */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu sempre visível em telas pequenas */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <a
            href="#"
            className="block py-3 px-4 text-gray-800 hover:bg-purple-100 rounded-md font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-3 px-4 text-gray-800 hover:bg-purple-100 rounded-md font-medium"
          >
            Comprar Ingressos
          </a>
          <a
            href="#"
            className="block py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium mx-4 text-center"
          >
            Inscrever-se
          </a>
        </div>
      </div>
    </nav>
  );
}