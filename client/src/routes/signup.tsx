import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Lock, Mail, User } from 'lucide-react'
import { signUp } from '../../../server/lib/auth-client'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: '/signup' })

  return (
    <div className="bg-base-100 flex items-center justify-center pt-12">
      <div className="card bg-base-300">
        <div className="card-body">
          <div className="card-title text-2xl">Create an Account</div>
          <p className="text-base-content/70 my-2 ">Sign up to get started</p>

          <div className="w-72">
            <form
              action=""
              className="flex flex-col space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const name = formData.get('name')!.toString()
                const email = formData.get('email')!.toString()
                const password = formData.get('password')!.toString()
                const signInFn = await signUp.email({
                  name: name,
                  email: email,
                  password: password,
                })

                navigate({ to: '/' })
                console.log(signInFn)
              }}
            >
              <div>
                <label className="input validator">
                  <User />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    name="name"
                    pattern="^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z]*[ '.\-a-zA-Z])?$"
                    minLength={3}
                    maxLength={30}
                    title="Only letters, space, dash, or apostrophe"
                  />
                </label>
                <p className="validator-hint hidden">
                  Must be at least 3 characters
                  <br />
                  containing only letters, space, dash, or apostrophe
                </p>
              </div>

              <div>
                <label className="input validator">
                  <Mail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
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
                    name="password"
                    placeholder="Password"
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
                <button className="btn btn-primary">Sign up</button>
                <p className="text-base-content/70">
                  Already have an account?{' '}
                  <Link to="/signin" className="hover:text-base-content">
                    Sign in
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
