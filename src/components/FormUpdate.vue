<template>
  <div>
    <b-modal id="modal-update" title="Editar libro" @ok="updateLibro">
      <label for="">Autor</label>
      <b-form-input required type="text" v-model="autor"></b-form-input>
      <label for="">Nombre libro</label>
      <b-form-input required type="text" v-model="nombre"></b-form-input>
      <label for="">Fecha de publicación</label>
      <b-form-input required type="date" v-model="fechaPublicacion"></b-form-input>
      <div v-if="imagen">
        <b-img v-if="imagen" :src="imagen" fluid thumbnail alt="image"></b-img>
      </div>
      <label for="">Imagen libro</label>
      <input required type="file" @change="convertirImagenABase64" class="form-control" />
    </b-modal>
  </div>
</template>
<script>
import services from '../services/service'
export default {
  props: {
    libro: Object,
  },
  data() {
    return {
      id: null,
      autor: null,
      nombre: null,
      fechaPublicacion: null,
      imagen: null,
    }
  },
  mounted() {
    this.id = this.libro.id
    this.autor = this.libro.author
    this.nombre = this.libro.nameBook
    this.fechaPublicacion = this.libro.publicationDate
    this.imagen = this.libro.image
  },
  watch: {
    libro: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.id = newVal.id
          this.autor = newVal.autor
          this.nombre = newVal.nombre
          this.fechaPublicacion = newVal.fechaPublicacion
          this.imagen = newVal.imagen
        }
      },
    },
  },
  methods: {
    convertirImagenABase64(event) {
      if (event.target.files.length > 0) {
        const archivo = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagen = e.target.result
        }
        reader.readAsDataURL(archivo)
      }
    },
    async updateLibro() {
      await services.updateLibro(this.id, this.autor, this.nombre, this.fechaPublicacion, this.imagen)
      location.reload()
    },
  },
  mounted() {
    this.autor = this.libro.author
    this.nombre = this.libro.nameBook
    this.fechaPublicacion = this.libro.publicationDate
    this.imagen = this.libro.image
  },
}
</script>
