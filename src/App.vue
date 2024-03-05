<template>
  <b-container style="height: 2000px; width: 100%;">
    <b-row class="mb-3" v-show="showElement">
      <b-col>
        <Carousel class="animate__animated animate__rubberBand" />
      </b-col>
    </b-row>
    <div class="d-flex justify-content-center mb-3">
      <b-button pill variant="outline-success" class="mx-2 animate__animated animate__rubberBand" @click="getAutor"> <b-icon icon="person-lines-fill"></b-icon> Ordenar por autor </b-button>
      <b-button pill variant="outline-success" class="mx-2 animate__animated animate__rubberBand" @click="getFecha"> <b-icon icon="calendar2-date-fill"></b-icon> Ordenar por fecha </b-button>
      <b-button pill variant="outline-success" class="mx-2 animate__animated animate__rubberBand" @click="getImage"> <b-icon icon="image-fill"></b-icon> Mostrar si tiene imagen </b-button>
      <b-button pill variant="outline-success" class="mx-2 animate__animated animate__rubberBand" v-b-modal.modal-insert> <b-icon icon="plus-circle-fill"></b-icon> Agregar </b-button>
    </div>
    <b-container fluid>
      <b-row class="justify-content-center mb-3" @dragover.prevent>
        <b-col md="6" class="card-custom text-center m-5">
          <b-icon class="p-3 manejarActualizacionborder-2 animate__animated animate__rubberBand" icon="pencil-square" style="width: 100px; height: 100px" @drop="manejarActualizacion"></b-icon>
        </b-col>
        <b-col md="6" class="card-custom text-center m-5">
          <b-icon class="p-3 manejarActualizacionborder-2 animate__animated animate__rubberBand" icon="trash-fill" style="width: 100px; height: 100px" @drop="manejarBorrado"></b-icon>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" v-for="(libro, index) in libros" :key="index" @dragstart="handleDragStart(libro.id)">
          <Tarjeta class="animate__animated animate__rubberBand mb-3" :libro="libro" />
        </b-col>
      </b-row>
    </b-container>

    <FormCreate />
    <FormUpdate :libro="libroUpdate" />
  </b-container>
</template>
<script>
import services from './services/service'
import Tarjeta from './components/Tarjeta.vue'
import Carousel from './components/Carrusel.vue'
import FormCreate from './components/FormCreate.vue'
import FormUpdate from './components/FormUpdate.vue'
export default {
  data() {
    return {
      id: null,
      autor: null,
      nombre: null,
      fechaPublicacion: null,
      imagen: null,
      showElement: true,
      lastScrollPosition: 0,
      libros: [],
      libroUpdate: {},
    }
  },
  components: {
    Tarjeta,
    Carousel,
    FormCreate,
    FormUpdate,
  },
  methods: {
    async getLibro() {
      const response = await services.getLibros()
      this.libros = response
    },
    async getAutor() {
      const response = await services.getAutor()
      this.libros = response
    },
    async getFecha() {
      const response = await services.getFecha()
      this.libros = response
    },
    async getImage() {
      const response = await services.getImagen()
      this.libros = response
    },
    async dropLibro(id) {
      if (confirm('¿Está seguro de eliminar el libro?')) {
        await services.deleteLibro(id)
        this.getLibro()
      } else {
        return
      }
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 100) {
        return
      }
      this.showElement = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    },
    handleDragStart(index) {
      event.dataTransfer.setData('text/plain', index)
    },

    manejarBorrado(event) {
      event.preventDefault()
      const index = event.dataTransfer.getData('text/plain')
      this.dropLibro(index)
    },
    manejarActualizacion(event) {
      event.preventDefault()
      const index = event.dataTransfer.getData('text/plain')
      this.libroUpdate = this.libros.find((libro) => libro.id === index)
      console.log(this.libroUpdate)
      this.$bvModal.show('modal-update')
    },
  },
  mounted() {
    this.getLibro()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
}
</script>

<style scoped>
body {
  background-color: #333;
  margin: 0;
}
.card-custom {
  max-width: 20rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

.card-custom:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
