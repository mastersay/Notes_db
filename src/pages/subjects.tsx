import {getSubjects} from "@/services"
import Link from "next/link";

// Subjects page
const Subjects = ({subjects}: any) => {
    // noinspection SpellCheckingInspection
    return (
        <div>
            <div
                className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
                <div className="space-x-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
                        Subjects
                    </h1>
                </div>
                <div className="flex max-w-lg flex-wrap">
                    {/*Loop over all subejcts to display them*/}
                    {subjects.map((subject: { shorthand: string, subjectSlug: string, subjectTitle: string, posts: [unknown] }) => (
                        <div key={subject.subjectTitle} className={"group mt-2 mb-2 mr-5"}>
                            <Link href={`/subject/${subject.subjectSlug}`} prefetch={false}
                                  className={"mr-3 text-sm font-medium text-cyan-600 group-hover:text-cyan-700 dark:group-hover:text-cyan-400"}>
                                {subject.shorthand}
                            </Link>
                            <Link href={`/subject/${subject.subjectSlug}`} prefetch={false}
                                  className={"-ml-2 text-sm font-semibold text-gray-600 dark:text-gray-300"}>
                                {`(${subject.posts.length})`}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
export default Subjects

// Call to the api get function
export async function getStaticProps() {
    const subjects = (await getSubjects()) || []
    return {
        props: {subjects}, revalidate: 60
    }
}