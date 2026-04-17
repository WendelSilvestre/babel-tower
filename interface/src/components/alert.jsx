import { useEffect } from "react";

export function AlertError({ errorMessage, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1250);
        return () => clearTimeout(timer);
    }, [errorMessage]);

    return (
        <div className="fixed top-6 z-50 animate-slide-in-top">
            <div className="bg-red-900 border border-red-600 text-white text-sm px-5 py-3 rounded-lg shadow-lg">
                {errorMessage}
            </div>
        </div>
    );
}

export function AlertSuccess({ successMessage, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1250);
        return () => clearTimeout(timer);
    }, [successMessage]);

    return (
        <div className="fixed top-6 z-50 animate-slide-in-top">
            <div className="bg-green-900 border border-green-600 text-white text-sm px-5 py-3 rounded-lg shadow-lg">
                {successMessage}
            </div>
        </div>
    );
}
