import { useState } from "react";
import './SearchBox.scss'
import { FaSearch } from 'react-icons/fa'

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBox({ setSearch }: Props) {
  const [input, setInput] = useState('');

  return (
    <form className="search-box" onSubmit={e => {
      e.preventDefault()
      setSearch(input.toLowerCase())
      setInput('')
    }}>
        <input
          className="input"
          type="text"
          placeholder="Search pokémon"
          value={input}
          onChange={e => setInput(e.target.value)} />
        <button className="button"><FaSearch /></button>
    </form>
  )
}