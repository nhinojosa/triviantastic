import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://opentdb.com/'
}
)

export default function useApi() {
    const getCategories = async () => {
        const response = await instance.get('api_category.php')
        return response.data.trivia_categories
    }
    return {instance, getCategories}
}