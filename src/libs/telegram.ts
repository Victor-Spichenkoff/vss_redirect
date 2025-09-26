import axios from 'axios'

const telegramBotToken = '6746265132:AAHesfWPU4GGxYyWqnbDZSriNnkFcbRFi0E'

async function sendTelegramMensage(message: string): Promise<void> {
  if(process.env.SEND_TO_TELEGRAM=="false") 
    return

  const chatId = '1139085287'

  const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`


  try {
    const response = await axios.post(apiUrl, {
        chat_id: chatId,
        text: message,
      });
    // const responseData = await response.data

    if (response.data.ok) {
      console.log('message enviada com sucesso.')
    } else {
      console.error('Erro ao enviar message:', response.data.description)
    }
  } catch (error:any) {
    console.error('Erro na requisição:', error.message)
  }
}



export { sendTelegramMensage }