import { PokemonType, Types } from "pokenode-ts"
import './TypeButton.css'

interface Props{
  key: number,
  type: string
}
export default function TypeButton({key, type} : Props){
  const className = `typeButton ${type}`

  return(
    <button key={key} className={className}>
      <a className="buttonText">{type}</a>
    </button>
  )
}