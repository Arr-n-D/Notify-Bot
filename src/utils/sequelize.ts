export function resultsToAssociativeArray<T>(key: string, results: any[]) {
  const dataValues = results.map((result) => result.dataValues);

  // create a new array that will hold our results

  const associativeArray: { [key: string]: T[] } = {};

  // check if key exists in dataValues
  // if it does, add it to the associative array
  // if it doesn't, add it to the associative array with a null value

  // for i loop over the dataValues array
 for (let i = 0; i < dataValues.length; i++) {
    if (dataValues[i][key]) {
        if(associativeArray[dataValues[i][key]] && Array.isArray(associativeArray[dataValues[i][key]])) {
            associativeArray[dataValues[i][key]]?.push(dataValues[i])
        } else {
            associativeArray[dataValues[i][key]] = [dataValues[i]]
        }
    }
}
  //   dataValues.forEach((dataValue) => {
  //     if (dataValue[key]) {
  //       associativeArray[dataValue[key]] = dataValue as T;
  //     }
  //   });

  console.log(associativeArray);
}
