export const FormatDate = (dataISO: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    return new Date(dataISO).toLocaleDateString("pt-BR", options);
};



export function formatDateShort(date: Date | string) {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "2-digit",
    })
}


export function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "short", year: "numeric",
    })
  }