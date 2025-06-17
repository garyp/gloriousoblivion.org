import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const comments = defineCollection({
	// Load JSON files in the `src/content/comments/` directory.
	loader: glob({ base: './src/content/comments', pattern: '**/*.json' }),
	// Type-check frontmatter using a schema
	schema: z.array(
		z.object({
			id: z.string(),
			parentId: z.string().nullish(),
			createdBy: z.object({
				fullName: z.string(),
			}),
			html: z.string(),
			publishedAt: z.coerce.date(),
		})
	),
});

export const collections = { blog, comments };
