import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { teams } from "./constants";
import { AlertError } from "../../components/alert";
import { RouteSelection } from "../../components/searchHeader";

const baseUrl = import.meta.env.VITE_BASE_API_URL;


export default function Copa() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [copa, setCopa] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
            navigate("/user");
            return;
        }
        setUserId(localStorage.getItem("userId"));
    }, [navigate]);

    useEffect(() => {
        if (userId) {
            handleGetCopa();
        }
    }, [userId]);

    if (!userId) return null;

    async function handleGetCopa() {
        const storedCopa = localStorage.getItem("copa");
        if (!storedCopa) {
            const response = await fetch(`${baseUrl}/babel-tower/copa?userId=${encodeURIComponent(userId)}`);

            if (!response.ok) {
                setError("Erro ao coletar histórico do album da copa");
                return;
            }

            const data = await response.json();
            localStorage.setItem("copa", JSON.stringify(data.copa));
            setCopa(data.copa);
        } else {
            setCopa(JSON.parse(storedCopa));
        }
    }

    async function handlePatchCopa(team, num) {
        const copaId = copa.id;
        const owned = { [team]: [num] };

        try {
            const response = await fetch(`${baseUrl}/babel-tower/copa`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ copaId, owned, userId })
            });

            if (!response.ok) {
                setError("Erro ao atualizar copa");
                return;
            }

            const updatedCopa = await response.json();
            setCopa(updatedCopa);
            localStorage.setItem("copa", JSON.stringify(updatedCopa));
        } catch (err) {
            setError("Erro na requisição");
        }
    }

    return (
        <>
            <RouteSelection />
            {error && <AlertError errorMessage={error} onClose={() => setError("")} />}
            <div className="teams-container">
                {Object.entries(teams).map(([team, numbers]) => (
                    <div key={team} className="team-section">
                        <h3>{team}</h3>
                        <div className="buttons-container">
                            {numbers.map(num => {
                                const isOwned = copa && copa.owned && copa.owned[team] && copa.owned[team].includes(num);
                                return (
                                    <button 
                                        key={num} 
                                        onClick={() => handlePatchCopa(team, num)} 
                                        disabled={isOwned}
                                        style={isOwned ? { backgroundColor: '#4CAF50', color: 'white' } : {}}
                                    >
                                        {num}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
