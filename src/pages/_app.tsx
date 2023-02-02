import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/components/Layout"
import {ThemeProvider} from "next-themes";
import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
    return (
        // Using Theme provider from next-themes for dark mode tailwindcss integration
        <ThemeProvider attribute={"class"}>
            <Head>
                <title>Notes-db</title>
            </Head>
             {/*Layout that always displays navigation and page content*/}
             <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}
