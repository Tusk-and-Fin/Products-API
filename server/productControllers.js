db = require('../database/db.js');
var url = require('url');
const get = (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  console.log(req.path.split('/')[3]);

  req.path.split('/')[3] ?
  db.query(`SELECT ${req.path.split('/')[3] === 'related' ?
  'related_product_id' :
  '*'} from "${req.path.split('/')[3]}" WHERE ${req.path.split('/')[3] === 'related' ?
  'current_' :
  ''}product_id = ${req.path.split('/')[2]}`)
  .then((data) => {if(req.path.split('/')[3] === 'related'){for(var i = 0; i < data.rows.length; i++) {data.rows[i] = data.rows[i].related_product_id}}
return data})
  .then((data) => res.send(data.rows)).catch((err) => console.log(err)) :
  db.query(`SELECT * from "product" ${req.path.split('/')[2] ?
  'WHERE id = '+ req.path.split('/')[2] :
  'LIMIT ' + count}`)
  .then((data) => res.send(data.rows))
  .catch((err) => console.log(err));
}

module.exports = {get};