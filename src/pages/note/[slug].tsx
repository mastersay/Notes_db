import {getNote, getNotesSlugs} from "@/services";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote"
import Header from "@/components/Header";

// Custom components for rendering MDX content
const components = {Header}

// Component function that renders MDX content
export default function All_notes({source}: any) {
    // noinspection SpellCheckingInspection
    return (
        <div className="prose dark:prose-invert">
            {/*Display the md note content*/}
            <MDXRemote {...source} components={components}/>
        </div>
    )
}

// Fetch note data
export async function getStaticProps({params}: any) {
    // Get note data based on the slug parameter
    const note = await getNote(params.slug)
    // If note is not found, return a 404 error
    if (!note) {
        return {notFound: true}
    }
    // Serialize the MDX string
    const mdxSource = await serialize(note.content)
    return {
        props: {source: mdxSource}, revalidate: 60
    }
}

// Generate dynamic paths for getStaticPaths
export async function getStaticPaths() {
    const notesSlugs = await getNotesSlugs(999)
    return {
        paths: notesSlugs.map((note: { slug: string }) => (
            {params: {slug: note.slug}})),
        fallback: "blocking"
    }
}