/**
 * Check the giving string is a valid identity card number or not.
 * Refer: https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81
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
