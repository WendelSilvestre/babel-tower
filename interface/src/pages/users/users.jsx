import { useState } from "react";
import { RouteSelection } from "../../components/searchHeader";
import { AlertError, AlertSuccess } from "../../components/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const inputClass = "bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400";
const baseUrl = import.meta.env.VITE_BASE_API_URL;

export default function UserLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [view, setView] = useState("login");
    const [direction, setDirection] = useState("right");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    function goTo(target) {
        setDirection(target === "signup" ? "right" : "left");
        setView(target);
        setEmail("");
        setName("");
        setPassword("");
    }

    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/babel-tower/session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            setError("Erro ao fazer login");
        }

        const data = await response.json()
        localStorage.setItem("sessionId", data.session.id)
        localStorage.setItem("userId", data.session.userId)

        navigate("/profile")
    }

    async function handleSignup(e) {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/babel-tower/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        
        if (!response.ok) {
            setError("Erro ao criar conta");
        }
        setSuccess("Conta criada com sucesso!")
        
        goTo("login");
    }

    return (
        <>
            <RouteSelection />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-white overflow-hidden">
                <div
                    key={view}
                    className={`w-full max-w-sm flex flex-col items-center gap-6 ${
                        direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
                    }`}
                >
                    <div className="flex flex-col items-center gap-1">
                        <img alt="Babel Tower" src="/assets/babel-icon.png" className="h-20 w-20 mb-2" />
                        {view === "login" ? (
                            <>
                                <h1 className="text-2xl font-bold">Entre na sua conta</h1>
                                <p className="text-sm text-neutral-400">Bem-vindo de volta</p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold">Criar conta</h1>
                                <p className="text-sm text-neutral-400">Junte-se à seita</p>
                            </>
                        )}
                    </div>

                    {success && <AlertSuccess successMessage={success} onClose={() => setSuccess("")} />}
                    {error && <AlertError errorMessage={error} onClose={() => setError("")} />}

                    {view === "login" ? (
                        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm text-neutral-300">E-mail</label>
                                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" required autoComplete="email" placeholder="seu@email.com" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-sm text-neutral-300">Senha</label>
                                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" required autoComplete="current-password" placeholder="password" className={inputClass} />
                            </div>
                            <Button type="submit" className="w-full mt-2">Entrar</Button>
                        </form>
                    ) : (
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSignup}>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-sm text-neutral-300">Nome</label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" required autoComplete="name" placeholder="Seu nome" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm text-neutral-300">E-mail</label>
                                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" required autoComplete="email" placeholder="seu@email.com" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-sm text-neutral-300">Senha</label>
                                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" required placeholder="password" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="confirm-password" className="text-sm text-neutral-300">Confirmar senha</label>
                                <Input id="confirm-password" name="confirm-password" type="password" required placeholder="password" className={inputClass} />
                            </div>
                            <Button type="submit" className="w-full mt-2">Criar conta</Button>
                        </form>
                    )}

                    <p className="text-sm text-neutral-400">
                        {view === "login" ? (
                            <>Quer entrar na seita?{" "}
                                <button onClick={() => goTo("signup")} className="text-white font-semibold hover:underline">
                                    Criar conta
                                </button>
                            </>
                        ) : (
                            <>Já tem uma conta?{" "}
                                <button onClick={() => goTo("login")} className="text-white font-semibold hover:underline">
                                    Entrar
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </>
    );
}
