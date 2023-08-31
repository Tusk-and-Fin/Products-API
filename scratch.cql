CREATE KEYSPACE sdcProducts WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor' : 3};

CREATE TABLE sdcProducts.products (
  id uuid PRIMARY KEY,
  campus text,
  name text,
  slogan text,
  description text,
  category text,
  default_price int,
  created_at timestamp,
  updated_at timestamp1 )
  WITH comment = 'Q1.  Find all products';

CREATE TABLE sdcProducts.feature_by_id (
  id uuid,
  feature text,
  value text,
  PRIMARY KEY (id) )
  WITH comment = 'Q2.  Find feature by id'

CREATE TABLE sdcProducts.style_by_product_id (
  product_id uuid,
  style_id uuid,
  name text,
  original_price int,
  sale_price int,
  default? boolean
  PRIMARY KEY ((product_id), style_id) )
  WITH comment = 'Q3.  Find style by product id';

CREATE TABLE sdcProducts.photos_by_style_id (
  style_id uuid,
  url text,
  thumbnail_url text,
  PRIMARY KEY (style_id) )
  WITH comment 'Q4.  Find photos by style id';

CREATE TABLE sdcProducts.skus_by_style_id (
  style_id uuid,
  sku uuid,
  size text,
  quantity smallint,
  PRIMARY KEY ((style_id), sku) )
  WITH comment 'Q5.  Find skus by style id';