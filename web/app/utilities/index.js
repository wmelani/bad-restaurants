export const approximatelyEqual = (x,y,epsilon) => {
    var variance = x > y ? x - y : y - x;
    return variance < epsilon;
};