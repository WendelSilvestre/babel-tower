import "./phrase.css"
import { RouteSelection } from "../../components/searchHeader";


export default function Phrase() {
    return (
        <>
            < RouteSelection />
            <div className="phrase-center">
                <h1>Quem falou essa frase?</h1>
                <input></input>    
            </div>
        </>
    )
}
