-- ──────────────────────────────────────────────────────────────────────────────
--  Seed data for the astrology website
--  1. Admin user  (password hash = "cosmic123" -- DO NOT use in production)
--  2. Sample blog posts
-- ──────────────────────────────────────────────────────────────────────────────

-- 1. Admin user  --------------------------------------------------------------
INSERT INTO users (username, email, password_hash, role)
VALUES (
  'admin',
  'admin@cosmicwisdom.com',
  '$2b$10$rQZ8kHp.TB.it.XXQ.3B4.nRtGxbCdlJPk05JvKqTpxrchEuBJA6S', -- bcrypt hash
  'admin'
)
ON CONFLICT (username) DO NOTHING;


-- 2. Blog posts  --------------------------------------------------------------
INSERT INTO blog_posts
  (title, slug, excerpt, content, category, tags, image_url, featured, published)
VALUES
-- ── Post 1 ────────────────────────────────────────────────────────────────────
(
  'Understanding Your Birth Chart: A Beginner''s Guide',
  'understanding-birth-chart-beginners-guide',
  'Learn how to read the cosmic blueprint of your life through your birth chart analysis.',
  $$Your birth chart is like a cosmic fingerprint that reveals the unique energies present at the moment of your birth. This comprehensive guide will walk you through the essential elements of chart interpretation, from understanding planetary positions to recognizing significant aspects and their meanings in your life journey.

### Key Components of Your Birth Chart

1. **The Twelve Houses** – areas of life from identity to spirituality.  
2. **Planetary Meanings** – Sun (core self), Moon (emotions), Mercury (communication), etc.  
3. **The Zodiac Signs** – how each planet expresses its energy.

Start with the “Big Three” (Sun, Moon, Ascendant) to build a solid foundation for interpreting your own chart!$$,
  'Astrology Basics',
  ARRAY['birth chart','beginner','natal chart','planets'],
  '/placeholder.svg?height=400&width=600',
  TRUE,
  TRUE
),

-- ── Post 2 ────────────────────────────────────────────────────────────────────
(
  'Mercury Retrograde: Myths vs Reality',
  'mercury-retrograde-myths-vs-reality',
  'Debunking common misconceptions about Mercury retrograde and how to navigate it.',
  $$Mercury retrograde often gets blamed for everything from technology failures to communication breakdowns. But what does this astrological phenomenon really mean, and how can we work with its energy constructively?

### Myths Debunked
* **“Everything will go wrong.”**  
  Reality – It’s a time for reflection, not disaster.
* **“Never sign contracts.”**  
  Reality – Exercise caution, but life goes on.
* **“Technology always breaks.”**  
  Reality – Backups and patience are key.

### The 4 R’s for Thriving
**Review · Revise · Reconnect · Reflect**

Embrace Mercury retrograde as an opportunity for growth rather than a cosmic curse!$$,
  'Planetary Transits',
  ARRAY['mercury retrograde','transits','planets'],
  '/placeholder.svg?height=400&width=600',
  FALSE,
  TRUE
);
