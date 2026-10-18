const _NUMBER = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

export const fmt = (n: number) => _NUMBER.format(n);
export const parseNumber = (input: string) =>
  input.trim() === "" ? Number.NaN : Number(input.replace(",", "."));
