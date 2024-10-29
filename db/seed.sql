-- Inserting data into the `location` table
INSERT INTO location (id, country) VALUES 
  (1, 'UK'),
  (2, 'Sweden'),
  (3, 'France')
ON CONFLICT (id) DO UPDATE SET country = EXCLUDED.country;

-- Inserting data into the `activity` table
INSERT INTO activity (id, name) VALUES 
  (1, 'Sport'),
  (2, 'Art'),
  (3, 'Gardening')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Inserting multiple rows into the `products` table
INSERT INTO products (id, name, photo_link, strapline, description, stock_level, location, orders, reviews, activities) VALUES
  (1, 'Football Boots', 'https://example.com/football-boots.jpg', 'Professional-grade football boots', 'High-performance footwear designed for serious football players', 100, 1, 1, NULL, 1),
  (2, 'Goalkeeper Gloves', 'https://example.com/goalkeeper-gloves.jpg', 'Pro-level goalkeeper gloves', 'High-grip gloves designed for maximum ball control and hand protection', 100, 1, 1, NULL, 1),
  (3, 'Premium Acrylic Paint Set', 'https://example.com/acrylic-paint-set.jpg', 'Vibrant colors for artistic expression', 'High-quality acrylic paint set with 24 rich, long-lasting colors perfect for canvas, wood, and more', 100, 1, 2, NULL, 2),
  (4, 'Artist Paint Brush Set', 'https://example.com/paint-brush-set.jpg', 'Professional-quality brushes for every technique', 'Versatile 15-piece brush set including flat, round, and detail brushes for acrylic, oil, and watercolor painting', 100, 1, 2, NULL, 2),
  (5, 'Flower Seeds Mix', 'https://example.com/flower-seeds.jpg', 'Colorful variety for your garden', 'A diverse mix of annual and perennial flower seeds to create a vibrant and beautiful garden', 100, 1, 3, NULL, 3),
  (6, 'Pruning Shears', 'https://example.com/pruning-shears.jpg', 'Sharp and precise garden tool', 'High-quality stainless steel pruning shears for effortless trimming of plants and small branches', 100, 1, 3, NULL, 3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  photo_link = EXCLUDED.photo_link,
  strapline = EXCLUDED.strapline,
  description = EXCLUDED.description,
  stock_level = EXCLUDED.stock_level,
  location = EXCLUDED.location,
  orders = EXCLUDED.orders,
  reviews = EXCLUDED.reviews,
  activities = EXCLUDED.activities;