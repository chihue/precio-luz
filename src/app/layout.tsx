import Header from "@/components/Header";
import Provider from "@/service/Provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precio de la luz por hotas",
  description: "Precio de la luz por horas en españa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Provider>
          <Header />
          <main className="flex-grow mx-auto px-4 py-8">
            {children}
          </main>
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}
