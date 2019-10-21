const fs = require('fs');
const pool = require('../dbPool');
const services = require(`${__dirname}/../../microServices/imageService.js`);

const RATIO_BLUR = 0.02;

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

const baseSearch = async (conditionSql, connection) => {
  let msg = 'success';
  let sql = `select path as n, width as w, height as h, aspect_ratio, like_num, dislike_num, key_word, create_time, update_time from pic_info`;
  sql += ' ' + conditionSql + ';';
  let conn;
  try {
    conn = connection || await pool.getConnection();
    const rows = await conn.query(sql);
    console.log(`sql: ${sql}`);
    console.log(`query rows: ${rows.length}.`);
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

exports.searchDb = (q) => {
  const conditions = [];
  if (q.conditionType === 'pixel') {
    if (q.w) conditions.push(`width = ${Number.parseInt(q.w, 0)}`);
    if (q.h) conditions.push(`height = ${Number.parseInt(q.h, 0)}`);
  } else if (q.rw && q.rh) {
    const ratio = (Number.parseInt(q.rw, 0) / Number.parseInt(q.rh, 0)).toFixed(2);
    conditions.push(`(${ratio} - ${RATIO_BLUR}) <= aspect_ratio and aspect_ratio <= (${ratio} + ${RATIO_BLUR})`);
  }
  let cSql = '';
  if (conditions.length !== 0) {
    cSql = 'where ' + conditions.join(' and ');
  }
  return baseSearch(cSql);
};

exports.searchDbByInputSql = (inputSql) => baseSearch(inputSql);

exports.searchDbByRandom = async (limit = 2) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('select min(id) as min,max(id) as max from pic_info;');
    const [{ min, max }] = rows;
    if (max - min + 1 < limit) {
      return baseSearch('', conn);
    }
    const end = max - limit;
    const idIndex = parseInt(Math.random() * (end - min + 1) + min, 10);
    return baseSearch(`where ${idIndex} < id and id < ${idIndex + limit}`, conn);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};
