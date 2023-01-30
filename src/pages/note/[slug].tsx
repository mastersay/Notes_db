import {getNote, getNotesSlugs} from "@/services";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote"
import Header from "@/components/Header";
const components ={Header}
export default function All_notes({source}: any) {
    // noinspection SpellCheckingInspection
    return (
        <div className="prose text-gray-600 dark:text-white">
            <MDXRemote {...source} components={components}/>
        </div>
    )
}

export async function getStaticProps({params}: any) {
    const note = await getNote(params.slug)
    const mdxSource = await serialize(note.content)
    return {
        props: {source: mdxSource}
    }
}

export async function getStaticPaths() {
    const notesSlugs = await getNotesSlugs()
    return {
        paths: notesSlugs.map((note: { slug: string }) => (
            {params: {slug: note.slug}})),
        fallback: false
    }
}