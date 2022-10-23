<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="8">
              <v-card class="pa-2" outlined tile>
                <iframe :src="url" :width="width" :height="height"></iframe>
              </v-card>
            </v-col>
            <!-- contenedor de barra de busqueda y palabras -->
            <v-col cols="6" md="4" v-if="isSearcheble">
              <v-text-field
                label="Buscar palabra"
                style="margin-left: 15px"
                v-model="search"
              ></v-text-field>
              <br />
              <div class="box">
                <v-card
                  v-for="(palabra, index) in PalabrasFiltradas"
                  :key="index"
                  class="pa-2"
                  outlined
                  hover
                  style="margin: 4px 4px 4px 15px"
                >
                  {{ palabra.termino }}
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
  }),
  props: {
    url: String,
    width: Number,
    height: Number,
    palabras: Array,
    isSearcheble: Boolean,
  },
  computed: {
    PalabrasFiltradas: function () {
      return this.palabras.filter((palabras) => {
        palabras.termino.toLowerCase().match(this.search.toLowerCase());
        return palabras.termino.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.box {
  height: 400px;
  overflow: auto;
}
</style>
