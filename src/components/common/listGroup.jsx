import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  onItemSelect,
  textProperty,
  valueProperty,
  cssClasses
}) => {
  return (
    <ul className={`listg-roup ${cssClasses}`}>
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem && item[textProperty] === selectedItem.name
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
  cssClasses: ""
};

export default ListGroup;
