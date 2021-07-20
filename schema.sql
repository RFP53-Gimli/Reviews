
-- DROP table if exists characteristics_reviews, characteristics, photos, reviews;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  date BIGINT,
  summary VARCHAR(1000),
  body VARCHAR(1000),
  recommended Boolean,
  reported Boolean,
  reviewer VARCHAR(50),
  reviewer_email VARCHAR(50),
  response VARCHAR(1000),
  helpfulness INT NOT NULL
);
CREATE INDEX review_helpfulnes ON reviews(helpfulness);
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
  name VARCHAR(10)
);
CREATE INDEX characteristics_prod ON characteristics(product_id);

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristics_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);
CREATE INDEX chr_review_char ON characteristics_reviews(characteristics_id);
