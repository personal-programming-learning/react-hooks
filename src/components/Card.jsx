
import React from 'react';

const Card = ({ character }) => {
  return (
    <div>
      <span>******************************************</span>
      <h2>Nombre: </h2> 
      <p>{character.name}</p>
      <h2>Genero: </h2> 
      <p>{character.gender}</p>
      <h2>Origin: </h2> 
      <p>{ character.origin.name}</p>
      <img style={{ width: '100px' }} src={character.image} />
      <br/>
      <span>******************************************</span>
    </div>
  )
}

export default Card