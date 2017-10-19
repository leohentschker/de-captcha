import apisauce from 'apisauce'

const base = 'http://ec2-34-196-182-140.compute-1.amazonaws.com'

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
      .then(resp => resp.data)
  }

  const loadImage = numCorrect =>
    api.get('image/', { numCorrect })
      .then(resp => resp.data)

  const submitLabel = async (multihash, label, numCorrect) =>
    api.put('label/', {
      numCorrect,
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
    loadImage,
  }
}

export default {
  create,
}
