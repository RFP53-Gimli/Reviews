CREATE TABLE products (
  id INT PRIMARY KEY NOT NULL,
  name TEXT
);

CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL,
  rating INT,
  summary CHAR(50),
  body CHAR(1000),
  recommended Boolean,
  response CHAR(50),
  date TIMESTAMP,
  reviewer CHAR(50),
  reviewer_email CHAR(50),
  helpfulnes INT NOT NULL,
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES products(id)

);
CREATE INDEX review_helpfulnes ON reviews(helpfulnes);

CREATE TABLE photos (
  id INT PRIMARY KEY NOT NULL,
  url text,
  review_id INT,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id INT PRIMARY KEY NOT NULL,
  product_id INT,
  review_id INT,
  size INT,
  width INT,
  comfort INT,
  quality INT,
  length INT,
  fit INT,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
)