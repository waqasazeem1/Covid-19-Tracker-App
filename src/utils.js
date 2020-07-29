export const sortData = (data) => {
  const sortedData = [...data];

  //   ternary operator
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  // OR sendcom=n way

  //   sortedData.sort((a, b) => {
  //     if (a.cases > b.cases) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   });
  //   return sortedData;
};
