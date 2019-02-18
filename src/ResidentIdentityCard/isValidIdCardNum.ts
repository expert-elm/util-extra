/**
 * Check the giving string is a valid identity card number or not.
 * 
 * @param idNum string to be checked.
 */

export default function isValidIdCardNum(idNum: string): boolean {
    if (idNum.length !== 18) {
        return false;
    }

    const sum = idNum
        .substr(0, 17)
        .split("")
        .map(c => parseInt(c, 10))
        .reduce((prevVal, curVal, i) => prevVal + ((1 << (17 - i)) % 11) * curVal, 0);
    
    const checksum = (12 - (sum % 11)) % 11;
    if (checksum < 10) return checksum === parseInt(idNum[17], 10);
    
    return idNum[17] === "X";
}
