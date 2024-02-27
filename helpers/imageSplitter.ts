// take a string and separate it by commas, trim the strings, then filter empty strings
export default (str: string): string[] => {
    return str.split(', ').map(x => x.trim()).filter(y => y ? true : false)
}