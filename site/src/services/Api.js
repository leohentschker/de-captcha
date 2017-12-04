import apisauce from 'apisauce'

// determine the correct base url
const base = __DEV__ ? 'http://localhost:8000' : 'http://ec2-34-196-182-140.compute-1.amazonaws.com'

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

  const uploadImage = async (image, credentials) => {
    const data = new FormData()
    data.append('image', image)
    data.append('credentials', credentials)
    return api.post('upload/', data, { credentials })
      .then(resp => resp.data)
  }

  const getImage = async numCorrect =>
    api.get('image/', { numCorrect })
      .then(resp => resp.data)

  const submitLabel = async (multihash, label) =>
    api.put('label/', {
      multihash,
      label,
    })
      .then(resp => resp.data)

  const flagImage = async multihash =>
    api.put(`flag/${multihash}/`)
      .then(resp => resp.data)

  return {
    uploadImage,
    submitLabel,
    flagImage,
    getImage,
  }
}

export default {
  create,
}
