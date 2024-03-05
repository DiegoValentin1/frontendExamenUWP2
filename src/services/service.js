import axios from 'axios'

const API_URL = 'http://192.168.34.243:8080/api/libros/'

const getLibros = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data
  } catch (error) {
    return []
  }
}

const getAutor = async () => {
  try {
    const response = await axios.get(API_URL + 'autor')
    return response.data.data
  } catch (error) {
    return []
  }
}

const getFecha = async () => {
  try {
    const response = await axios.get(API_URL + 'fecha')
    return response.data.data
  } catch (error) {
    return []
  }
}

const getImagen = async () => {
  try {
    const response = await axios.get(API_URL + 'imagen')
    return response.data.data
  } catch (error) {
    return []
  }
}

const saveLibro = async (autor_libro, nombre_libro, fecha_publicacion, imagen_libro) => {
  try {
    const response = await axios.post(API_URL, {
      autor: autor_libro,
      nombre: nombre_libro,
      fechaPublicacion: fecha_publicacion,
      imagen: imagen_libro,
    })
    return response
  } catch (error) {
    return error
  }
}

const deleteLibro = async (id_Libro) => {
  try {
    const response = await axios.delete(API_URL + id_Libro)
    return response
  } catch (error) {
    return error
  }
}

const updateLibro = async (id_libro, autor_libro, nombre_libro, fecha_publicacion, imagen_libro) => {
  try {
    try {
      const response = await axios.post(API_URL, {
        id: id_libro,
        autor: autor_libro,
        nombre: nombre_libro,
        fechaPublicacion: fecha_publicacion,
        imagen: imagen_libro,
      })
      return response
    } catch (error) {
      return error
    }
  } catch (error) {
    return error
  }
}

export default {
  getLibros,
  getAutor,
  getFecha,
  saveLibro,
  deleteLibro,
  updateLibro,
  getImagen,
}
