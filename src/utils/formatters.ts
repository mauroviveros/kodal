export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  return Intl.DateTimeFormat("es-AR", options).format(date);
}
