'use strict';

function getSubstrings(s) {
    const list = [];
    for (var i = 0; i < s.length; i++) {
        for (var j = i + 1; j < s.length + 1; j++)        {
            const sub = s.slice(i, j);
            list.push(sub);
        }
    }
    return list;
}

function maxSubstring(s) {
    const list = getSubstrings(s);
    list.sort();
    list.reverse();
    return list[0];
}

const substr = process.argv.slice(2).join(' ');
if (substr) {
  console.log(`Find largest substring for ${substr}`);
  const result = maxSubstring(substr);
  console.log(result);
} else {
  console.log("enter part of a title");
}

