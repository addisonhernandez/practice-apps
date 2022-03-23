const titleCase = function (str) {
  if (!str || !str.length) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

module.exports = { titleCase };
