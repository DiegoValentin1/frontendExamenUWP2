<template>
    <div>
        <b-card
            :title="libro.nombre"
            :img-src="libro.imagen ? libro.imagen : 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2 card-custom"
        >
            <b-card-text >
                <h5 class="text-primary">{{libro.autor}}</h5>
                <p class="text-muted">{{libro.fechaPublicacion}}</p>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        libro: Object
    },
}
</script>

<style scoped>
.card-custom {
  max-width: 20rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  min-height: 30rem;
}

.card-custom:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>