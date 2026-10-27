const REPOS = [
    "sanic-org/sanic",
    "sanic-org/sanic-ext",
    "ahopkins/sanic-jwt",
    "ahopkins/sanic-session",
    "ahopkins/mayim",
    "ahopkins/merkava",
]

/** @param {typeof fetch} fetch @param {string} slug */
async function loadRepo(fetch, slug) {
    try {
        const response = await fetch(`https://api.github.com/repos/${slug}`)
        if (!response.ok) return { slug }
        const data = await response.json()
        return {
            slug,
            description: data.description?.trim() || null,
            language: data.language,
            stars: data.stargazers_count,
            forks: data.forks_count,
        }
    } catch {
        return { slug }
    }
}

export async function load({ fetch }) {
    return {
        repos: await Promise.all(REPOS.map((slug) => loadRepo(fetch, slug))),
    }
}
