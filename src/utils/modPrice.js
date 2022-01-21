export const modPrice = (str) => str && str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
