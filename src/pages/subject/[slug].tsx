import Link from "next/link";
import {getNotes, getSubjectsSlugs} from "@/services";
import {POSTS_PER_PAGE} from "@/pages";

// Dynamic redirect when searching specific subject notes
export default function All_notes({notes}: any) {
    // noinspection SpellCheckingInspection
    return (
        <div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        All notes
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">

                    </p>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!notes.length && 'No posts found.'}
                    {/*Display all notes in searched subject*/}
                    {notes.map((frontMatter: { slug: string, title: string, topicPresentedOn: string, excerpt: string, subject: { subjectSlug: string, shorthand: string } }) => {
                        const {slug, title, topicPresentedOn, excerpt, subject} = frontMatter
                        const formattedDate = new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }).format(new Date(topicPresentedOn))
                        return (
                            <li key={slug} className="py-12">
                                <article>
                                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                        <dl>
                                            <dt className="sr-only">Published on</dt>
                                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time
                                                    dateTime={topicPresentedOn}>{formattedDate}</time>
                                            </dd>
                                        </dl>
                                        <div className="space-y-5 xl:col-span-3">
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                        <Link
                                                            href={`/note/${slug}`}
                                                            className="text-gray-900 dark:text-gray-100">
                                                            {title}
                                                        </Link>
                                                    </h2>
                                                    <div className="flex flex-wrap">
                                                        <Link href={`/subject/${subject.subjectSlug}`}
                                                              className={"mr-3 text-sm font-medium uppercase text-cyan-600 hover:text-cyan-700 dark:hover:text-cyan-400"}>
                                                            {subject.shorthand}
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="max-w-none text-gray-500 dark:text-gray-400">
                                                    {excerpt}
                                                </div>
                                            </div>
                                            <div className="text-base font-medium leading-6">
                                                <Link
                                                    href={`/note/${slug}`}
                                                    className="text-cyan-600 hover:text-cyan-700 dark:hover:text-cyan-400"
                                                    aria-label={`Read "${title}"`}>
                                                    Read more &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

// Get all notes carrying the search subject
export async function getStaticProps({params}: any) {
    const notes = (await getNotes(9999, params.slug)) || []
    // const initialDisplayPosts = notes.slice(0, POSTS_PER_PAGE)
    // const pagination = {
    //     currentPage: 1,
    //     totalPages: Math.ceil(notes.length / POSTS_PER_PAGE),
    // }
    return {
        // props: {notes, initialDisplayPosts, pagination}
        props: {notes}
    }
}

// Dynamic redirect url
export async function getStaticPaths() {
    const subjectsSlugs = await getSubjectsSlugs()
    return {
        paths: subjectsSlugs.map((subject: { subjectSlug: string }) => (
            {params: {slug: subject.subjectSlug}})),
        fallback: false
    }
}