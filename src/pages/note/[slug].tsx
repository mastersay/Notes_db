import {getNote, getNotesSlugs} from "@/services";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote"
import Header from "@/components/Header";

// Dynamic redirect to this file if you want to display .md/.mdx file
const components = {Header}
export default function All_notes({source}: any) {
    // noinspection SpellCheckingInspection
    return (
        <div className="prose dark:prose-invert">
            {/*Display the md note content*/}
            <MDXRemote {...source} components={components}/>
        </div>
    )
}

// Call to the api get function
export async function getStaticProps({params}: any) {
    const note = await getNote(params.slug)
    // Serialize the md string
    const mdxSource = await serialize(note.content)
    return {
        props: {source: mdxSource}
    }
}

// Dynamic redirect url
export async function getStaticPaths() {
    const notesSlugs = await getNotesSlugs(999)
    return {
        paths: notesSlugs.map((note: { slug: string }) => (
            {params: {slug: note.slug}})),
        fallback: false
    }
}