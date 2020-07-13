import React, { Component } from 'react'
import User from '../interfaces/User.interfaces'

export class PokemonSearch extends Component<User> {

    render() {
        const name1 = this.props.name
        const numberOfPokemons1 = this.props.numberOfPokemons 
        //const{name, numberOfPokemons} = this.props
        return (
            <div>
                <p>
                    User {name1} {' '}
                    {numberOfPokemons1 && <span> has {numberOfPokemons1} pokemons </span>} 
                </p>
            </div>
        )
    }
}

export default PokemonSearch
