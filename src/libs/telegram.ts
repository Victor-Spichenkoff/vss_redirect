import axios from 'axios'

const telegramBotToken = '6746265132:AAHesfWPU4GGxYyWqnbDZSriNnkFcbRFi0E'

async function sendTelegramMensage(message: string): Promise<void> {
  if(process.env.NOT_SEND_TO_TELEGRAM=="true") 
    return console.log(`================\n${message}\n================`)

  const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

  console.log(process.env.TELEGRAM_CHAT_ID)
  const chat_id = process.env.TELEGRAM_CHAT_ID

  try {
    const response = await axios.post(apiUrl, {
        chat_id,
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