import axios from "axios";

const getAll = async () => {
    const response = await axios.get('/api/diaries')
    return response.data;
}

interface AddedDiary {
    date: string;
    weather: string;
    visibility: string;
    comment?: string;
  }

const addDiaries = async (data: AddedDiary) => {
    const response = await axios.post('/api/diaries', data)
    return response.data
}

export default {
    getAll,
    addDiaries

}