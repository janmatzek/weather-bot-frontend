import axios from 'axios'

const weatherBotUrl = 'http://localhost:3000/test'

export async function getWeatherInfo(input: string) {
    try {
        const response = await axios.post(weatherBotUrl, {
            userInput: input,
        })
        return response.data.message
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data.error)
            console.log(error)
            return error.response?.data.error
        }
    }
}
