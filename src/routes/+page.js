export async function load() {
	const mdModules = import.meta.glob('../content/**/*.md');
	const articles = await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			console.log(path)
			const slug = path.split('/').at(-1)?.split(".").at(0);
			const { metadata: { title, description, tag, date } } = await mdModules[path]();
			return { title, slug, description, tag, date };
		}),
	);
	return { articles };
}
