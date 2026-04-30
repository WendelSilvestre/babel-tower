import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteSelection } from "../../components/searchHeader";


export default function Profile() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
            navigate("/user");
            return;
        }
        setUserId(localStorage.getItem("userId"));
    }, [navigate]);

    if (!userId) return null;

    return (
        <>
            <RouteSelection />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-4 text-white">
                <p className="text-sm tracking-widest uppercase text-neutral-400">Profile</p>
                <h1 className="text-3xl font-bold">Bem-vindo</h1>
                <p className="text-neutral-400">ID do usuário:</p>
                <p className="text-lg font-mono">{userId}</p>
            </div>
        </>
    );
}
