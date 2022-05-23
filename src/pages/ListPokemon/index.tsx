import Page from "components/Page";
import SearchBox from "components/Searchbox";
import { useEffect, useState } from "react";
import { NamedAPIResource, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import LoadButton from "components/LoadButton";

export default function () {
  const api = new PokemonClient();

  const min = 16
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')

  const [pokemon_dict, setPokemonDict] = useState<NamedAPIResource[]>();

  const [pokemon_list, setPokemonList] = useState<Pokemon[]>()
  const [next_list, setNextList] = useState<Pokemon[]>()

  const validateIfHasPokemon = (oldList : Pokemon[], res : Pokemon) => {
    if (!oldList.find(p => p.id === res.id))
      return [...oldList, res]
    
    return [...oldList]
  }

  const getPokemonDict = async () => {
    await api.listPokemons(0, 10000)
      .then(res => setPokemonDict(res.results.filter(item => item.name.startsWith(search))))
  }

  const getFirstList = async () => {
    setMax(min)
    setPokemonList([])
    setNextList([])

    pokemon_dict && await pokemon_dict.map((p, index) => {
      index < max ? api.getPokemonByName(p.name)
        .then(res => setPokemonList(oldList => (oldList ? validateIfHasPokemon(oldList, res) : [res])
          .sort((a, b) => a.id < b.id ? -1: 1))):
      index < max + min && api.getPokemonByName(p.name)
        .then(res => setNextList(oldList => (oldList ? validateIfHasPokemon(oldList, res) : [res])
          .sort((a, b) => a.id < b.id ? -1: 1)))
    })
  }

  const getNextList = async () => {
    console.log(next_list)
    setNextList([])

    pokemon_list && pokemon_dict && await pokemon_dict.map((p, index) => {
      index >= max && index < max + min && api.getPokemonByName(p.name)
        .then(res => setNextList(oldList => (oldList ? validateIfHasPokemon(oldList, res) : [res])
          .sort((a, b) => a.id < b.id ? -1 : 1)))
    })
  }

  useEffect(() => {
    getPokemonDict()
  }, [search])

  useEffect(() => {
    getFirstList()
  }, [pokemon_dict])

  useEffect(() => {
    if (next_list && pokemon_list){
      setPokemonList([...pokemon_list, ...next_list])
    }
    
    getNextList()
  }, [max])

  return (
    <Page>
      <SearchBox setSearch={setSearch} />
      <ul>
        {pokemon_list && pokemon_list.map((p, index) => <li key={index}>{p.name}</li>)}
      </ul>
      {next_list && next_list.length > 0 && <LoadButton max={max} setMax={setMax}/>}
    </Page>
  )
}