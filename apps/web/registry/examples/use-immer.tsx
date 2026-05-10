'use client'

import { Button } from '@/components/ui/button'
import { useImmer, useImmerReducer } from '@/registry/hooks/use-immer'

export default function UseImmerDemo() {
  return (
    <div className='flex w-full max-w-md flex-col gap-4'>
      <Counter />

      <TodoList />
    </div>
  )
}

const Counter = () => {
  const [state, updateState] = useImmer({ count: 0 })

  const increment = () =>
    updateState((draft) => {
      draft.count += 1
    })

  return (
    <div>
      <p>Count: {state.count}</p>
      <Button onClick={increment}>Increment</Button>
    </div>
  )
}

const reducer = (
  draft: { todos: string[] },
  action: { type: 'add'; todo: string } | { type: 'remove'; todo: string }
) => {
  switch (action.type) {
    case 'add':
      draft.todos.push(action.todo)
      break
    case 'remove':
      return (draft.todos = draft.todos.filter((todo) => todo !== action.todo))
    default:
      return draft
  }
}

const TodoList = () => {
  const [state, dispatch] = useImmerReducer(reducer, { todos: [] })

  const addTodo = () => {
    // oxlint-disable-next-line no-alert
    const todo = prompt('Enter a new todo:')
    if (todo) dispatch({ type: 'add', todo })
  }

  return (
    <div>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index} className='flex items-center justify-between'>
            <span>{todo}</span>
            <Button
              variant='destructive'
              onClick={() => dispatch({ type: 'remove', todo })}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <Button onClick={addTodo}>Add Todo</Button>
    </div>
  )
}
