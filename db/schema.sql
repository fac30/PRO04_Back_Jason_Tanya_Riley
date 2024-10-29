-- Create tables

CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS location (
    id SERIAL PRIMARY KEY,
    country TEXT
);

CREATE TABLE IF NOT EXISTS buyer (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,                    -- for auth
    email TEXT UNIQUE NOT NULL,            -- for auth
    password TEXT NOT NULL,                -- Store the hashed and salted password here
    role TEXT DEFAULT 'user',              -- for future authorization
    location INTEGER DEFAULT 1,
    transactions INTEGER DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    CONSTRAINT fk_buyer_location FOREIGN KEY (location) REFERENCES location(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    photo_link TEXT UNIQUE,
    strapline TEXT NOT NULL,
    description TEXT NOT NULL,
    stock_level INTEGER NOT NULL,
    location INTEGER NOT NULL,
    orders INTEGER,
    reviews INTEGER,
    activities INTEGER NOT NULL,
    CONSTRAINT fk_product_location FOREIGN KEY (location) REFERENCES location(id) ON DELETE SET NULL,
    CONSTRAINT fk_product_activity FOREIGN KEY (activities) REFERENCES activity(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    buyer INTEGER,
    product INTEGER,
    CONSTRAINT fk_review_buyer FOREIGN KEY (buyer) REFERENCES buyer(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_product FOREIGN KEY (product) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "order" (
    id SERIAL PRIMARY KEY,
    items INTEGER,
    buyer INTEGER,
    CONSTRAINT fk_order_buyer FOREIGN KEY (buyer) REFERENCES buyer(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_item (
    id SERIAL PRIMARY KEY,
    product INTEGER,
    "transaction" INTEGER,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_item_order FOREIGN KEY ("transaction") REFERENCES "order"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY,       -- Session ID
    sess JSON,                  -- Session data (stored as JSON for compatibility)
    expire TIMESTAMP            -- Expiry timestamp
);
