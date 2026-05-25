import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertError, AlertSuccess } from "../../components/alert";
import { RouteSelection } from "../../components/searchHeader";

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const inputClass = "bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400";


export default function Manga() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [mangaCounters, setMangaCounters] = useState([]);
    const [mangas, setMangas] = useState([]);
    const [search, setSearch] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [editCounter, setEditCounter] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [newName, setNewName] = useState("");
    const [newTotalVolumes, setNewTotalVolumes] = useState("");
    const [newKeyWords, setNewKeyWords] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");

    const [showPick, setShowPick] = useState(false);
    const [pickStep, setPickStep] = useState("list");
    const [pickedManga, setPickedManga] = useState(null);
    const [pickSearch, setPickSearch] = useState("");
    const [pickImageUrl, setPickImageUrl] = useState("");

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
            handleGetCounters();
            handleGetMangas();
        }
    }, [userId]);

    if (!userId) return null;

    async function handleGetCounters() {
        const response = await fetch(`${baseUrl}/babel-tower/manga-counter?userId=${encodeURIComponent(userId)}`, {
            headers: { "session": localStorage.getItem("sessionId") },
        });
        if (!response.ok) {
            setError("Erro ao coletar mangás");
            return;
        }
        const data = await response.json();
        setMangaCounters(data.mangaCounters || []);
    }

    async function handleGetMangas() {
        const response = await fetch(`${baseUrl}/babel-tower/manga`);
        if (!response.ok) return;
        const data = await response.json();
        setMangas(data.mangas || []);
    }

    async function handlePatchCounter(counterId, volume) {
        const response = await fetch(`${baseUrl}/babel-tower/manga-counter`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "session": localStorage.getItem("sessionId"),
            },
            body: JSON.stringify({ counterId, volumesOwned: [volume], userId }),
        });

        if (!response.ok) {
            setError("Erro ao atualizar manga");
            return;
        }

        const data = await response.json();
        setMangaCounters(prev => prev.map(c => c.id === data.mangaCounter.id ? data.mangaCounter : c));
    }

    async function handleAddExistingToCollection(e) {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/babel-tower/manga-counter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session": localStorage.getItem("sessionId"),
            },
            body: JSON.stringify({
                mangaId: pickedManga.id,
                userId,
                imageUrl: pickImageUrl,
            }),
        });
        if (!response.ok) {
            setError("Erro ao adicionar à sua coleção");
            return;
        }
        setSuccess("Manga adicionado à sua coleção!");
        closePickModal();
        handleGetCounters();
    }

    function closePickModal() {
        setShowPick(false);
        setPickStep("list");
        setPickedManga(null);
        setPickSearch("");
        setPickImageUrl("");
    }

    function openCreateFromPick() {
        closePickModal();
        setShowCreate(true);
    }

    async function handleCreateManga(e) {
        e.preventDefault();
        const sessionId = localStorage.getItem("sessionId");

        const mangaResponse = await fetch(`${baseUrl}/babel-tower/manga`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session": sessionId,
            },
            body: JSON.stringify({
                name: newName,
                totalVolumes: parseInt(newTotalVolumes, 10),
                keyWords: newKeyWords.split(",").map(k => k.trim()).filter(Boolean),
            }),
        });
        if (!mangaResponse.ok) {
            setError("Erro ao cadastrar manga");
            return;
        }
        const mangaData = await mangaResponse.json();
        const mangaId = mangaData.manga.id;

        const counterResponse = await fetch(`${baseUrl}/babel-tower/manga-counter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session": sessionId,
            },
            body: JSON.stringify({
                mangaId,
                userId,
                imageUrl: newImageUrl,
            }),
        });
        if (!counterResponse.ok) {
            setError("Manga cadastrado, mas erro ao adicionar à sua coleção");
            return;
        }

        setSuccess("Manga adicionado à sua coleção!");
        setShowCreate(false);
        setNewName("");
        setNewTotalVolumes("");
        setNewKeyWords("");
        setNewImageUrl("");
        handleGetMangas();
        handleGetCounters();
    }

    const mangaMap = mangas.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});

    const filtered = mangaCounters.filter(counter => {
        const manga = mangaMap[counter.mangaId];
        if (!manga) return false;
        return manga.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <RouteSelection />
            {error && <AlertError errorMessage={error} onClose={() => setError("")} />}
            {success && <AlertSuccess successMessage={success} onClose={() => setSuccess("")} />}
            <div className="min-h-[calc(100vh-80px)] text-white">
                <div className="w-[90%] mx-auto pt-10 flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-base/7 font-semibold text-orange-400">Coleção</p>
                        <h1 className="text-3xl font-semibold tracking-tight">Manga</h1>
                        <p className="text-sm text-neutral-400">Acompanhe seus volumes</p>
                    </div>

                    <div className="flex flex-row items-center gap-3 w-full max-w-2xl mx-auto">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Pesquisar manga..."
                            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-indigo-400"
                        />
                        <Button
                            onClick={() => setShowPick(true)}
                            className="bg-orange-500 hover:bg-orange-400 text-white flex-shrink-0"
                        >
                            + Adicionar
                        </Button>
                    </div>
                </div>

                <div className="w-[90%] mx-auto mt-10 mb-16 flex flex-col border-t border-white/10">
                    {filtered.length === 0 && (
                        <p className="text-center text-neutral-500 text-sm py-16">
                            Nenhum manga encontrado.
                        </p>
                    )}
                    {filtered.map(counter => {
                        const manga = mangaMap[counter.mangaId];
                        const totalVolumes = manga?.totalVolumes || 0;
                        const owned = counter.volumesOwned || [];
                        return (
                            <div
                                key={counter.id}
                                className="flex flex-row items-center gap-10 py-7 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="group relative flex-shrink-0 w-28 h-40 cursor-pointer">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 translate-x-3 translate-y-3 group-hover:translate-x-7 group-hover:translate-y-5 group-hover:rotate-6 bg-neutral-900 rounded-lg ring-1 ring-white/5 shadow-xl transition-all duration-300 ease-out"
                                    />
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 translate-x-1.5 translate-y-1.5 group-hover:translate-x-4 group-hover:translate-y-3 group-hover:rotate-3 bg-neutral-800 rounded-lg ring-1 ring-white/10 shadow-xl transition-all duration-300 ease-out"
                                    />
                                    <div className="absolute inset-0 rounded-lg ring-1 ring-white/15 shadow-2xl overflow-hidden bg-neutral-900 group-hover:-translate-y-2 group-hover:-rotate-1 group-hover:shadow-indigo-500/20 transition-all duration-300 ease-out">
                                        <img
                                            src={counter.imageUrl}
                                            alt={manga?.name}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <h3 className="text-xl font-semibold tracking-tight capitalize truncate">
                                                {manga?.name || "—"}
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <p className="text-xs text-neutral-400 font-medium">
                                                    {owned.length} <span className="text-neutral-600">/ {totalVolumes}</span>
                                                </p>
                                                <div className="w-32 h-1 rounded-full bg-white/5 overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
                                                        style={{ width: totalVolumes ? `${(owned.length / totalVolumes) * 100}%` : "0%" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="text-neutral-400 hover:text-white text-xs flex-shrink-0"
                                            onClick={() => setEditCounter(counter)}
                                        >
                                            Editar
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-1.5">
                                        {Array.from({ length: totalVolumes }, (_, i) => i + 1).map(num => {
                                            const isOwned = owned.includes(num);
                                            return (
                                                <button
                                                    key={num}
                                                    onClick={() => handlePatchCounter(counter.id, num)}
                                                    disabled={isOwned}
                                                    className={[
                                                        "h-8 rounded-md text-xs font-medium transition-all",
                                                        isOwned
                                                            ? "bg-indigo-500 text-white ring-1 ring-indigo-400/50 shadow-sm shadow-indigo-500/30 cursor-default"
                                                            : "bg-white/[0.04] hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
                                                    ].join(" ")}
                                                >
                                                    {num}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showPick && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={closePickModal}
                >
                    <div
                        className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {pickStep === "list" ? (
                            <>
                                <h2 className="text-xl font-semibold text-white">Adicionar à sua coleção</h2>
                                <Input
                                    value={pickSearch}
                                    onChange={(e) => setPickSearch(e.target.value)}
                                    placeholder="Pesquisar manga..."
                                    className={inputClass}
                                />
                                <div className="flex flex-col gap-1 max-h-72 overflow-y-auto -mx-2 px-2">
                                    {mangas
                                        .filter(m => m.name.toLowerCase().includes(pickSearch.toLowerCase()))
                                        .map(m => {
                                            const alreadyHas = mangaCounters.some(c => c.mangaId === m.id);
                                            return (
                                                <button
                                                    key={m.id}
                                                    onClick={() => { setPickedManga(m); setPickStep("image"); }}
                                                    className="flex flex-row items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-left transition-colors"
                                                >
                                                    <span className="flex items-center gap-2 min-w-0">
                                                        <span className="text-white capitalize truncate">{m.name}</span>
                                                        {alreadyHas && (
                                                            <span className="text-[10px] uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded flex-shrink-0">
                                                                já tem
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-neutral-500 flex-shrink-0">{m.totalVolumes} vol.</span>
                                                </button>
                                            );
                                        })}
                                    {mangas.filter(m => m.name.toLowerCase().includes(pickSearch.toLowerCase())).length === 0 && (
                                        <p className="text-center text-neutral-500 text-sm py-6">Nenhum manga encontrado</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                                    <p className="text-sm text-neutral-400">Não tem o manga? Adicione aqui:</p>
                                    <Button
                                        onClick={openCreateFromPick}
                                        className="bg-orange-500 hover:bg-orange-400 text-white"
                                    >
                                        Cadastrar novo manga
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold text-white capitalize">{pickedManga?.name}</h2>
                                <p className="text-xs text-neutral-500">{pickedManga?.totalVolumes} volumes</p>
                                <form onSubmit={handleAddExistingToCollection} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="pickImageUrl" className="text-sm text-neutral-300">Image URL</label>
                                        <Input
                                            id="pickImageUrl"
                                            value={pickImageUrl}
                                            onChange={(e) => setPickImageUrl(e.target.value)}
                                            type="url"
                                            required
                                            placeholder="https://..."
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-2 justify-end mt-2">
                                        <Button
                                            variant="ghost"
                                            type="button"
                                            className="text-neutral-500 hover:text-white text-xs"
                                            onClick={() => { setPickStep("list"); setPickedManga(null); setPickImageUrl(""); }}
                                        >
                                            Voltar
                                        </Button>
                                        <Button type="submit" className="bg-orange-500 hover:bg-orange-400">Adicionar</Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {showCreate && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={() => setShowCreate(false)}
                >
                    <div
                        className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold text-white">Cadastrar manga</h2>
                        <form onSubmit={handleCreateManga} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-sm text-neutral-300">Nome</label>
                                <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="My Hero Academia" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="totalVolumes" className="text-sm text-neutral-300">Total de volumes</label>
                                <Input id="totalVolumes" value={newTotalVolumes} onChange={(e) => setNewTotalVolumes(e.target.value)} type="number" min="1" required placeholder="32" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="keyWords" className="text-sm text-neutral-300">
                                    Palavras-chave <span className="text-neutral-500">(separadas por vírgula)</span>
                                </label>
                                <Input id="keyWords" value={newKeyWords} onChange={(e) => setNewKeyWords(e.target.value)} placeholder="ação, shounen, super-herói" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="imageUrl" className="text-sm text-neutral-300">Image URL</label>
                                <Input id="imageUrl" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} type="url" required placeholder="https://..." className={inputClass} />
                            </div>
                            <div className="flex flex-row gap-2 justify-end mt-2">
                                <Button variant="ghost" type="button" className="text-neutral-500 hover:text-white text-xs" onClick={() => setShowCreate(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-orange-500 hover:bg-orange-400">Cadastrar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editCounter && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={() => setEditCounter(null)}
                >
                    <div
                        className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold text-white">
                            Editar {mangaMap[editCounter.mangaId]?.name}
                        </h2>
                        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setEditCounter(null); }}>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm text-neutral-300">Image URL</label>
                                <Input defaultValue={editCounter.imageUrl} className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm text-neutral-300">
                                    Volumes possuídos <span className="text-neutral-500">(separados por vírgula)</span>
                                </label>
                                <Input
                                    defaultValue={(editCounter.volumesOwned || []).join(", ")}
                                    placeholder="1, 2, 3, 4"
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex flex-row gap-2 justify-end mt-2">
                                <Button variant="ghost" type="button" className="text-neutral-500 hover:text-white text-xs" onClick={() => setEditCounter(null)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-orange-500 hover:bg-orange-400">Salvar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
