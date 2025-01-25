import { Dayjs } from "dayjs";

export const DateToStringDate = (date: Dayjs) => {
    return date.format("DD-MM-YYYY");
};

export const KWHDecimals = 4;
export const EurosDecimals = 2;
export const EurosKWHDecimals = 6;