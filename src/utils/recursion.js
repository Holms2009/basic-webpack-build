function recursive(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') recursive(obj[key]);

    if (!obj.length) {
      obj[key.toUpperCase()] = obj[key];
      delete obj[key];
    }
  }

  return obj;
}

export default recursive;