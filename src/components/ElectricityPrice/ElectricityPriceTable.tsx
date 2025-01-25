import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormatHour } from "@/lib/NumericUtils"
import { REEPrices, TypePricesEnum } from "@/model/REEModel"

export default function ElectricityPriceTable({ prices }: { prices: REEPrices[] }) {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Precios por Hora</CardTitle>
                <CardDescription>Precio de la luz por horas en España</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 grid-flow-row">
                    {prices.map((price) => (
                        <div
                            key={price.hour}
                            className={`p-4 flex items-center justify-between border rounded-lg ${TypePricesEnum[price.type].bgcolor}`}
                        >
                            <h3 className="text-lg">{FormatHour(price.hour)} - {FormatHour(price.hour + 1)}</h3>
                            <p className="text-xl font-semibold">{price.price} €/KWh</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}