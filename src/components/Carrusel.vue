<template>
    <div>
        <b-carousel
            id="carousel-fade"
            :interval="3000"
            style="text-shadow: 0px 0px 20px #000; color: gray;"
            fade
            controls
            class="carousel-custom"
        >
            <b-carousel-slide
              class="carousel-item custom-object-fit"
              style="max-height: 300px; min-height: 300px;"
              v-for="(libro) in libros" 
              :key="libro.id"
              :caption="libro.nombre"
            >
            <img class="imagen-carr" :src="libro.imagen ? libro.imagen : 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'" alt="">
            <div class="libro_name">{{ libro.nombre }}</div>
          </b-carousel-slide> 
        </b-carousel>
    </div>
</template>
<script>
import services from "../services/service";
export default {
  data() {
    return {
      libros: [],
    };
  },
  methods: {
    async getLibros() {
      const response = await services.getLibros();
      this.libros = response;
    },
  },
  mounted() {
    this.getLibros();
  },
};
</script>

<style scoped>
.imagen-carr {
  max-height: 300px;
  min-width: 100%;
  object-fit: contain;
}

.libro_name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
  text-shadow: 0px 0px 20px #000;
}
</style>