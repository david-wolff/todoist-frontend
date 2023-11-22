
export const parse = (x: string | string[]) => {
    if (typeof x === 'string') return x
    else return x[0]
}