import React, { Component } from 'react'
import User from '../interfaces/User.interfaces'

interface searchState{
    error: boolean,
    pokemon: Pokemon,
    jsonResponse: string
}

interface Pokemon{
    name: string,
    numberOfAbilities: number,
    baseExperience: number,
    imageUrl: string
}

export class PokemonSearch extends Component<User, searchState> {
    
    pokemonRef: React.RefObject<HTMLInputElement>;

    constructor (props: User){
        super(props);
        this.state = {
            error: false,
            pokemon: {
                name: "",
                numberOfAbilities: 0,
                baseExperience: 0,
                imageUrl: ""
            },
            jsonResponse: ""
        }
        this.pokemonRef = React.createRef();
    } 

    onSearchClick = () => {
        const inputValue = this.pokemonRef.current?.value;

        if(inputValue){
            fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(res => {
                if(res.status !== 200){
                    this.setState({ error: true});
                    return
                }else{
                    
                    res.json().then(data =>{
                        this.setState({
                            error:false,
                            pokemon: {
                                name: data.name,
                                numberOfAbilities: data.abilities.lenght,
                                baseExperience: data.base_experience,
                                imageUrl: data.sprites.front_default
                            },
                            jsonResponse: JSON.stringify(data)
                        })
                    })
                }
            })
        }else{
            this.setState({ error: true});
            return
        }
        
    }

    render() {
        const{
            error, 
            pokemon
        } = this.state;
        
        let resultMarkUp;
        let jsonResponse : string = "";

        //const{name, numberOfPokemons} = this.props


        if (error){
            resultMarkUp = <p>Pokemon not found, please try again.</p>
        }else if(this.state.pokemon.name !== ""){
            resultMarkUp = <div>
                <img src = {pokemon.imageUrl} alt = "pokemon" className= "pokemon-image"/>
                <p>
                    {pokemon.name} has {pokemon.numberOfAbilities} abilities and {pokemon.baseExperience} base experience points
                </p>
            </div>
            jsonResponse = this.state.jsonResponse
        }

        return (
            <div>
                <p>
                    Search for a pokemon by name:
                </p>
                <input type ="text" ref = {this.pokemonRef}/>
                <button onClick = {this.onSearchClick} className = "searchButton">
                    Search
                </button>
                {resultMarkUp}
                <br/>
                <br/>
                <p>
                    JSON response:
                </p>
                {jsonResponse}
            </div>
        )
    }
}

export default PokemonSearch
