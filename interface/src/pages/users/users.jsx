import { RouteSelection } from "../../components/searchHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserLogin() {
  return (
    <>
      <RouteSelection />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-white">
        <div className="w-full max-w-sm flex flex-col items-center gap-6">

          <div className="flex flex-col items-center gap-1">
            <img alt="Babel Tower" src="./src/assets/babel-icon.png" className="h-20 w-20 mb-2" />
            <h1 className="text-2xl font-bold">Entre na sua conta</h1>
            <p className="text-sm text-neutral-400">Bem-vindo de volta</p>
          </div>

          <form className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-neutral-300">E-mail</label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com"
                className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-neutral-300">Senha</label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-400"
              />
            </div>

            <Button type="submit" className="w-full mt-2">Entrar</Button>
          </form>

          <p className="text-sm text-neutral-400">
            Quer entrar na seita?{' '}
            <a href="#" className="text-white font-semibold hover:underline">Criar conta</a>
          </p>

        </div>
      </div>
    </>
  )
}
