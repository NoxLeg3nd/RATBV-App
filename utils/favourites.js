import AsyncStorage from "@react-native-async-storage/async-storage";

const FAV_KEY = 'favourites';
export const getFavourites = async () => {
    return JSON.parse(await AsyncStorage.getItem(FAV_KEY) ?? '[]');
}

export const addFavourite = async (stop) => {
    const existingFavourites = await getFavourites();
    const alreadySavedFavourite = existingFavourites.find(fav => fav.stop_id === stop.stop_id);
    if (alreadySavedFavourite) return;
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify([...existingFavourites, stop]));
};

export const removeFavourite = async (stopId) => {
    const existingFavourites = await getFavourites();
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(existingFavourites.filter(fav => fav.stop_id !== stopId)));
};

export const isFavourite = async (stopId) => {
    const existingFavourites = await getFavourites();
    return existingFavourites.some(fav => fav.stop_id === stopId);
};

