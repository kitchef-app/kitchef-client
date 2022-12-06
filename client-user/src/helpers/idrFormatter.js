const convertRupiah = require("rupiah-format");

//convert number
const idr = (price) => convertRupiah.convert(price);
module.exports = {
  idr,
};
