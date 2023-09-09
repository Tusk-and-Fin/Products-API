db = require('../database/db.js');
var url = require('url');
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}
const get = (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  //get products
  if (req.path.split('/')[2] === undefined) {
    db.query(`SELECT * FROM product LIMIT ${count}`)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));
  } else if (req.path.split('/')[3] === undefined){
    //get product by id
    db.query(
      `SELECT
      product.id,
      product.name,
      product.slogan,
      product.description,
      product.category,
      product.default_price,
      JSON_AGG(JSON_BUILD_OBJECT('feature', features.feature, 'value', features.value))
      AS features
      FROM "product"
      JOIN features
      ON product.id = features.product_id
      WHERE product.id = ${req.path.split('/')[2]}
      GROUP BY product.id, product.name`)
      .then((data) => res.send(data.rows[0]))
      .catch((err) => console.log(err));
  } else if (req.path.split('/')[3] === 'related') {
    //get related products
      db.query(`SELECT related_product_id FROM related WHERE current_product_id = ${req.path.split('/')[2]}`)
      .then((data) => {
        for(var i = 0; i < data.rows.length; i++) {
          data.rows[i] = data.rows[i].related_product_id;
        }
      return data})
      .then((data) => res.send(data.rows))
      .catch((err) => console.log(err));
    } else if (req.path.split('/')[3] === 'styles') {
      //get styles of product
      db.query(`
      SELECT styles.id AS style_id,
      name,
      original_price,
      sale_price,
      "default?",
      (SELECT JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url))
      FROM photos
      WHERE photos.styleId = styles.id
      ) AS photos,
      JSONB_OBJECT_AGG(skus.id, JSONB_BUILD_OBJECT('size', skus.size, 'quantity', skus.quantity)) AS skus
      FROM "styles"
      JOIN photos
      ON photos.styleId = styles.id
      JOIN skus
      ON styles.id = skus.styleId
      WHERE product_id = ${req.path.split('/')[2]}
      GROUP BY styles.id, styles.name`)
      .then((data) => {
        //var results = [];
       // results.push(data.rows);
        // for (var i = 0; i < data.rows.length; i++) {
        //   results.push(data.rows[i]);
        // }
        // for (var i = 0; i < data.rows.length; i++) {
        //   data.rows[i].photos = getUniqueListBy(data.rows[i].photos, 'url');
        // }
        data.rows = {
          product_id: req.path.split('/')[2],
          results: data.rows}
        res.send(data.rows)})
      .catch((err) => console.log(err));
    }
  }


  module.exports = {get};
