import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { teams, total } from "./constants";
import { AlertError } from "../../components/alert";
import { RouteSelection } from "../../components/searchHeader";

const baseUrl = import.meta.env.VITE_BASE_API_URL;


export default function Copa() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [copa, setCopa] = useState(null);
    const [error, setError] = useState(null);
    const [counterCopaOwned, setCounterCopaOwned] = useState(0);

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
        const response = await fetch(`${baseUrl}/babel-tower/copa?userId=${encodeURIComponent(userId)}`);

        if (!response.ok) {
            setError("Erro ao coletar histórico do album da copa");
            return;
        }

        const data = await response.json();
        handleCounterCopa(data.copa);
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

            const data = await response.json();
            handleCounterCopa(data.copa);
            localStorage.setItem("copa", JSON.stringify(data.copa));
        } catch (err) {
            setError("Erro na requisição");
        }
    }

    async function handleCounterCopa(copa){
        const count = Object.values(copa.owned || {}).reduce((acc, numbers) => acc + numbers.length, 0);
        setCounterCopaOwned(count);
        setCopa(copa);
    }

    return (
        <>
            <RouteSelection />
            {error && <AlertError errorMessage={error} onClose={() => setError("")} />}
            <div className="min-h-[calc(100vh-80px)] px-6 pt-12 pb-16 text-white">
                <div className="max-w-5xl mx-auto flex flex-col gap-10">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-base/7 font-semibold text-orange-400">Álbum</p>
                        <h1 className="text-3xl font-semibold tracking-tight">Copa do Mundo 2026</h1>
                        <p className="text-sm text-neutral-400">Marque as figurinhas que você já tem</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-400">Total de figurinhas:</span>
                            <span className="text-neutral-200 font-medium">
                                {counterCopaOwned} <span className="text-neutral-500">/ {total}</span>
                            </span>
                        </div>
                        <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 transition-all duration-500 bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]"
                                style={{ width: `${(counterCopaOwned / total) * 100}%` }}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(teams).map(([team, numbers]) => (
                            <div
                                key={team}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
                            >
                                <h3 className="text-lg font-semibold tracking-wide">{team}</h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {numbers.map(num => {
                                        const isOwned = copa && copa.owned && copa.owned[team] && copa.owned[team].includes(num);
                                        return (
                                            <button
                                                key={num}
                                                onClick={() => handlePatchCopa(team, num)}
                                                disabled={isOwned}
                                                className={[
                                                    "h-9 rounded-lg text-sm font-medium transition-colors",
                                                    isOwned
                                                        ? "bg-indigo-500 text-white cursor-default"
                                                        : "bg-white/10 hover:bg-white/20 text-neutral-200"
                                                ].join(" ")}
                                            >
                                                {num}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
