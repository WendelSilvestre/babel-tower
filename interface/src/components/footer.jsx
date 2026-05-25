import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="w-full px-8 py-5 flex flex-row items-center justify-center gap-1.5 text-sm text-neutral-400">
        <span>made with</span>
        <HeartIcon aria-hidden="true" className="size-4 text-orange-400" />
        <span>
          by <span className="font-semibold text-white">Babel. INC</span>
        </span>
      </div>
    </footer>
  );
}
