CREATE TABLE product (
  id int primary key,
  campus varchar(10),
  name varchar(80),
  slogan varchar,
  description varchar,
  category varchar(80),
  default_price int
);
CREATE TABLE features (
  id int primary key,
  product_id int references product(id),
  feature varchar(80),
  value varchar(80)
);
CREATE TABLE styles (
  id int primary key,
  product_id int references product(id),
  name varchar(80),
  sale_price int,
  original_price int,
  "default?" boolean
);
CREATE TABLE related (
  id int primary key,
  current_product_id int references product(id),
  related_product_id int references product(id)
);
CREATE TABLE photos (
  id int primary key,
  styleId int references styles(id),
  url text,
  thumbnail_url text
);
CREATE TABLE skus (
  id int primary key,
  styleId int references styles(id),
  size varchar(15),
  quantity smallint
);
COPY product FROM '/home/waterlinx/hackreactor/RFP2307/SDC/product.csv' (DELIMITER ',', FORMAT csv, HEADER);
COPY features FROM '/home/waterlinx/hackreactor/RFP2307/SDC/styles.csv' (DELIMITER ',', FORMAT csv, HEADER);
COPY styles FROM '/home/waterlinx/hackreactor/RFP2307/SDC/styles.csv' (DELIMITER ',', FORMAT csv, HEADER, NULL "NULL");
COPY related FROM '/home/waterlinx/hackreactor/RFP2307/SDC/related.csv' (DELIMITER ',', FORMAT csv, HEADER, NULL 0);
COPY photos FROM '/home/waterlinx/hackreactor/RFP2307/SDC/photos.csv' (DELIMITER ',', FORMAT csv, HEADER);
COPY skus FROM '/home/waterlinx/hackreactor/RFP2307/SDC/skus.csv' (DELIMITER ',', FORMAT csv, HEADER);
CREATE INDEX idx_current_product_id ON related (current_product_id);
CREATE INDEX idx_related_product_id ON related (related_product_id);
CREATE INDEX idx_skus_style_id ON skus (styleId);
CREATE INDEX idx_photos_style_id ON photos (styleId);
CREATE INDEX idx_photos_url ON photos (url);
CREATE INDEX idx_photos_thumbnail_url ON photos (thumbnail_url);
