import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { RouteSelection } from "../../components/searchHeader";

const features = [
  {
    name: 'Structure.',
    description:
      'Build in React vite with tailwindCSS ',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

export default function Home() {
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
                 The name Babel Tower is inspired by the biblical story of the Tower of Babel, a structure built in a chaotic and uncoordinated way, where multiple languages and perspectives emerged.
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
            src="./src/assets/babel-icon.png"
            className="w-3xl max-w-none rounded-xl sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
    </>
  );
}
