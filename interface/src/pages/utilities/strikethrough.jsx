import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RouteSelection } from "@/components/searchHeader";


export default function Striketrough() {
    const [string, setString] = useState("");
    const [striked, setStriked] = useState("");

    function handleChange(e) {
        const value = e.target.value;
        setString(value)
    }

    function strike() {
        setStriked(string.split('').map(char => char + '\u0336').join(''))
    }

    return (
        <>
            <RouteSelection />
            <div className="min-h-screen flex flex-col items-center gap-8 px-6 pt-24">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-base/7 font-semibold text-orange-400">Utilitários</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">Gerador de texto tachado</h1>
                </div>
                <div className="flex gap-6 w-full max-w-3xl">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm text-gray-400">Entrada</label>
                        <Input
                            className="w-full h-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-indigo-400"
                            placeholder="Insira o texto a ser tachado"
                            type="text"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm text-gray-400">Resultado</label>
                        <Input
                            className="w-full h-12 bg-white/10 border-white/20 text-white placeholder-gray-400 disabled"
                            value={striked}
                            type="text"
                        />
                    </div>
                </div>
                <Button className="px-10 py-6 text-base" onClick={() => strike()}>
                    Tachar texto
                </Button>
            </div>
        </>
    )
}