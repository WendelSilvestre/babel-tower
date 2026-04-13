import { useState } from "react";
import { RouteSelection } from "../../components/searchHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newPhrases, oldPhrases } from "./constants"

const leaderboard = [
    { rank: 1, name: "—", score: "—" },
    { rank: 2, name: "—", score: "—" },
    { rank: 3, name: "—", score: "—" },
    { rank: 4, name: "—", score: "—" },
    { rank: 5, name: "—", score: "—" },
]

const MODES = [
    {
        id: "main",
        label: "Stark Phrases",
        description: "Adivinhe quem falou cada frase do grupo.",
    },
    {
        id: "classic",
        label: "Classic Phrases",
        description: "Para matar a saudade, reviva frases marcantes e icônicas.",
    },
    {
        id: "next",
        label: "Em Breve",
        description: "Novo modo de jogo sendo desenvolvido."
    },
]

export default function InitialScreen() {
    const [started, setStarted] = useState(false);
    const [mode, setMode] = useState("main");
    const [showModes, setShowModes] = useState(false);

    if (started && mode === "main") return <Phrase mode="main"/>;
    if (started && mode === "classic") return <Phrase mode="classic"/>;
    if (started && mode === "next") return <NextGame />;

    return (
        <>
            <RouteSelection />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] gap-16 px-8 text-white">

                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm tracking-widest uppercase text-neutral-400">Pronto para jogar?</p>
                    <h1 className="text-3xl font-bold">Stark-Phrases</h1>

                    {showModes ? (
                        <div className="flex flex-col gap-3 w-64 mt-2">
                            {MODES.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => { setMode(m.id); setShowModes(false); }}
                                    className={[
                                        "text-left rounded-xl border px-4 py-3 transition-colors",
                                        m.disabled
                                            ? "opacity-40 cursor-not-allowed border-neutral-700 bg-neutral-900"
                                            : mode === m.id
                                                ? "bg-neutral-800"
                                                : "border-neutral-700 bg-neutral-900 hover:border-neutral-500",
                                    ].join(" ")}
                                >
                                    <p className="font-semibold text-sm">{m.label}</p>
                                    <p className="text-xs text-neutral-400 mt-0.5">{m.description}</p>
                                </button>
                            ))}
                            <Button variant="ghost" className="text-neutral-500 hover:text-white text-xs" onClick={() => setShowModes(false)}>
                                Cancelar
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <Button className="px-10 py-6 text-base w-full" onClick={() => setStarted(true)}>
                                Iniciar Jogo
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => setShowModes(true)}>
                                Modo de Jogo: {MODES.find(m => m.id === mode)?.label}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-72 rounded-xl border border-neutral-700 bg-neutral-900 overflow-hidden">
                    <div className="px-5 py-4 border-b border-neutral-700">
                        <p className="text-sm font-semibold tracking-widest uppercase text-neutral-400">Leaderboard</p>
                    </div>
                    <ul className="divide-y divide-neutral-800">
                        {leaderboard.map((entry) => (
                            <li key={entry.rank} className="flex items-center justify-between px-5 py-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-neutral-500 w-4">{entry.rank}</span>
                                    <span className="text-sm text-neutral-300">{entry.name}</span>
                                </div>
                                <span className="text-sm text-neutral-500">{entry.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    );
}

export function NextGame() {
    return (
        <>
            <RouteSelection />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-4 text-white">
                <p className="text-sm tracking-widest uppercase text-neutral-400">Em construção</p>
                <h1 className="text-4xl font-bold">Novo Jogo</h1>
                <p className="text-neutral-400">Este modo ainda está sendo desenvolvido.</p>
            </div>
        </>
    );
}


export function Phrase({ mode }) {
    let phrases = newPhrases
    if (mode === "classic") {
        phrases = oldPhrases
    }
    const people = [...new Set(phrases.map(p => p.person))]

    const [current, setCurrent] = useState(() => phrases[Math.floor(Math.random() * phrases.length)])
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [error, setError] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [shake, setShake] = useState(false);

    function validateInput(input) {
        if (input.trim().toLowerCase() === current.person.toLowerCase()) {
            setScore(score + 1);
            let next;
            do {
                next = phrases[Math.floor(Math.random() * phrases.length)];
            } while (next.text === current.phrase && phrases.length > 1);
            setCurrent(next);
            setInput("");
        } else {
            setError(error + 1);
            triggerShake();
            setInput("");
        }
    }

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            setInput("");
            validateInput(input);
        }
    }

    function neutralScore() {
        setNeutral(neutral + 1)
        let next;
        do {
            next = phrases[Math.floor(Math.random() * phrases.length)];
        } while (next.text === current.phrase && phrases.length > 1);
        setCurrent(next);
        setInput("");
    }

    function resetScore() {
        setScore(0);
        setError(0);
        setNeutral(0)
    }

    function triggerShake() {
        setShake(true);

        setTimeout(() => {
            setShake(false);
        }, 600);
    }

    return (
        <>
            <RouteSelection />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-6 text-white">
                <p className="text-sm tracking-widest uppercase text-neutral-400">Quem falou essa frase?</p>
                <p className="text-4xl italic text-center max-w-2xl px-4">"{current.phrase}"</p>
                <div className="flex flex-col items-center gap-2">
                    <Input
                        className={shake ? "animate-shake border-red-500 w-[23ch]" : "w-[23ch] bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400"}
                        list="person"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleEnter}
                        placeholder="Digite o nome da pessoa"
                    />
                    <datalist id="person">
                        {people.map(person => (
                            <option key={person} value={person}></option>
                        ))}
                    </datalist>
                    <Button className="w-full" onClick={() => validateInput(input)}>Enviar</Button>
                </div>
                <div className="flex gap-6 text-sm text-neutral-400">
                    <span>Acertos: <span className="text-green-400 font-semibold">{score}</span></span>
                    <span>Erros: <span className="text-red-400 font-semibold">{error}</span></span>
                    <span>Neutros: <span className="text-gray-400 font-semibold">{neutral}</span></span>
                </div>
                <Button variant="ghost" className="text-neutral-500 hover:text-white text-xs" onClick={resetScore}>
                    Resetar Score
                </Button>
                <Button variant="ghost" className="text-neutral-500 text-white hover:text-white text-xs" onClick={neutralScore}>
                    Não sabe de quem é a frase? Pule!
                </Button>
            </div>
        </>
    )
}
