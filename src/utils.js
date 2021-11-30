function getValueInObject(sourceObject, pathToValue) {
  const pathSteps = pathToValue
    .replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
    .replace(/^\./, "") // strip a leading dot
    .split(".");

  const valueInObject = pathSteps.reduce((object, property) => {
    if (object.hasOwnProperty(property)) {
      return object[property];
    } else {
      throw new Error(
        `The path "${pathToValue}" doesn't exist in the source object. Either the path or the source object passed as a parameter in the function is incorrect.`
      );
    }
  }, sourceObject);

  return valueInObject;
}

export { getValueInObject };
