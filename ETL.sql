-- Converts the CSV files to data that can be added to Postgres
-- COPY products(id, name) FROM '/Users/derekmalone/temp/gimli/Reviews/data/Test/product.csv' DELIMITER ',' CSV HEADER;

COPY reviews(id, product_id, rating, date, summary, body, recommended, reported, reviewer, reviewer_email, response, helpfulnes) FROM '/Users/derekmalone/temp/gimli/Reviews/data/Test/reviews.csv' DELIMITER ',' CSV HEADER;

COPY photos(id, review_id, url) FROM '/Users/derekmalone/temp/gimli/Reviews/data/Test/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY characteristics(id, product_id, name) FROM '/Users/derekmalone/temp/gimli/Reviews/data/Test/characteristics.csv' DELIMITER ',' CSV HEADER;

COPY characteristics_reviews(id, characteristics_id, review_id, value) FROM '/Users/derekmalone/temp/gimli/Reviews/data/Test/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;


-- COPY photos(id, review_id, url) FROM '/Users/derekmalone/temp/gimli/Reviews/data/Test/reviews_photos.csv' DELIMITER ',' CSV HEADER
-- photos works out of the box

-- charateristics (id, product_id, name)

-- char _ reviews (id char_id, review_id, value)
--
-- reviews should work out of the box
--COPY reviews FROM 'Users/Downloads'
-- save a table that is the join ofm