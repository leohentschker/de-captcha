import apisauce from 'apisauce'

const base = 'http://localhost:8000'

const create = (baseURL = base) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      Authorization: 'Token 83c09dc7eb78764a8e2a9bcc9951f2a53c39c01c',
    },

    // 10 second timeout...
    timeout: 10000,
  })

  const uploadImage = async (image) => {
    const data = new FormData()
    data.append('image', image)
    return api.post('upload/', data)
  }

  const loadImage = () =>
    api.get('image/')
      .then(resp => resp.data)

  const submitLabel = async (multihash, label) =>
    api.put('label/', {
      multihash,
      label,
    })
      .then(resp => resp.data)

  return {
    uploadImage,
    submitLabel,
    loadImage,
  }
}

export default {
  create,
}
