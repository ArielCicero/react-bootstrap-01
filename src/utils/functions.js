import _ from "lodash";

export function paginate(items, pageSize, currentPage) {
  const pages = _.chunk(items, pageSize);

  let page = !pages[currentPage - 1]
    ? pages[currentPage - 2]
    : pages[currentPage - 1];
  return page;
  //return _.chunk(items, pageSize)[currentPage - 1];
}

export function paginate2(items, pageSize, currentPage) {
  const startIndex = (currentPage - 1) * pageSize;

  //   let temp = _.slice(items, startIndex);
  //   temp = _.take(items, pageSize);

  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
