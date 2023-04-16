import Link from "next/link";
import {getNotes} from "@/services";
import {POSTS_PER_PAGE} from "@/pages/index";
import {useState} from "react";
import PagePagination from "@/components/PagePagination";

// All notes page
export default function All_notes({notes_in, pagination}: any) {
    const [notes, setNotes] = useState(notes_in)
    const [currentPage, setCurrentPage] = useState(pagination.currentPage)
    const notes_copy = Array.from(notes_in)

    function handleSearch({target}: { target: EventTarget }) {
        const searchValue = (target as HTMLButtonElement).value
        if (searchValue == "") {
            if (JSON.stringify(notes) !== JSON.stringify(notes_copy)) {
                setNotes(notes_copy)
            }
        } else {
            setNotes(notes_in.filter((note: any) => {
                const searchContent = note.title + note.content + note.excerpt + note.subject.subjectTitle + note.subject.shorthand
                return searchContent.toLowerCase().includes(searchValue.toLowerCase())
            }))
        }
    }
    // noinspection SpellCheckingInspection
    return (
        <div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        All notes
                    </h1>
                    <div className="relative max-w-lg">
                        <input
                            aria-label="Search articles"
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search articles"
                            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-cyan-600 focus:border-opacity-5 focus:ring-cyan-600 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <svg
                            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!notes.length && 'No posts found.'}
                    {/*Display pages with notes*/}
                    {notes.slice((currentPage - 1) * POSTS_PER_PAGE, (currentPage - 1) * POSTS_PER_PAGE + POSTS_PER_PAGE).map((frontMatter: { slug: string, title: string, topicPresentedOn: string, excerpt: string, subject: { subjectSlug: string, shorthand: string } }) => {
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
            {notes.length > POSTS_PER_PAGE && (
                <><PagePagination currentPage={currentPage} totalPages={pagination.totalPages}
                                   setCurrentPage={setCurrentPage}/></>
            )}
        </div>
    )
}

// Get all posts and split them to multiple pages for readability
export async function getStaticProps() {
    const notes_in = await getNotes(9999) || []
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(notes_in.length / POSTS_PER_PAGE),
    }
    return {
        props: {notes_in, pagination}, revalidate: 60
    }
}