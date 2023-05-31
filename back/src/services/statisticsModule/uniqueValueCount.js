const generateTable = (array, threshold, name) => {
    // Step 1: Create an empty object
    const counts = {};

    // Step 2: Iterate through each element
    array.forEach(value => {
        // Step 3: Check if lower casing and splitting is necessary
        const processedValue =
            name === 'skills'
                ? value
                    .toLowerCase()
                    .replace(/\s/g, '') // Remove spaces
                    .split('/') // Split by " / "
                    .flatMap(item => item.split('+')) // Split by " + "
                : [value];

        // Step 4: Iterate through processed values
        processedValue.forEach(processed => {
            // Step 5: Check if value exists in the object
            if (counts.hasOwnProperty(processed)) {
                // Increment count by 1
                counts[processed]++;
            } else {
                // Add value to object with initial count of 1
                counts[processed] = 1;
            }
        });
    });

    // Step 6: Filter out values with count less than threshold
    const filteredValues = Object.entries(counts)
        .filter(([value, count]) => count >= threshold)
        .map(([value, count]) => ({ value, count }));

    // Step 7: Sort values based on counts in descending order
    filteredValues.sort((a, b) => b.count - a.count);

    // Step 8: Generate the table
    const table = [];

    filteredValues.forEach((val) => {
        table.push({ value: val.value, count: val.count })
    })

    return table;
}

module.exports = { generateTable }