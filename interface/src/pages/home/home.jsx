import { useState } from "react";
import {
  CloudArrowUpIcon, LockClosedIcon, ServerIcon,
  HomeIcon, ArrowRightEndOnRectangleIcon, PuzzlePieceIcon, InformationCircleIcon,
  DocumentTextIcon, BookOpenIcon, UserCircleIcon, TrophyIcon, CalculatorIcon,
} from '@heroicons/react/24/solid'
import { RouteSelection } from "../../components/searchHeader";
import { useNavigate } from "react-router-dom";
import { options } from "@/routes"

const features = [
  {
    name: 'Estrutura:',
    description:
      'Construído com React e TailwindCss para estilização.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Deploy:',
    description: 'Utilizando o Railway para algo prático e acessível facilmente.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database:',
    description: 'Utilizado o PostgreeSQL.',
    icon: ServerIcon,
  },
]

const icons = {
  home: HomeIcon,
  user: ArrowRightEndOnRectangleIcon,
  phrase: PuzzlePieceIcon,
  about: InformationCircleIcon,
  string: DocumentTextIcon,
  manga: BookOpenIcon,
  profile: UserCircleIcon,
  copa: TrophyIcon,
  fiap: CalculatorIcon,
}

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const filtered = options.filter(option =>
    option.keyword.toLowerCase().includes(search.toLowerCase()) ||
    option.description.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <>      
      <RouteSelection />
      <div className="overflow-hidden py-24 sm:py-25">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-orange-400">Made by me:</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                Babel Tower
              </p>
              <p className="mt-6 text-lg/8 text-gray-300">
                O nome Babel Tower é inspirado na história biblíca sobre a Torre de Babel, uma estrutura construída de forma cáotica e descordenada, onde múltiplas linguas e perspectivas emergiram.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-400" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Babel-Tower"
            src="/assets/babel-icon.png"
            className="w-3xl max-w-none rounded-xl sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center gap-8 px-6 pt-24 pb-12 mt-16">
        <div className="flex flex-col items-center gap-2">
          <p className="text-base/7 font-semibold text-orange-400">Navegue pelo sistema</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Qual produto quer utilizar?</h1>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar..."
          className="w-full max-w-md px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%]">
          {filtered.map(option => {
            const Icon = icons[option.keyword] ?? BookOpenIcon
            return (
              <button
                key={option.value}
                onClick={() => navigate(option.value)}
                className="group flex flex-col items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-400/50 hover:bg-white/[0.07] shadow-sm hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-center size-11 rounded-xl bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                  <Icon aria-hidden="true" className="size-6" />
                </div>
                <span className="text-white font-semibold text-base capitalize">{option.keyword}</span>
                <span className="text-gray-400 text-sm leading-relaxed">{option.description}</span>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-500 text-sm py-8">
              Nenhum resultado encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
