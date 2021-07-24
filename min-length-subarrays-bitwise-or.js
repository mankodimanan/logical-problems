//#region Problem Statement
/*
 * You are given an array A of length N and an integer X.
 * You need to find all the subarrays of minimum length with BITWISE OR >= (greater than or equal to) X.
*/
//#endregion

//#region Input
/*
 * The first line of input contains an integer T, the number of test cases.
 * The following lines describe the test cases.
 * The first line of each test case contains N and X.
 * Second line of each test case contains N space separated integers.
 * Each representing elements of array A.
*/
//#endregion

//#region Output
/* 
 * For each test case, in first line print count of such subarrays (Let it be C).
 * In next C lines print all the subarrays (in sorted order).
 * (Note :- A subarray can be defined by 2 indexes L and R where L and R are staring and ending indexes of that subarray)
*/
//#endregion

//#region Constraints
/* 
 * 1 <= T <= 3
 * 1 <= N <= 10^5
 * 0 <= A[i] <= 10^9
 * 0 <= X <= 1073741823
*/
//#endregion

//#region Sample Input
/* 
 * 3
 * 5 7
 * 1 2 3 4 5
 * 4 15
 * 1 2 4 8
 * 4 16
 * 1 2 4 8
*/
//#endregion

//#region Sample Output
/* 
 * 1
 * 3 4
 * 1
 * 1 4
 * 0
*/
//#endregion

//#region Explanation
/* 
 * For 1st test case, 7 can be achieved by 3 or 4
 * For 2nd test case, value greater than or equal to is 15 is only possible if we take Or of complete array
 * For 3rd test case, Or of complete array is less than X, so no possible solution.
*/
//#endregion

function findMinLengthSubArraysWithBitWiseOrGreaterThanOrEqualToGivenNumber(
    inputArray,
    bitwiseOrGreaterThanOrEqualToNumber
) {
    let subArraysOfMinLength = [];
    const endIndexToSubArraysMap = new Map();
    let minimumSubArrayLength = inputArray.length;

    for (const [elementIndex, element] of inputArray.entries()) {
        if (element >= bitwiseOrGreaterThanOrEqualToNumber) {
            if (minimumSubArrayLength !== 1) {
                subArraysOfMinLength = [];
                minimumSubArrayLength = 1;
            }
            subArraysOfMinLength.push({
                startIndex: elementIndex,
                endIndex: elementIndex,
                bitWiseOrValue: element
            });
            continue;
        } else if (minimumSubArrayLength !== 1) {
            if (!endIndexToSubArraysMap.has(elementIndex)) {
                endIndexToSubArraysMap.set(elementIndex, []);
            }
            (endIndexToSubArraysMap.get(elementIndex - 1) || []).forEach(subArray => {
                const newSubArrayLength = subArray.length + 1;
                if (newSubArrayLength <= minimumSubArrayLength) {
                    if ((element | subArray.bitWiseOrValue) >= bitwiseOrGreaterThanOrEqualToNumber) {
                        if (newSubArrayLength < minimumSubArrayLength) {
                            subArraysOfMinLength = [];
                            minimumSubArrayLength = newSubArrayLength;
                        }
                        subArraysOfMinLength.push({
                            startIndex: subArray.startIndex,
                            endIndex: elementIndex,
                            bitWiseOrValue: element | subArray.bitWiseOrValue
                        })
                    } else {
                        endIndexToSubArraysMap.get(elementIndex).push({
                            startIndex: subArray.startIndex,
                            endIndex: elementIndex,
                            bitWiseOrValue: element | subArray.bitWiseOrValue,
                            length: (elementIndex - subArray.startIndex) + 1
                        })
                    }
                }
            })
            endIndexToSubArraysMap.get(elementIndex).push({
                startIndex: elementIndex,
                endIndex: elementIndex,
                bitWiseOrValue: element,
                length: 1
            })
        }
    }
    console.log(subArraysOfMinLength.length)
    subArraysOfMinLength.forEach(array => console.log(`${array.startIndex + 1} ${array.endIndex + 1}`))
}

findMinLengthSubArraysWithBitWiseOrGreaterThanOrEqualToGivenNumber([16, 19, 114, 8], 17)