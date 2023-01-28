import Head from 'next/head'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({subsets: ['latin']})
const posts = [{title: "Demo title", "excerpt": "Demo excerpt"}]
export default function Home() {
    // noinspection SpellCheckingInspection
    return (
        <div className={""}>
            <Head>
                <title>Notes-db</title>
            </Head>
            <h1 className={"text-3xl font-extrabold leading-9 tracking-tight sm-text-4xl sm:leading-10 md:text-6xl md:leading-14"}>Latest</h1>
            <div className={"grid grid-cols-1 lg:grid-cols-12 gap-12"}>
                {posts.map((post) => (
                    <div key={post.title}>
                        {post.title}
                        {post.excerpt}
                    </div>
                ))}
            </div>
        </div>
    )
}
