import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://opentdb.com/',
})

export default function useAPI() {
  const getCategories = async () => {
    const response = await instance.get('api_category.php')
    return response.data.trivia_categories
  }

  const getQuestion = async (categoryId) => {
    const response = await instance.get('api.php', {
      params: {
        amount: 1,
        category: categoryId,
      },
    })
    return response.data.results[0]
  }
  return { instance, getCategories, getQuestion }
}