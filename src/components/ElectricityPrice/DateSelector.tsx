"use client"

import { format, addDays, isBefore, isAfter } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function DateSelector({ date }: { date: Date }) {
    const router = useRouter()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    useEffect(() => {
        if (isBefore(today, date)) {
            router.push(`?day=${format(today, "yyyy-MM-dd")}`)
        }
    }, [date, router])


    return (
        <div className="flex items-center justify-center space-x-4 p-8">
            <Button
                variant="ghost"
                size="icon"
                disabled={isBefore(date, new Date("2021-01-02"))}
                className="hover:bg-accent hover:text-accent-foreground"
                onClick={() => router.push(`?day=${format(addDays(date, -1), "yyyy-MM-dd")}`)}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous day</span>
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center space-x-2 text-3xl font-bold hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2"
                    >
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        <span>{format(date, "dd MMMM yyyy")}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                            if (newDate) {
                                router.push(`?day=${format(newDate, "yyyy-MM-dd")}`)
                            }
                        }}
                        disabled={(date) => isAfter(date, today) || isBefore(date, new Date("2021-01-01"))}
                        initialFocus
                        className="rounded-md border"
                    />
                </PopoverContent>
            </Popover>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`?day=${format(addDays(date, 1), "yyyy-MM-dd")}`)}
                disabled={isBefore(today, addDays(date, 1))}
                className="hover:bg-accent hover:text-accent-foreground"
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next day</span>
            </Button>
        </div>
    )
}
