import { useState ,useCallback ,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null) 
  const generatePassword = useCallback(() => {
    // logic to generate password
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let num = "0123456789"
    let char = "!@#$%^&*()_+"
    if (numberAllowed) {
      str += num
    }
    if (charAllowed) {
      str += char
    }
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass) 
  },[length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {generatePassword()},[length, numberAllowed, charAllowed])

  return (
    <div className='bg-gray-900 mt-4 p-4 max-w-md w-full mx-auto shadow-sm rounded-lg px-4 text-orange-500 flex flex-row flex-wrap justify-center '>
      <h1 className="text-3xl font-bold mb-2 text-center text-white ">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-4 h-10 w-[500px]">
        <input
          type='text'
          className='outline-none py-1 px-3 w-full text-gray-800'
          value={password}
          placeholder='Password'
          readOnly
          ref = {passwordRef}
          
        />
        <button
          onClick={() => {copyPasswordToClipboard()}}
        className='outline-none bg-blue-700 text-white px-4 shrink-0 '>
          Copy
        </button>
      </div>
      <div className='gap-x-1'>
        <input 
        type="range"
        name = "length"
        min = {8}
        max = {20}
        value = {length}
        className='cursir-pointer'
        id = "length"
        onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="length">Length :{length}</label>
      </div>
      <div className='ml-4'>
        <input type="checkbox"
        name="number"
        id="number"
        defaultChecked={numberAllowed}
        onChange={(e) =>{ 
          setNumberAllowed((prev) => !prev)
        }}
        />
        <label htmlFor="number">Number :{numberAllowed}</label>
      </div>
      <div className='ml-4'>
        <input type="checkbox"
        name="char"
        id="char"
        defaultChecked={charAllowed}
        onChange={(e) =>{ 
          setCharAllowed((prev) => !prev)
        }}
        />
        <label htmlFor="char">Character:{charAllowed}</label>
      </div>
      
    </div>
  )
}

export default App
