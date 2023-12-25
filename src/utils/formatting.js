export const convertDateFormat = (inputDateString) => {
  var parts = inputDateString.split(" ");
  var day = parseInt(parts[0], 10);
  var monthAbbreviation = parts[1];
  var year = parseInt(parts[2], 10);

  var monthAbbreviations = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  var month = monthAbbreviations.indexOf(monthAbbreviation) + 1;

  var dateObject = new Date(year, month - 1, day);

  // Format the date as "DD/MM/YYYY"
  var formattedDate = dateObject.toLocaleDateString("en-GB");

  return formattedDate;
}
