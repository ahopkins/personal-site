export async function load({ params }) {
    const { slug } = params
    const postPromise = import(`../../content/${slug}.md`)
    const [postResult] = await Promise.all([postPromise])
    const { default: body, metadata } = postResult

    return {
        meta: { ...metadata },
        body,
    }
}
