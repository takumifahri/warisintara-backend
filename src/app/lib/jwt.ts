
const jwtBlacklist = new Set<string>();
export function addToBlacklist(token: string) {
    jwtBlacklist.add(token);
}

export function isBlacklisted(token: string): boolean {
    return jwtBlacklist.has(token);
}