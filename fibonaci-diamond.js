const diamondWidth = 3; // Number of elements in diamond center row
generateDiamond(diamondWidth);

function generateDiamond (diamondWidth) {
    
    if (diamondWidth % 2 === 0) {
        throw new Error('diamondWidth has to be an odd number');
    }
    
    const numberOfRows = numberOfColumns = (2 * diamondWidth) - 1;
    
    const sizeOfFibonacciSeries = getSizeOfFibonacciSeries(diamondWidth);
    const fibonacciSeriesValues = generateFibanacciSeries(sizeOfFibonacciSeries);
    
    const rowShiftValue = columnShiftValue = (numberOfRows - 1) / 2;

    for (let row = numberOfRows - 1; row >= 0; row--) {
        let rowString = '';
        const verticalDistance = Math.abs(row - rowShiftValue);
        for (let column = 0; column < numberOfColumns - verticalDistance; column++) {
            const valueToCheck = (column - verticalDistance) / 2;
            const printFibonacciNumber = valueToCheck >= 0 && valueToCheck % 1 === 0;
            rowString += (printFibonacciNumber ? fibonacciSeriesValues.shift() : ' ');
        }

        console.log(rowString);
    }
}

function getSumOfOneToN (n) {
    return (n * (n + 1)) / 2;
}

function getSizeOfFibonacciSeries (diamondWidth) {
    const sumOfOneToN = getSumOfOneToN(diamondWidth);
    return (sumOfOneToN * 2) - diamondWidth;
}

function generateFibanacciSeries (size) {
    let fibonacciSeriesValues = [];
    switch (size) {
        case 0:
            break;
        case 1:
            fibonacciSeriesValues = [0];
            break;
        case 2:
            fibonacciSeriesValues = [0, 1];
            break;
        default:
            fibonacciSeriesValues = [0, 1];
            for (let index = 2; index < size; index++) {
                fibonacciSeriesValues
                    .push(
                        fibonacciSeriesValues[index - 1] + fibonacciSeriesValues[index - 2]
                    );    
            }
    }
    return fibonacciSeriesValues;
}