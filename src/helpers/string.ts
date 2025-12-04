export const toNumber = (input?: string) => {
    if (!input) return 0;
    return Number.isNaN(Number.parseInt(input)) ? 0 : Number.parseInt(input);
};

export const roundNumber = (input: string | number, round: number) => {
    if (typeof input == "string") {
        return parseFloat(input).toFixed(round);
    }
    return input.toFixed(round);
};

export const printData = (data: any) => {
    return JSON.stringify(data, null, 4);
};
