export const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const slice = (items: any[], start: any, end: any) => {
  return items.slice(start, end);
};

export function paginate(items: any[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  let endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
}
