import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RouteSelection } from "@/components/searchHeader";

const fields = [
    { key: "checkpoint1", label: "Checkpoint 1" },
    { key: "checkpoint2", label: "Checkpoint 2" },
    { key: "sprint1", label: "Sprint 1" },
    { key: "sprint2", label: "Sprint 2" },
    { key: "global", label: "Global" },
];

const emptySemester = { checkpoint1: "", checkpoint2: "", sprint1: "", sprint2: "", global: "" };

function semesterGrade(s) {
    const checkpoints = ((Number(s.checkpoint1) + Number(s.checkpoint2)) / 2) * 0.2;
    const sprints = ((Number(s.sprint1) + Number(s.sprint2)) / 2) * 0.2;
    const global = Number(s.global) * 0.6;
    return checkpoints + sprints + global;
}

function format(value) {
    return Number(value.toFixed(2)).toLocaleString("pt-BR");
}

function SemesterCard({ title, weight, values, onChange, grade }) {
    return (
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                    <span className="text-[11px] uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                        peso {weight * 100}%
                    </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-neutral-500">nota do semestre</span>
                    <span className="text-xl font-semibold text-white tabular-nums">{format(grade)}</span>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {fields.map(f => (
                    <div key={f.key} className="flex flex-col gap-1.5">
                        <label className="text-xs text-neutral-400">{f.label}</label>
                        <Input
                            className="h-11 bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-indigo-400 tabular-nums"
                            placeholder="0"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={values[f.key]}
                            onChange={(e) => onChange(f.key, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function FiapCalculate() {
    const [sem1, setSem1] = useState(emptySemester);
    const [sem2, setSem2] = useState(emptySemester);

    const grade1 = semesterGrade(sem1);
    const grade2 = semesterGrade(sem2);
    const final = grade1 * 0.4 + grade2 * 0.6;
    const approved = final >= 6;

    function updateSem1(key, value) {
        setSem1(prev => ({ ...prev, [key]: value }));
    }
    function updateSem2(key, value) {
        setSem2(prev => ({ ...prev, [key]: value }));
    }

    return (
        <>
            <RouteSelection />
            <div className="min-h-screen flex flex-col items-center gap-8 px-6 pt-24 pb-16">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-base/7 font-semibold text-orange-400">Calculadora de Nota</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">Calcular nota anual - Fiap</h1>
                    <p className="text-sm text-neutral-400">Checkpoints e Sprints valem 20% cada, Global 60% por semestre</p>
                </div>

                <div className="w-full max-w-4xl flex flex-col gap-5">
                    <SemesterCard title="Semestre 1" weight={0.4} values={sem1} onChange={updateSem1} grade={grade1} />
                    <SemesterCard title="Semestre 2" weight={0.6} values={sem2} onChange={updateSem2} grade={grade2} />

                    <div className="w-full bg-gradient-to-br from-indigo-500/10 to-orange-500/10 border border-white/10 rounded-2xl p-6 flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-neutral-400">Nota final anual</span>
                            <span className="text-xs text-neutral-500">
                                {format(grade1)} × 0,4 + {format(grade2)} × 0,6
                            </span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className={`text-4xl font-bold tabular-nums ${approved ? "text-emerald-400" : "text-orange-400"}`}>
                                {format(final)}
                            </span>
                            <span className={`text-xs font-medium ${approved ? "text-emerald-400" : "text-orange-400"}`}>
                                {approved ? "Aprovado" : "Abaixo de 6,0"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
