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
  let sql = `select id, path as n, width as w, height as h, aspect_ratio, like_num, dislike_num, keyword, create_time, update_time from pic_info`;
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
    const rows = await conn.query('select id from pic_info where dislike_num < 2;');
    if (rows.length < limit) {
      return baseSearch('where dislike_num < 2', conn);
    }
    const ids = new Set();
    while (ids.size < limit) {
      const randomIndex = parseInt(Math.random() * rows.length, 10);
      ids.add(rows[randomIndex].id);
    }
    const sql = `where id in (${Array.from(ids).join(',')})`;
    return baseSearch(sql, conn);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

exports.likeOrDislike = async ({ id, flag }) => {
  let word = flag === 1 ? 'like_num = like_num' : 'dislike_num = dislike_num';
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`update pic_info set ${word} + 1 where id = ${id};`);
    console.log(id, rows, flag === 1 ? 'like+1' : 'dislike+1');
    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

exports.getFolder = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('select id, path, cover, pages, like_num, dislike_num, keyword, create_time, update_time from folder;');
    console.log(`query rows: ${rows.length}.`);
    return { folders: rows };
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

exports.getFolderPics = async ({ id }) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`select id, path from folder_pic where folder_id = ${id};`);
    return { images: rows };
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

exports.setFolderKeyword = async ({ id, keyword }) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`update folder set keyword = '${keyword}' where id = ${id};`);
    console.log(id, rows, `update keyword: ${keyword}`);
    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};
