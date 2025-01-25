import { ResponseAPI } from '@/model/Response';
import dayjs, { Dayjs } from 'dayjs';
import Request, { ResponseMessage } from '@/service/Request';
import { REEModel, REEPrices } from '@/model/REEModel';
import { KWHDecimals } from '@/model/consts';
import { RoundNumber } from '@/lib/NumericUtils';


export default async function getPriceByday({ date }: { date: Dayjs }): Promise<ResponseAPI> {
    if (!date) {
        return {
            ok: false,
            code: 'U001',
        }
    }

    const responseREE = await Request({
        url: 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real',
        params: {
            'end_date': date.endOf('day').format('YYYY-MM-DDTHH:mm'),
            'start_date': date.startOf('day').format('YYYY-MM-DDTHH:mm'),
            'time_trunc': 'hour'
        }
    })

    try {
        if (!responseREE.ok) {
            return {
                ok: false,
                code: 'E001',
            }
        }

        const parsedResponse: REEModel | null = parseREERequest(responseREE)

        if (!parsedResponse) {
            return {
                ok: false,
                code: 'I001',
            }
        }


        return {
            ok: true,
            element: parsedResponse
        }


    } catch (error) {
        console.error(error)
        return {
            ok: false,
            code: 'I001',
        }
    }
}

//Parse the response from REE to the model REEModel
export function parseREERequest(ResponseMessage: ResponseMessage): REEModel | null {
    //Buscanos del array included: response.included.type == 'PVPC'

    const response = ResponseMessage.body as any;

    const PVPCPrice = response.included.find((element: any) => element.type === 'PVPC')
    if (!PVPCPrice) return null

    const values = PVPCPrice.attributes.values as any[]

    const prices: REEPrices[] = [];
    values.forEach((value) => {
        prices.push({
            hour: dayjs(value.datetime).hour(),
            price: RoundNumber({
                num: value.value / 1000, decimals: KWHDecimals
            }),
            type: 'avg'
        })
    })

    let pricesCopy = prices.map((price) => price.price);
    pricesCopy.sort((a, b) => a - b);
    const minPrices = pricesCopy.slice(0, Math.floor(pricesCopy.length * 0.1));
    const maxPrices = pricesCopy.slice(Math.floor(pricesCopy.length * 0.9));

    prices.forEach((price) => {
        if (minPrices.includes(price.price)) {
            price.type = 'min';
        } else if (maxPrices.includes(price.price)) {
            price.type = 'max';
        }
    })

    return {
        prices,
        maxPrice: prices.reduce((min, current) => {
            return current.price < min.price ? current : min;
        }),
        minPrice: prices.reduce((min, current) => {
            return current.price < min.price ? current : min;
        }),
        avgPrice: {
            price: RoundNumber({
                num: (prices.reduce((acc, price) => acc + price.price, 0) / prices.length),
                decimals: KWHDecimals
            }),
            hour: 0,
            type: 'avg'
        }
    }

    return null;
}

