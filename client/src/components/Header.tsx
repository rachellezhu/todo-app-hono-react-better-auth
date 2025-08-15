import { Link, useNavigate } from '@tanstack/react-router'
import { signOut, useSession } from '../../../server/lib/auth-client'

export default function Header() {
  const { data } = useSession()
  const navigate = useNavigate({ from: '/' })

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row w-full">
        {!data?.session && (
          <div className="px-2 font-bold">
            <Link to="/signin">Sign in</Link>
          </div>
        )}
        {data && data.session && (
          <>
            <div className="px-2 font-bold">
              <Link to="/">Home</Link>
            </div>
            <div className="px-2 font-bold">
              <Link to="/demo/tanstack-query">TanStack Query</Link>
            </div>

            <div className="px-2 font-bold">
              <Link to="/todos">Todos</Link>
            </div>

            <div className="px-2 font-bold ml-auto">
              <button
                className="hover:cursor-pointer"
                onClick={async () => {
                  await signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        return navigate({ to: '/signin' })
                      },
                      onError: (ctx) => {
                        throw new Error(ctx.error.message)
                      },
                    },
                  })
                }}
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
