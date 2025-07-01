-- Insert service prices
INSERT INTO service_prices (service_name, display_name, price, description, active) VALUES
('birth-chart', 'Birth Chart Analysis', '₹1500', 'Complete birth chart analysis with personalized guidance', true),
('relationship', 'Relationship Compatibility', '₹1200', 'Detailed compatibility analysis for couples', true),
('career', 'Career Guidance', '₹1000', 'Professional astrology consultation for career decisions', true),
('health', 'Health & Wellness', '₹950', 'Astrological insights into health patterns', true),
('grah-shanti', 'Grah Shanti Pooja', '₹2500', 'Traditional pooja for planetary peace', true),
('navagraha', 'Navagraha Pooja', '₹3000', 'Nine planetary worship ceremony', true),
('monthly-pooja', 'Monthly Pooja', '₹1500', 'Regular monthly spiritual rituals', true),
('chakra-healing', 'Chakra Healing', '₹800', 'Energy healing for chakra alignment', true),
('spiritual-counseling', 'Spiritual Counseling', '₹700', 'Spiritual guidance and counseling', true)
ON CONFLICT (service_name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  active = EXCLUDED.active,
  updated_at = CURRENT_TIMESTAMP;

-- Insert class prices
INSERT INTO class_prices (class_name, display_name, price, duration, description, active) VALUES
('practice-kundali', 'Practice Kundali for Students', '₹2500', 'Monthly', 'Monthly program for astrology students to practice chart reading', true)
ON CONFLICT (class_name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  description = EXCLUDED.description,
  active = EXCLUDED.active,
  updated_at = CURRENT_TIMESTAMP;
