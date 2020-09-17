/* START - SORT ITEMS FUNCTION */

const sortItems = function (list, sortBy) {
  if (sortBy === "byCreated") {
    return list.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      } else if (a.createdAt > b.createdAt) {
        return 1;
      } else return 0;
    });
  } else if (sortBy === "byAlphabetical") {
    return list.sort((a, b) => {
      if (a.itemText.toLowerCase() < b.itemText.toLowerCase()) {
        return -1;
      } else if (a.itemText.toLowerCase() > b.itemText.toLowerCase()) {
        return 1;
      } else return 0;
    });
  } else if (sortBy === "byCompleted") {
    return list.sort((a, b) => {
      if (Number(a.completed) < Number(b.completed)) {
        return 1;
      } else if (Number(a.completed) > Number(b.completed)) {
        return -1;
      } else return 0;
    });
  } else if (sortBy === "byUncompleted") {
    return list.sort((a, b) => {
      if (Number(a.completed) < Number(b.completed)) {
        return -1;
      } else if (Number(a.completed) > Number(b.completed)) {
        return 1;
      } else return 0;
    });
  }
  return list;
};

/* END - SORT ITEMS FUNCTION */

export { sortItems as default };
