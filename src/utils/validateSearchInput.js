export default function validateSearchInput(query) {
  if(0 === query.length) {
    return false;
  }
  else {
    for(let i = 0; i < query.length; ++i) {
      if(" " !== query.charAt(i)) {
        return true;
      }
    }
    return false;
  }
}