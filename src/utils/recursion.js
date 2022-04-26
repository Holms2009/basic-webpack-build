function recursive(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && !obj[key].length) recursive(obj[key]);
    
    obj[key.toUpperCase()] = obj[key];
    delete obj[key];
  }

  return obj;
}

export default recursive;