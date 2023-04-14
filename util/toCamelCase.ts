export default function toCamelCase(string: string) {
    return string

    .split(" ")
    .map((word, index) => index === 0 ? word.toLowerCase() : word)
    .join("")

    .replace("(", "").replace(")", "")
};