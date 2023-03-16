let a = `Y ABC  JKL Y\\n11CCC==CCC11\\n12CCC==XCC21\\n13***==.**31\\n14***==***41\\n15***==***51\\n16*CC==**.61\\n17CCCE=CCC71\\n18***==***81\\n19***==***91\\n20***==C**02\\n21.**==***12\\n22***==***22\\n23***==***32\\n24***==***42\\n25***==***52\\n26.**==***62\\n27***==***72\\n28***==***82\\n29***==C**92\\n30**==**==**03\\n%`;

let b = a.split("\\n");

function rule(value) {
  let data = [];
  for (let key in value) {
    if (value[key] === "C") {
      data.push({ type: "close" });
    } else if (value[key] === "*" || value[key] === "." || value[key] === "x") {
      data.push({ type: "reservable" });
    } else if (value[key] === "=" || value[key] === "E") {
      if (data[data.length - 1].type !== "walk") {
        data.push({ type: "walk" });
      }
    }
  }
  return data;
}
let c = b.map((item, index) => {
  if (index === 0) {
    return item.replace(/Y/g, "").trim().replace("  ", " ");
  } else {
    let test = item.replace(/\d/g, "");
    return rule(test);
  }
});
console.log(c);

let d = c[0];

// for (let key in d) {
//   console.log(d[key], "key");
// }
