import UserContextProvider from "./context/UserContextProvider";
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
        {children}
        <Toaster />
        </UserContextProvider>
        </body>
    </html>
   
  );
}
