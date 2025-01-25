import { text } from "stream/consumers";

export interface REEModel {
    prices: REEPrices[];
    maxPrice: REEPrices;
    minPrice: REEPrices;
    avgPrice: REEPrices;
}

export const TypePricesEnum = {
    min: {
        text: 'Precio mínimo',
        bgcolor: 'bg-green-300',
        textcolor: 'text-green-500'
    },
    max: {
        text: 'Precio máximo',
        bgcolor: 'bg-red-400',
        textcolor: 'text-red-500'
    },
    avg: {
        text: 'Precio medio',
        bgcolor: 'bg-slate-200',
        textcolor: 'text-gray-500'
    }
}


export type TypePrice = keyof typeof TypePricesEnum;
export interface REEPrices {
    price: number;
    hour: number;
    type: TypePrice;
}