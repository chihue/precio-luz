'use client'

import { Moon, Sun, LoaderCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

function HeaderTheme() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])


    if (!mounted) {
        return <LoaderCircle className="h-[1.2rem] w-[1.2rem] animate-spin" />
    }

    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? 'light' : 'dark')} >
            {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
    )
}

export default HeaderTheme