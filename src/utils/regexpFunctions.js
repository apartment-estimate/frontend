export function correctName(string) {
  return string
    .replace(/^ |^-/g, '')
    .replace(/ +/g, ' ')
    .replace(/-+/g, '-')
    .replace(/- /g, '- ')
    .replace(/[^a-zA-Zа-яА-Я -]*/g, '')
    .toLowerCase()
    .replace(/(?:^|-|\s)\S/g, (u) => {
      return u.toUpperCase();
    });
}

export function returnNumber(string) {
  return string
    .replace(/\D/ig, function(){
      let dotCount = 0;
      return function($0){
        if($0 === ',' && !dotCount) {
          dotCount += 1;
          return $0;
        }
        return '';
      };
    }());
}
