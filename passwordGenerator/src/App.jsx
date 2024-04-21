import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "

    if(numberAllowed) str += "0,1,2,3,4,5,6,7,8,9"
    if(charAllowed) str += " !@#$%^&*()-_=+[]{};:' "

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
      
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [ password ])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rouded-lg overflow-hidden mb-4'>

            <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded-lg'
            placeholder='password'
            readOnly
            ref={passwordRef}
            />
            <button
            onClick={ copyPassword }
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg hover:bg-blue-900'
            >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            type="range"
            onChange={(e) => {setLength(e.target.value)}} />
            <label>Length: {length} </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox" 
            defaultChecked={numberAllowed}
            id="numberAllowed"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox" 
            defaultChecked={charAllowed}
            id="numberAllowed"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            />
            <label>Characters</label>
          </div>

        </div>
      </div> 
    </>
  )
}

export default App
