CREATE TABLE product (
  id int primary key,
  campus varchar(10),
  name varchar(80),
  slogan varchar,
  description varchar,
  category varchar(80),
  default_price int,
  created_at timestamp,
  updated_at timestamp
);
CREATE TABLE features (
  id int primary key references products(id),
  feature varchar(80),
  value varchar(80),
);
CREATE TABLE styles (
  style_id int primary key,
  product_id int references products(id),
  name varchar(80),
  original_price int,
  sale_price int,
  default boolean
);
CREATE TABLE related (
  product_id int primary key references products(id),
  related integer[]
);
CREATE TABLE photos (
  style_id int primary key references styles(style_id),
  urls varchar(200)[][]
);
CREATE TABLE skus (
  sku int primary key,
  style_id int references styles(style_id),
  size varchar(5),
  quantity int
);