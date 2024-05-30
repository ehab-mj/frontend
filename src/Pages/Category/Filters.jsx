import React, { useEffect, useState } from 'react'
import useDataCard from '../../hooks/useDataCard';
import axios from 'axios';

function Filters() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('');
    const GameFav = useDataCard()

    useEffect(() => {
        fetchItems();
    }, [filter]);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`/games?category=${filter}`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div>
            <h1>Filterable List</h1>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                <option value="A">Category A</option>
                <option value="B">Category B</option>
                <option value="C">Category C</option>
            </select>
            <ul>
                {GameFav.map(game => (
                    <li key={game._id}>{game.category}</li>
                ))}
            </ul>
        </div>
    )
}

export default Filters
