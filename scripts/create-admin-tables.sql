-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create service prices table
CREATE TABLE IF NOT EXISTS service_prices (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(200) NOT NULL,
    price VARCHAR(50) NOT NULL,
    original_price VARCHAR(50),
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create class prices table
CREATE TABLE IF NOT EXISTS class_prices (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(200) NOT NULL,
    price VARCHAR(50) NOT NULL,
    original_price VARCHAR(50),
    description TEXT,
    duration VARCHAR(50),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: cosmic123)
INSERT INTO admin_users (username, email, password_hash) 
VALUES ('admin', 'admin@jyotishjoshi.com', '$2b$10$rQZ9QZ9QZ9QZ9QZ9QZ9QZOeKq7QZ9QZ9QZ9QZ9QZ9QZ9QZ9QZ9QZ9Q')
ON CONFLICT (username) DO NOTHING;

-- Insert default service prices
INSERT INTO service_prices (service_name, display_name, price, description) VALUES
('birth-chart', 'Birth Chart Analysis', '₹950', 'Complete analysis of your birth chart with detailed insights'),
('relationship', 'Relationship Compatibility', '₹950', 'Compatibility analysis for couples and relationships'),
('career', 'Career Guidance', '₹950', 'Professional guidance for career decisions and growth'),
('health', 'Health & Wellness', '₹950', 'Health predictions and wellness recommendations'),
('chakra-healing', 'Chakra Healing Session', '₹950', 'Energy healing and chakra balancing session'),
('spiritual-counseling', 'Spiritual Counseling', '₹950', 'Spiritual guidance and counseling session'),
('past-life', 'Past Life Reading', '₹950', 'Insights into your past life experiences'),
('grah-shanti', 'Grah Shanti Pooja', '₹950', 'Planetary peace rituals and ceremonies'),
('navagraha', 'Navagraha Pooja', '₹950', 'Nine planet worship ceremony'),
('monthly-pooja', 'Monthly Pooja Package', '₹950', 'Monthly spiritual rituals and prayers')
ON CONFLICT DO NOTHING;

-- Insert default class prices
INSERT INTO class_prices (class_name, display_name, price, description, duration) VALUES
('foundation', 'Foundation Course', '₹2,000/month', 'Basic astrology principles and chart reading', '3 months'),
('advanced', 'Advanced Astrology', '₹2,000/month', 'Advanced techniques and predictive methods', '6 months'),
('specialized', 'Specialized Techniques', '₹2,000/month', 'Specialized astrology techniques and remedies', '4 months'),
('remedial', 'Remedial Astrology', '₹2,000/month', 'Focus on astrological remedies and solutions', '3 months'),
('professional', 'Professional Practice', '₹2,000/month', 'Become a professional astrologer', '12 months'),
('masterclass', 'Master Class Series', '₹2,000/month', 'Advanced masterclass for experienced practitioners', '6 months'),
('practice-kundali', 'Practice Kundali for Students', '₹500/month', 'Hands-on practice sessions for students', 'Ongoing')
ON CONFLICT DO NOTHING;
