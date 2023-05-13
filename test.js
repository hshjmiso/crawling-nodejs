const JsDiff = require('diff');

const str1 = "The quick brown fox";
const str2 = "The slow red fox";

const diff = JsDiff.diffWords(str1, str2);

diff.forEach((part) => {
    console.log(part);
    const color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
    console.log(`%c${part.value}`, `color: ${color}`);
});