type CustomRange = [number, number]; // Represents a CustomRange as a tuple of [min, max]

function coversCustomRange(desiredRange: CustomRange, ranges: CustomRange[]): boolean {
    const [desiredMin, desiredMax] = desiredRange;
    let currentMax = desiredMin;

    // Sorting Ranges by their minimum value
    const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

    for (const [rMin, rMax] of sortedRanges) {
        if (rMin <= currentMax) {
            currentMax = Math.max(currentMax, rMax);
        } else {
            // There's a gap, so the desired Range is not covered so returning false
            return false;
        }

        if (currentMax >= desiredMax) {
            return true;
        }
    }

    return currentMax >= desiredMax;
}

function canConstructSoftwareCamera(
    softwareCustomRangeDistance: CustomRange,
    softwareCustomRangeLight: CustomRange,
    hardwareCameras: { distanceRange: CustomRange; lightRange: CustomRange }[]
): boolean {
    // Extracting distance and light Ranges from hardware cameras
    const distanceRanges = hardwareCameras.map(camera => camera.distanceRange);
    const lightRanges = hardwareCameras.map(camera => camera.lightRange);

    // Checking if both CustomRanges are covered
    return (
        coversCustomRange(softwareCustomRangeDistance, distanceRanges) &&
        coversCustomRange(softwareCustomRangeLight, lightRanges)
    );
}

// Example:
const softwareRangeDistance: CustomRange = [1, 10]; // Desired subject distance Range
const softwareRangeLight: CustomRange = [100, 1000]; // Desired light level Range

const hardwareCameras:{ distanceRange: CustomRange; lightRange: CustomRange }[]  = [
  //we can add any number of camera's
    { distanceRange: [1, 4], lightRange: [100, 400] }, // Camera 1
    { distanceRange: [3, 7], lightRange: [300, 700] }, // Camera 2
    { distanceRange: [6, 10], lightRange: [600, 1000] }, // Camera 3
];

// Calling the function to check if we can construct cameras:
console.log(canConstructSoftwareCamera(softwareRangeDistance, softwareRangeLight, hardwareCameras));

// Output: true