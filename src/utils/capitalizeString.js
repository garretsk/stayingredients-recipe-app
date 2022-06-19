export default function capitalizeString(input) {
  let capitalizedString;
  let firstLetter;
  let remainder;

  if(input[0].length > 1) {
    firstLetter = input[0][0].toUpperCase();
    remainder = input[0].slice(1);
  }
  else {
    firstLetter = input[0].toUpperCase();
    remainder = input.slice(1);
  }
  
  capitalizedString = firstLetter + remainder;

  return capitalizedString;
}