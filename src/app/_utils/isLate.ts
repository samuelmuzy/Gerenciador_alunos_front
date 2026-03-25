export function isLate(date?: Date | string) {
    if (!date) return false
    return new Date(date) < new Date()
}