import { Dayjs } from "dayjs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import EnergyPriceTable from "./ElectricityPriceTable"
import getPriceByday from "@/service/ElectricityPriceService"
import { REEModel, TypePricesEnum } from "@/model/REEModel"
import { FormatHour } from "@/lib/NumericUtils"

export default async function Electricity({ date }: { date: Dayjs }) {
    const response = await getPriceByday({ date })

    if (!response.ok && response.element != null) {
        return <div>
            <h1>Error</h1>
            <p>Ha ocurrido un error al obtener los datos</p>
            {response?.code ? <p>Código de error: {response.code}</p> : null}
        </div>
    }

    const prices: REEModel = response.element as REEModel;

    return (
        <div>
            {/* <!-- Precio Minimo Medio y Maximo --> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Precio mínimo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-3xl font-bold  ${TypePricesEnum.min.textcolor}`}>{prices.minPrice.price} €/KWh</p>
                        <p className="text-gray-500 text-sm">{FormatHour(prices.minPrice.hour)} - {FormatHour(prices.minPrice.hour + 1)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Precio medio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-2xl font-bold  ${TypePricesEnum.avg.textcolor}`}>{prices.avgPrice.price} €/KWh</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Precio máximo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-2xl font-bold  ${TypePricesEnum.max.textcolor}`}>{prices.maxPrice.price} €/KWh</p>
                        <p className="text-gray-500 text-sm">{FormatHour(prices.maxPrice.hour)} - {FormatHour(prices.maxPrice.hour + 1)}</p>
                    </CardContent>
                </Card>
            </div>
            {/* <!-- Gráfico de evolución del precio de la luz --> */}
            {/* <EnergyPriceChart /> */}
            <EnergyPriceTable prices={prices.prices} />
        </div>
    )
}