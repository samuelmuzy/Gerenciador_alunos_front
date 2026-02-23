export const FormatDate = (dataISO: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    return new Date(dataISO).toLocaleDateString("pt-BR", options);
};