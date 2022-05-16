import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';
import Card from './Card';

const initialState = {
	favorites: []
}

const API = `https://rickandmortyapi.com/api/character/`;

const favoriteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVORITE':
			return {
				...state,
				favorites: [...state.favorites, action.payload]
			}
		default:
			return state;
	}
}

const Characters = () => {

	// const [ characters, setCharacters ] = useState([]);
	const [ favorites, dispatch ] = useReducer(favoriteReducer, initialState);
	const [ search, setSearch ] = useState('');
	const searchInput = useRef(null);

	// useEffect(() => {
	// 	fetch('https://rickandmortyapi.com/api/character/')
	// 	.then(response => response.json())
	// 	.then(data => setCharacters(data.results))
	// }, []);

	const characters = useCharacters(API)

	const handleClick = (favorite) => {
		dispatch({ 
			type: 'ADD_TO_FAVORITE',
			payload: favorite,
		});
	}	

	// Forma sin useRef
	// const handleSearch = (event) => {
	// 	setSearch(event.target.value);
	// }

	// Implementando useRef
	// const handleSearch = () => {
	// 	setSearch(searchInput.current.value);
	// }

	// Implementando handleSearch con useCallback
	const handleSearch = useCallback(() => {
		setSearch(searchInput.current.value);
	},[]);

	// funcion sin useMemo
	// const filteredUsers = characters.filter((user) => {
	// 	return user.name.toLowerCase().includes(search.toLowerCase());
	// });

	// funcion implementando useMemo
	const filteredUsers = useMemo(() =>
		characters.filter((user) => {
				return user.name.toLowerCase().includes(search.toLowerCase());
		}),
		[ characters, search ]
	)

	return (
		<div className='Characters'>

			{favorites.favorites.map(favorite => (
				<li key={ favorite.id }>
					{ favorite.name }
				</li>
			))}

			<Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

			{ filteredUsers.map(character => (
				<div className="item" key={character.id}>
					<Card character={character} />
					{/* <h2>{character.name}</h2> */}
					<button type='button' onClick={() => handleClick(character)}>Add Favorite</button>
				</div>
			))}
		</div>
	);
}

export default Characters;