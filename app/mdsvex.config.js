import { escapeSvelte } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import remarkUnwrapImages from 'remark-unwrap-images';
import shiki from 'shiki';

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
	extensions: ['.md'],
	layout: {
		_: './src/mdsvex.svelte'
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await shiki.getHighlighter({ theme: 'poimandres' });
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
			return `{@html \`${html}\` }`;
		}
	},
	rehypePlugins: [rehypeSlug],
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
};

export default config;
