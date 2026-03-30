import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    date: z.string(),
    readTime: z.string(),
    category: z.string(),
    categoryEn: z.string(),
    excerpt: z.string(),
    excerptEn: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
