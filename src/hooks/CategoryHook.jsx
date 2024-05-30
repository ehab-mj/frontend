import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryMenu() {
    const [CategoryMenu, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories'); // adjust the URL as needed
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {CategoryMenu.map(category => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryMenu;