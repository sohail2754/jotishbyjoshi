-- Script to update an existing blog post
-- Usage: Replace the values and WHERE condition with your actual data

UPDATE blog_posts SET
    title = 'Updated Blog Post Title',
    excerpt = 'Updated excerpt...',
    content = 'Updated content...',
    category = 'Planetary Astrology',
    tags = ARRAY['updated', 'tags'],
    featured = true,
    published = true,
    updated_at = CURRENT_TIMESTAMP
WHERE slug = 'your-blog-post-slug';
