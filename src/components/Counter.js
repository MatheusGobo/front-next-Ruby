import { useEffect, useState } from "react"

export default function Counter() {

   // FORMA CORRETA (HOOKS)
   const [count, setCount] = useState(0)

   const incrementar = () => {
      setCount(count + 1)
   }

   const decrementar = () => {
      setCount(count - 1)
   }

   //Jeito correto de ver o valor de uma variável mudando
   useEffect(() => {
      console.log('incrementar +1', count)
   }, [count])

   return (
      <>
         <p>Contador: {count}</p>
         <button onClick={incrementar}>+1</button>
         <button onClick={decrementar}>-1</button>
      </>
   )
}