import Link from "next/link";
import {getNotes} from "@/services";
import GoogleAdsenseContainer from "@/components/GoogleAdsenseContainer";
export const POSTS_PER_PAGE = 5

export default function Home({notes}: any) {
    // noinspection SpellCheckingInspection
    return (
        <div>
            {/*Main part*/}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Latest
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        Newest added
                    </p>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {/*Display initial notes with data*/}
                    {!notes.length && 'No posts found.'}
                    {notes.slice(0, POSTS_PER_PAGE).map((frontMatter: { slug: string, title: string, topicPresentedOn: string, excerpt: string, subject: { subjectSlug: string, shorthand: string } }) => {
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
            {/*Add 'all posts' button if many posts*/}
            {notes.length > POSTS_PER_PAGE && (
                <div className="flex justify-end text-base font-medium leading-6">
                    <Link
                        href="all_notes"
                        className="text-cyan-600 hover:text-cyan-700 dark:hover:text-cyan-400"
                        aria-label="all posts">
                        All Posts &rarr;
                    </Link>
                </div>
            )}
            {/*Right side ADD*/}
            <div className={"h-fit"}>
            <GoogleAdsenseContainer client={"ca-pub-5429283621438170"} slot={"9822374882"}></GoogleAdsenseContainer>
            </div>
        </div>
    )
}

// Call to the api get function
export async function getStaticProps() {
    const notes = (await getNotes(POSTS_PER_PAGE + 1)) || []
    return {
        props: {notes}, revalidate: 3600
    }
}