export default function upperCardFirstChar(string) {
    if (string != undefined && string != null) {
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
}