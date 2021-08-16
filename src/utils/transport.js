const CHORDS_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ALTERATION_SIGNS = ['#', 'b'];
let TONALITIES = [];
CHORDS_LIST.forEach((c) => {
  TONALITIES.push(c);
  ALTERATION_SIGNS.forEach((a) => TONALITIES.push(c + a));
});

console.log('TONALITIES', TONALITIES);
