-- Script to add a new blog post
-- Usage: Replace the values below with your actual blog post data

INSERT INTO blog_posts (
    title,
    slug,
    excerpt,
    content,
    author,
    category,
    tags,
    image_url,
    featured,
    published
) VALUES (
    'Your Blog Post Title Here',
    'your-blog-post-slug-here',
    'A brief excerpt describing what this blog post is about...',
    'The full content of your blog post goes here. You can include multiple paragraphs, formatting, and detailed information about the topic.',
    'Joshi',
    'Astrology Fundamentals', -- Choose from: Astrology Fundamentals, Planetary Astrology, Predictive Astrology, Remedial Ast  -- Choose from: Astrology Fundamentals, Planetary Astrology, Predictive Astrology, Remedial Astrology, Relationship Astrology, Career Astrology
    ARRAY['tag1', 'tag2', 'tag3'], -- Add relevant tags
    '/placeholder.svg?height=400&width=600', -- Replace with actual image URL
    false, -- Set to true if this should be a featured post
    true  -- Set to true to publish immediately, false for draft
);
