-- -- Required, otherwise inserting products breaks categories references
-- PRAGMA foreign_keys = OFF;

-- -- everything between 'BEGIN' and 'COMMIT' for now is a dummyValues for dummyTable

-- INSERT INTO dummytable VALUES
--   (1, 'Beverages', 'Soft drinks, coffees, teas, beers, and ales'),
--   (2, 'Condiments', 'Sweet and savory sauces, relishes, spreads, and seasonings'),
--   (3, 'Confections', 'Desserts, candies, and sweet breads'),
--   (4, 'Dairy Products', 'Cheeses'),
--   (5, "mess", 'tomato')
-- ON CONFLICT DO NOTHING;


-- -- turn this back on now we're done
-- PRAGMA foreign_keys = ON;
