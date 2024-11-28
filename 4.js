function promiseAllSettled(value) {
  const values = Array.isArray(value) ? value : [];
  if (values.length === 0) {
    throw new Error("promiseAll is not empty");
  }
  const result = [];
  let length = values.length;
  return new Promise((resolve, reject) => {
    values.forEach((item, index) => {
      if (item && typeof item.then === "function") {
        item.then(
          (res) => {
            result.push(res);
            length--;
            if (length === 0) resolve(result);
          },
          (err) => {
            result.push(err);
            length--;
            if (length === 0) resolve(result);
          }
        );
      } else {
        result.push(item);
        length--;
        if (length === 0) resolve(result);
      }
    });
  });
}
