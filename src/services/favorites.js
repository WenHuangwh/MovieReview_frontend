import axios from "axios";

class FavoritesDataService {

    getAll(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${id}`);
    }

    updateFavorites(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }

    getMyfav(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/myfav/${id}`);
    }

    updateMyfav(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/myfav`, data);
    }
}

export default new FavoritesDataService();