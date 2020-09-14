import React from 'react'
import classes from './Example.module.scss'

import { useDispatch } from 'react-redux'
import { addTodo } from './exampleSlice'

type PropsType = {
  someValue?: number;
};

export const Example: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('')

  const handleChange = (e: { target: HTMLInputElement }) => {
    setText(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!text.trim()) {
      return
    }
    dispatch(addTodo(text))

    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className={classes.title}>Hi, I'm example feature with prop value: {props.someValue}</h1>
      <input value={text} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

Example.defaultProps = {
  someValue: 12
}
