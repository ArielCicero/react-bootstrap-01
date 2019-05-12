import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    // let content = _.get(item, column.path);
    // if (!content) content = item[column.content];
    return column.content ? column.content(item) : _.get(item, column.path);
  };
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map((column, index) => (
            <td key={index}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
