import { createContext, useContext, useState, useEffect } from 'react';
import { getFavourites } from '../utils/favourites';

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
    const [favouriteIds, setFavouriteIds] = useState([]);

    useEffect(() => {
        getFavourites().then(favs => setFavouriteIds(favs.map(f => String(f.stop_id))));
    }, []);

    return (
        <FavouritesContext.Provider value={{ favouriteIds, setFavouriteIds }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export const useFavourites = () => useContext(FavouritesContext);