PRAGMA foreign_keys = ON;

-- Create tables

CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS buyer (
    id INTEGER PRIMARY KEY,
    location INTEGER,
    transactions INTEGER,
    reviews INTEGER,
    CONSTRAINT fk_buyer_location FOREIGN KEY (location) REFERENCES location(id)
);

-- DROP TABLE IF EXISTS location;

CREATE TABLE IF NOT EXISTS location (
    id INTEGER PRIMARY KEY,
    country TEXT
);

CREATE TABLE IF NOT EXISTS review (
    id INTEGER PRIMARY KEY,
    buyer INTEGER,
    product INTEGER,
    CONSTRAINT fk_review_buyer FOREIGN KEY (buyer) REFERENCES buyer(id),
    CONSTRAINT fk_review_product FOREIGN KEY (product) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS "order" (
    id INTEGER PRIMARY KEY,
    items INTEGER,
    buyer INTEGER,
    CONSTRAINT fk_order_buyer FOREIGN KEY (buyer) REFERENCES buyer(id)
);

CREATE TABLE IF NOT EXISTS order_item (
    id INTEGER PRIMARY KEY,
    product INTEGER,
    "transaction" INTEGER,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product) REFERENCES product(id),
    CONSTRAINT fk_order_item_order FOREIGN KEY ("transaction") REFERENCES "order"(id)
);

-- DROP TABLE IF EXISTS dummytable;

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    photo_link TEXT UNIQUE,
    strapline TEXT NOT NULL,
    description TEXT NOT NULL,
    stock_level INTEGER NOT NULL,
    location INTEGER NOT NULL,
    orders INTEGER,
    reviews INTEGER,
    activities INTEGER NOT NULL,
    CONSTRAINT fk_product_location FOREIGN KEY (location) REFERENCES location(id),
    CONSTRAINT fk_product_activity FOREIGN KEY (activities) REFERENCES activity(id)
);
-- WHEN "CREATE TABLE" IS FILLED, JUST RUN THE COMMAND: ts-node src/models/dbInit.ts AND EVERYTHING TABLES will be created