import './App.css'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { ChatMessage } from './types'

function App() {
    const weatherBotUrl = 'http://localhost:3000/test'
    const [userInput, setUserInput] = useState('')
    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setUserInput(event.target.value)

    const defaultMessage: ChatMessage = {
        type: 'bot',
        message:
            'Hi! I am the weather bot. You can ask me about the weather on any city and I will fetch a forecast for you. Try it out!',
    }

    const [chat, setChat] = useState<Array<ChatMessage>>([defaultMessage])

    function ChatComponent() {
        return (
            <>
                {chat.map((message, index) => (
                    <div
                        key={index}
                        className={`chat chat-${message.type === 'bot' ? 'start' : 'end'} ${message.type === 'bot' ? 'text-left' : 'text-right'}`}
                    >
                        <div className="chat-bubble">{message.message}</div>
                    </div>
                ))}
            </>
        )
    }

    async function getWeatherInfo(input: string) {
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
    async function handleSendClick() {
        // get the user input, store it in a variable and clear the input field
        const message = userInput
        setUserInput('')

        // add a new bubble with user message to the chat component
        setChat((chat) => [...chat, { type: 'user', message }])

        // send the contents to weatherBot and await response
        const weather = await getWeatherInfo(message)

        // add a new bubble with response from weatherBot to the chat component
        setChat((chat) => [...chat, { type: 'bot', message: weather }])
    }
    return (
        <>
            <div className="m-10 rounded-xl border border-gray-200 px-10 py-5">
                <ChatComponent />
            </div>
            <div className="m-10 rounded-xl border border-gray-200 px-10 py-5">
                {/* the input component */}
                <textarea
                    className="textarea textarea-ghost"
                    placeholder="Ask me about the weather..."
                    value={userInput}
                    onChange={handleInputChange}
                ></textarea>
                {/* disable button when input text area empty */}
                <button className="btn rounded-full" onClick={handleSendClick}>
                    ⬆
                </button>
            </div>
        </>
    )
}

export default App
