import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} Precio de la Luz España. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}

export default Footer