
const services = () => {

    const searchPlaces = async (word) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        return await fetch(`https://search.reservamos.mx/api/v2/places?q=${word}`, requestOptions)
            .then((response) => response.json())
            .then((result) => { return (result) })
            .catch((error) => { return (error) });
    }

    const searchForecastByCoords = async (lat, lng) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly&appid=a5a47c18197737e8eeca634cd6acb581&units=metric`, requestOptions)
            .then((response) => response.json())
            .then((result) => { return (result) })
            .catch((error) => { return (error) });
    }

    return {
        searchPlaces,
        searchForecastByCoords
    }
}

export default services;