<template>
  <div>
    <b-modal id="modal-insert" title="Insertar libro" @ok="saveLibro">
      <label for="">Autor</label>
      <b-form-input type="text" required v-model="autor"></b-form-input>
      <label for="">Nombre libro</label>
      <b-form-input type="text" required v-model="nombre"></b-form-input>
      <label for="">Fecha de publicación</label>
      <b-form-input type="date" required v-model="fechaPublicacion"></b-form-input>
        <div v-if="imagen">
            <b-img
            v-if="imagen"
            :src="imagen"
            fluid
            thumbnail
            alt="image"
            ></b-img>
        </div>
      <label for="">Imagen libro</label>
      <input required type="file" accept="image/*" @change="convertirImagenABase64" class="form-control">
    </b-modal>
  </div>
</template>
<script>
import services from '../services/service'
export default {
  data() {
    return {
      autor: null,
      nombre: null,
      fechaPublicacion: null,
      imagen: null,
    }
  },
  methods: {
    convertirImagenABase64(event) {
      if (event.target.files.length > 0) {
        const archivo = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagen = e.target.result;
        };
        reader.readAsDataURL(archivo);
      }
    },
    async saveLibro() {
       await services.saveLibro(this.autor, this.nombre, this.fechaPublicacion, this.imagen)
      location.reload()
    },
  },
}
</script>
