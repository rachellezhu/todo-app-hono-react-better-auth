import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import type { AppType } from '../../../server'
import { useQuery } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
const client = hc<AppType>('/')

export const Route = createFileRoute('/todos')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.api.todos.$get()

      if (!res.ok) throw new Error('Failed to fetch todos')

      return res.json()
    },
  })

  return (
    <div className="flex flex-col items-center p-10">
      <div className="space-y-3">
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5].map((i) => {
              return (
                <div className="flex items-center gap-2" key={i}>
                  <div className="skeleton h-8 w-8 rounded-full"></div>
                  <div className="skeleton h-6 w-32 rounded-full"></div>
                </div>
              )
            })}
          </>
        )}

        {!isLoading && isError && (
          <div role="alert" className="alert alert-error">
            <CircleX />
            <span>Error: {error.message}</span>
          </div>
        )}

        {!isLoading &&
          !isError &&
          data &&
          data.map((todo) => {
            return (
              <div className="flex items-center gap-2" key={todo.id}>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  id={todo.id}
                  checked={todo.completed!}
                />
                <span>{todo.title}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
