-- CREATE TABLE products (
--   id INT PRIMARY KEY NOT NULL,
--   name TEXT
-- );
-- DROP table if exists characteristics_reviews, characteristics, photos, reviews;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
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
CREATE INDEX review_prodID ON reviews(product_id);
CREATE INDEX review_recent ON reviews(date);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT,
  url text,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);
CREATE INDEX photos_reviewId ON photos(review_id);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
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
--CREATE INDEX chr_product ON characteristics(product_id);

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristics_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);
-- CREATE INDEX chr_product ON characteristics_reviews(product_id)
-- what the view needs to save:
  -- columns: id, product_id, 1, 2, 3, 4, 5 starts
CREATE MATERIALIZED VIEW review_ratings AS
  select
    product_id,
    rating,
    count(rating )
  from reviews
  group by
    product_id,
    rating
;
CREATE INDEX reviewratings_product ON review_ratings(product_id);

CREATE MATERIALIZED VIEW average_characteristics AS
  select
    c.product_id,
    c.name,
    AVG(cr.value)
  from characteristics c
  join  characteristics_reviews cr
  on c.id = cr.characteristics_id
  group by
    c.product_id,
    c.name
;
CREATE INDEX chr_product ON average_characteristics(product_id);
-- need materialized view to give a average for each characteristic