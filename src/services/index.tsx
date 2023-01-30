import {request, gql} from "graphql-request";

const graphqlAPI = process.env["NEXT_PUBLIC_GRAPHCMS_ENDPOINT"] ?? ""

export const getSubjects = async () => {
    const query = gql`
    query getSubjects {
        subjectsConnection(orderBy: shorthand_ASC, first: 32) {
            edges {
                node {
                    shorthand
                    subjectSlug
                    subjectTitle
                    posts {
                        id
                    }
                }
            }
        }
    }`
    const result = await request(graphqlAPI, query)
    return result.subjectsConnection.edges.map(({node}: { node: unknown }) => (node))
}
export const getSubjectsSlugs = async () => {
    const query = gql`
    query getSubjectSlugs {
        subjects {
            subjectSlug
        }
    }`
    const result = await request(graphqlAPI, query)
    return result.subjects
}
export const getNotes = async (limit: number = 5) => {
    const query = gql`
    query getNotes {
        postsConnection(orderBy: topicPresentedOn_DESC, first: ${limit}) {
            edges {
                node {
                    slug
                    title
                    topicPresentedOn
                    excerpt
                    subject {
                        subjectSlug
                        shorthand
                    }
                content
                }
            }
        }
    }`
    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges.map(({node}: { node: unknown }) => (node))
}
export const getNotesSlugs = async () => {
    const query = gql`
    query getNoteSlugs {
        posts {
            slug
        }
    }`
    const result = await request(graphqlAPI, query)
    return result.posts
}
export const getNote = async (note_slug: string) => {
    const query = gql`
        query getNotes ($note_slug: String){
            post(where: {slug: $note_slug}, locales: sk) {
                content
                title
            }
        }`
    const result = await request(graphqlAPI, query, {note_slug})
    return result.post
}