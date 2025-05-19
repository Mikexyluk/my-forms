import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Formulario de Login",
  description: "Formulario de Login com useform com ZOD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
