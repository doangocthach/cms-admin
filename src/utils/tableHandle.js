export const handleRequestSort = (event, property, orderBy, order) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

export const handleSelectAllClick = (event, array) => {
  if (event.target.checked) {
    const newSelecteds = array.map((n) => n._id);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

export const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelected(newSelected);
};

export const isSelected = (name) => selected.indexOf(name) !== -1;
