import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./style/globals.css";
import GeneralLayout from "./(generalPreview)/layout";
import Provider from "./components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";

const outfit = Outfit({
  variable: "--font-outfit400",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QuickCart",
  description: "QuickCart",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider session={session}>
          <GeneralLayout>{children}</GeneralLayout>
        </Provider>
      </body>
    </html>
  );
}
