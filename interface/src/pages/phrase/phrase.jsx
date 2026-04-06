import { useState } from "react";
import { RouteSelection } from "../../components/searchHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const phrases = [
    { "person": "Wendel", "phrase": "Vou comer seu olho!" },
    { "person": "Wendel", "phrase": "Basicamente" },
    { "person": "Wendel", "phrase": "Não fala isso não" },

    { "person": "Ogata", "phrase": "Ojima, ojima!" },

    { "person": "Rebeca", "phrase": "Isso não é uma recomendação de investimento" },

    { "person": "Massaru", "phrase": "O cara de chapéu" },
    { "person": "Massaru", "phrase": "BigSad" },
    { "person": "Massaru", "phrase": "Sacanagem" },
    { "person": "Massaru", "phrase": "É nada!!!" },
    { "person": "Massaru", "phrase": "O cara não dá a mínima" },

    { "person": "Leandro", "phrase": "Cuidado que ele tá subindo ai" },
    { "person": "Leandro", "phrase": "Ta achando que a vida é um morango?" },
    { "person": "Leandro", "phrase": "Quer comprar um carro?" },

    { "person": "João", "phrase": "Hum?!" },
    { "person": "João", "phrase": "Oi??????" },
    { "person": "João", "phrase": "Poha Fakiani" },

    { "person": "Eiji", "phrase": "Abril os braços é abraço" },
    { "person": "Eiji", "phrase": "Esse merda do Massu" },

    { "person": "Massu", "phrase": "Não te contaram?" },
    { "person": "Massu", "phrase": "Fica ai, vai ter pizza" },
    { "person": "Massu", "phrase": "É o merda do Brunoeiji" },
    { "person": "Massu", "phrase": "É cíclico" },

    { "person": "Cabral", "phrase": "Kóe mané" },
    { "person": "Cabral", "phrase": "Se tá duro dorme" },
    
    { "person": "Delson", "phrase": "First try!" },
    { "person": "Delson", "phrase": "A chance é meio. Só que as vezes um meio é maior que o outro" },

    { "person": "Jojo", "phrase": "Tudo bem com o senhor?" },
    { "person": "Jojo", "phrase": "Eai, o senhor tá bem?" },
    { "person": "Jojo", "phrase": "Chefe, me tira uma dúvida" },
    { "person": "Jojo", "phrase": "Você não ta com vontade de cantar uma bela canção" },

    { "person": "Nicassio", "phrase": "Ai Ai Ai" },

    { "person": "Gustavo", "phrase": "Para quem fica, minha pica!" },
    { "person": "Gustavo", "phrase": "Pessoas vemos, costumes não sabemos" },
    { "person": "Gustavo", "phrase": "O maldito homem que acredita no homem" },
    { "person": "Gustavo", "phrase": "A dor do parto é grande, mas devo partir" },

    { "person": "PC", "phrase": "." },
    { "person": "PC", "phrase": "É outras conversas" },

    { "person": "Gaia", "phrase": "Se ta putinho?" },
    { "person": "Gaia", "phrase": "Vocês também batem de mão fechada?" },
    { "person": "Gaia", "phrase": "Pair programming?" },
    { "person": "Gaia", "phrase": "Tá lá" },

    { "person": "Savio", "phrase": "Mas ó, lava o pinto!" },
]

const people = [...new Set(phrases.map(p => p.person))]


export default function Phrase() {
    const [current, setCurrent] = useState(() => phrases[Math.floor(Math.random() * phrases.length)])
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [error, setError] = useState(0);
    const [neutral, setNeutral] = useState(0);

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

    return (
        <>
            <RouteSelection />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-6 text-white">
                <p className="text-sm tracking-widest uppercase text-neutral-400">Quem falou essa frase?</p>
                <p className="text-4xl italic text-center max-w-2xl px-4">"{current.phrase}"</p>
                <div className="flex flex-col items-center gap-2">
                    <Input
                        className="w-[23ch] bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400"
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
