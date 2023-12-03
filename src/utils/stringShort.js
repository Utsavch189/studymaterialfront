function Shortner(string, n) {
    if (string.length > n) {
        string = string.substring(0, n - 1) + "...";
    }
    return string
}
export default Shortner