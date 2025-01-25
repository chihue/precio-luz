import Link from "next/link"
import HeaderTheme from "./HeaderTheme"

function Header() {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="px-4 py-4 flex justify-between items-center">
                <nav>
                    <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
                        Precio de la luz España por horas
                    </Link>
                    <ul className="flex space-x-4">
                        {/* <li>
                            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                            >
                                Acerca de
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                            >
                                Contacto
                            </Link>
                        </li> */}
                    </ul>
                </nav>
                <HeaderTheme />
            </div>
        </header>
    )
}

export default Header