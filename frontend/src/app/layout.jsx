import UserContextProvider, { ShopContextProvider } from "./context/UserContextProvider";
import "./globals.css";
// import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Omitrek",
  description: "Omitrek a shoping app and many more !",
};

export default function RootLayout({ children }) {

  return (

    <html lang="en">
      <body>
        <UserContextProvider>
          <ShopContextProvider>
            {children}
            <Toaster />
          </ShopContextProvider>
        </UserContextProvider>
      </body>
    </html>

  );
}
