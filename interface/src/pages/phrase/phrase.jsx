import "./phrase.css"
import { useState } from "react";
import { RouteSelection } from "../../components/searchHeader";


const phrases = [
    { "person": "Wendel", "phrase": "Vou comer seu olho!" },
    { "person": "Wendel", "phrase": "Basicamente" },
    { "person": "Wendel", "phrase": "Não fala isso não" },

    { "person": "Ogata", "phrase": "Ojima, ojima!" },

    { "person": "Rebeca", "phrase": "Isso não é uma dica de investimento" },

    { "person": "Massaru", "phrase": "O cara de chapéu" },
    { "person": "Massaru", "phrase": "BigSad" },
    { "person": "Massaru", "phrase": "Sacanagem" },
    { "person": "Massaru", "phrase": "É nada!!!" },
    { "person": "Massaru", "phrase": "O cara não dá a mínima" },

    { "person": "Leandro", "phrase": "Cuidado que ele tá subindo ai" },
    { "person": "Leandro", "phrase": "Ta achando que a vida é um morango?" },
    { "person": "Leandro", "phrase": "Quer comprar um carro?" },

    { "person": "Eiji", "phrase": "Abril os braços é abraço" },

    { "person": "Massu", "phrase": "Não te contaram?" },
    { "person": "Massu", "phrase": "Fica ai, vai ter pizza" },
    { "person": "Massu", "phrase": "É o merda do Brunoeiji" },
    { "person": "Massu", "phrase": "É cíclico" },

    { "person": "Delson", "phrase": "First try!" },
    { "person": "Delson", "phrase": "A chance é meio. Só que as vezes um meio é maior que o outro" },
    
    { "person": "Jojo", "phrase": "Tudo bem com o senhor?" },
    { "person": "Jojo", "phrase": "Eai, o senhor tá bem?" },
    { "person": "Jojo", "phrase": "Chefe, me tira uma dúvida" },

    { "person": "Gustavo", "phrase": "Ai Ai" },
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

    function resetScore(e) {
        setScore(0);
        setError(0);
    }

    return (
        <>
            < RouteSelection />
            <div className="phrase-center">
                <h1>Quem falou essa frase?</h1>
                <p className="phrase-current">{current.phrase}</p>
                <input
                    className="center-input"
                    list="person"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    placeholder="Digite o nome da pessoa"
                ></input>
                <datalist id="person">
                    {people.map(person => (
                        <option key={person} value={person}></option>
                    ))}
                </datalist>
                <p>Acertos: {score} Errors: {error}</p>
                <div className="phrase-button">
                    <button onClick={resetScore}>Resetar Score</button>
                    <button onClick={() => validateInput(input)}>Enviar</button>
                </div>
            </div>
        </>
    )
}

