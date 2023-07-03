import { Button } from 'antd'
import React from 'react'

export default function IncrementDecrement({handleIncrement,handleDecrement,display}) {
  return (
    <div className='flex items-center gap-3'>
        <Button onClick={handleDecrement}>{"<"}</Button>
        <span>{display}</span>
        <Button onClick={handleIncrement}>{">"}</Button>
    </div>
  )
}
