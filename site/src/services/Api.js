import apisauce from 'apisauce'

const base = 'http://localhost:8000'

const create = (baseURL = base) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {},

    // 10 second timeout...
    timeout: 10000,
  })

  const uploadImage = async query =>
    api.get(`search/${query}/`)
      .then(resp => resp.data)

  const loadImage = () =>
    'QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg'

  return {
    uploadImage,
    loadImage,
  }
}

export default {
  create,
}
