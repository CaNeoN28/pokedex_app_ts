import { useState } from "react";
import './SearchBox.scss'
import { FaSearch } from 'react-icons/fa'

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBox({ setSearch }: Props) {
  const [input, setInput] = useState('');

  return (
    <form onSubmit={e => {
      e.preventDefault()
      setSearch(input.toLowerCase())
      setInput('')
    }}>
      <span className="searchBox">
        <input
          className="searchBox__searchInput"
          type="text"
          placeholder="Search pokémon"
          value={input}
          onChange={e => setInput(e.target.value)} />
        <button className="searchBox__searchButton"><FaSearch /></button>
      </span>
    </form>
  )
}