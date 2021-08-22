function dateconvert(datestring) {
  const monthmap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = datestring.slice(0, 4);
  let monthnum = parseInt(datestring.slice(5, 7), 10);
  let daynum = parseInt(datestring.slice(8), 10);

  let month = monthmap[monthnum - 1];
  let finalstring = "";

  finalstring += month.toString() + " ";
  finalstring += daynum.toString() + ",";
  finalstring += year;
  return finalstring;
}
export default dateconvert;
