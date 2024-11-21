import { ChatMessage } from './types'

export const ChatComponent = ({ chat }: { chat: Array<ChatMessage> }) => {
    return (
        <>
            {chat.map((message, index) => (
                <div
                    key={index}
                    className={`chat ${message.type === 'bot' ? 'chat-start' : 'chat-end'} text-left`}
                >
                    <div
                        className={`chat-bubble ${message.type === 'bot' ? 'chat-bubble-secondary' : 'chat-bubble-primary'}`}
                    >
                        {message.message}
                    </div>
                </div>
            ))}
        </>
    )
}
