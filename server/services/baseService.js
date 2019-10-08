const fs = require('fs');
const pool = require('../dbPool');
const services = require(`${__dirname}/../../microServices/imageService.js`);

exports.getImage = (fileName) => {
  return new Promise((resolve, reject) => {
    if (!fileName) return;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.search = services.search;

exports.searchDb = async (q) => {
  let msg = '';
  let sql = `select path as n, width as w, height as h, aspect_ratio, like_num, dislike_num, key_word, create_time, update_time from pic_info`;
  const conditions = [];
  if (q.conditionType === 'pixel') {
    if (q.w) conditions.push(`width = ${Number.parseInt(q.w, 0)}`);
    if (q.h) conditions.push(`height = ${Number.parseInt(q.h, 0)}`);
  } else if (q.rw && q.rh) {
    const ratio = (Number.parseInt(q.rw, 0) / Number.parseInt(q.rh, 0)).toFixed(2);
    conditions.push(`(${ratio} - 0.02) <= aspect_ratio and aspect_ratio <= (${ratio} + 0.02)`);
  }
  if (conditions.length === 0) {
    sql += ' limit 100;';
    msg = '没有搜索条件最多显示100张';
  } else {
    sql += ' where ' + conditions.join(' and ') + ';';
  }
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sql);
    console.log(`query rows: ${rows.length}.`);
    console.log(`sql: ${sql}`);
    return {
      images: rows,
      msg,
    };
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};
