-- CREATE TABLE products (
--   id INT PRIMARY KEY NOT NULL,
--   name TEXT
-- );
-- DROP table if exists characteristics_reviews, characteristics, photos, reviews;
CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL,
  product_id INT,
  rating INT,
  date BIGINT,
  summary CHAR(1000),
  body CHAR(1000),
  recommended Boolean,
  reported Boolean,
  reviewer CHAR(50),
  reviewer_email CHAR(50),
  response CHAR(1000),
  helpfulnes INT NOT NULL
  -- FOREIGN KEY (product_id) REFERENCES products(id)

);
CREATE INDEX review_helpfulnes ON reviews(helpfulnes);

CREATE TABLE photos (
  id INT PRIMARY KEY NOT NULL,
  review_id INT,
  url text,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id INT PRIMARY KEY NOT NULL,
  product_id INT,
  name CHAR(10)
  -- review_id INT,
  -- size INT,
  -- width INT,
  -- comfort INT,
  -- quality INT,
  -- length INT,
  -- fit INT,
  -- FOREIGN KEY (product_id) REFERENCES products(id)
  -- FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics_reviews (
  id INT PRIMARY KEY NOT NULL,
  characteristics_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);