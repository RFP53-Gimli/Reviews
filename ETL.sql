-- Converts the CSV files to data that can be added to Postgres

COPY photos FROM '' DELIMITER ',' CSV HEADER;

-- photos works out of the box

-- charateristics (id, product_id, name)

-- char _ reviews (id p)

-- reviews should work out of the box