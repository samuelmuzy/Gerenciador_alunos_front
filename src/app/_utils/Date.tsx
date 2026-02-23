export function toISODateTime(dateString: string): string {
    return new Date(dateString).toISOString()
  }