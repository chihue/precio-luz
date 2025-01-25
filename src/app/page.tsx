import { Suspense } from "react";
import './globals.css'
import DateSelector from "@/components/ElectricityPrice/DateSelector";
import dayjs, { Dayjs } from "dayjs";
import EnergyPrice from "@/components/ElectricityPrice/ElectricityPrice";

export default async function Home({ searchParams }: { searchParams: any }) {
  const { day } = await searchParams as any;
  const date = getDaySearchParams(day)


  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Precio de la luz por horas en España</h1>
      <DateSelector date={date.toDate()} />
      <Suspense fallback={<div>Loading...</div>}>
        <EnergyPrice date={date} />
      </Suspense>
    </div>
  );
}


const getDaySearchParams = (day: any): Dayjs => {
  let date = null;
  if (day && dayjs(day).isValid()) {
    date = dayjs(day);
  } else {
    date = dayjs();
  }

  return date;
}