export function capitalize(text: string) {
    const lower = text.toLowerCase();
    return text.charAt(0).toUpperCase() + lower.slice(1);
}
