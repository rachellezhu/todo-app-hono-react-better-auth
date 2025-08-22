import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Lock, Mail } from 'lucide-react'
import { signIn, useSession } from '../../../server/lib/auth-client'
import { useEffect } from 'react'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useSession()
  const navigate = useNavigate({ from: '/signin' })

  useEffect(() => {
    if (data?.session) navigate({ to: '/' })
  }, [data])

  return (
    <div className="bg-base-100 flex items-center justify-center pt-12">
      <div className="card bg-base-300">
        <div className="card-body">
          <div className="card-title text-2xl">Sign in</div>
          <p className="text-base-content/70 my-2 ">Sign in to your account</p>

          <div className="w-72">
            <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const email = formData.get('email')!.toString()
                const password = formData.get('password')!.toString()
                const signInFn = await signIn.email({
                  email: email,
                  password: password,
                })

                console.log(signInFn)
              }}
              className="flex flex-col space-y-4"
            >
              <div>
                <label className="input validator">
                  <Mail />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </label>
                <p className="validator-hint hidden">
                  Enter valid email address
                </p>
              </div>

              <div>
                <label className="input validator">
                  <Lock />
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    name="password"
                    minLength={8}
                    pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                    title="Must be more than 8 characters, including number and letter"
                  />
                </label>
                <p className="validator-hint hidden">
                  Must be more than 8 characters, including
                  <br />
                  At least one number
                  <br />
                </p>
              </div>

              <div className="self-end text-end space-y-2">
                <button className="btn btn-primary">Sign in</button>
                <p className="text-base-content/70">
                  Don't have an account yet?{' '}
                  <Link to="/signup" className="hover:text-base-content">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
