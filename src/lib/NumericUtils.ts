export function RoundNumber({ num, decimals = 0 }: { num: any, decimals?: number }): number {
    if (!num || num instanceof Number) num = 0;

    return Number(Math.round(Number(num + 'e' + decimals)) + 'e-' + decimals);
}

export function FormatHour(hour: number): string {
    return PaddingZeros(hour, 2) + ":00";
}

export function PaddingZeros(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}