type Only<T, K extends keyof T> = {
  [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]?: never;
};

export type ExactlyOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]: Only<T, K>;
}[Keys];
