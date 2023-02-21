import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/components/Layout"
import {ThemeProvider} from "next-themes";
import Head from "next/head";
import Script from "next/script";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    return (
        // Using Theme provider from next-themes for dark mode tailwindcss integration
        <ThemeProvider attribute={"class"}>
            <Head>
                <title>Notes-db</title>
                <Script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5429283621438170"
                        crossOrigin="anonymous"/>
            </Head>
             {/*Layout that always displays navigation and page content*/}
             <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}
