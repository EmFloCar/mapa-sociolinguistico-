<template>
  <div>
    <v-app>
      <div class="colorfondo">
        <v-container fluid>
          <v-card class="overflow-hidden">
            <v-app-bar absolute color="#305DBF" dark height="100">
              <!--  <template v-slot:img="{ props }">
                <v-img v-bind="props"></v-img>
              </template>

              <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

              <v-app-bar-title
                ><h4>Mapa sociolingüístico interactivo</h4>
                <h4>de la ciudad de Montería</h4></v-app-bar-title
              >

              <v-spacer></v-spacer>

              <router-link :to="{ name: 'creditos' }" class="noneline">
                <!--              //<v-icon>{{ icons.mdiAccount }}</v-icon> -->
                <div class="mx-2"></div>
              </router-link>
            </v-app-bar>
            <v-sheet max-height="1200">
              <v-container style="height: 1200px">
                <br />
                <br />
                <br />
                <br />
                <br />

                <div>
                  <v-row>
                    <v-col cols="6" md="3">
                      <div>
                        <v-card>
                          <v-navigation-drawer permanent expand-on-hover>
                            <v-list>
                              <v-list-item class="px-2">
                                <v-list-item-avatar>
                                  <v-img
                                    src="https://i.ibb.co/pjtXJCd/settings.png"
                                  ></v-img>
                                </v-list-item-avatar>
                              </v-list-item>

                              <v-list-item link>
                                <v-list-item-content>
                                  <v-list-item-title class="text-h6">
                                    Administrador
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>

                            <v-divider></v-divider>

                            <v-list nav>
                              <v-list-item to="/principal">
                                <v-list-item-icon>
                                  <v-icon>mdi-home</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Inicio</v-list-item-title>
                              </v-list-item>
                              <v-list-item link v-on:click="cerrarSesion()">
                                <v-list-item-icon>
                                  <v-icon>mdi-account-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Salir</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-navigation-drawer>
                        </v-card>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="9">
                      <v-card class="mx-auto" max-width="800">
                        <v-toolbar>
                          <v-tabs dark background-color="primary" grow>
                            <v-tab to="/formulario">
                              <!-- <v-badge color="pink" dot> -->
                              <span>Agregar</span>

                              <v-icon>mdi-plus</v-icon>
                              <!-- </v-badge> -->
                            </v-tab>

                            <v-tab to="/tabla">
                              <!-- <v-badge color="green" content="6"> -->
                              <span>Administrar</span>

                              <v-icon>mdi-lead-pencil</v-icon>
                              <!-- </v-badge> -->
                            </v-tab>
                          </v-tabs>
                        </v-toolbar>

                        <v-card-title>
                          <h6>Añadir palabras</h6>
                        </v-card-title>

                        <v-card-text class="text--primary">
                          <div>
                            Ingrese en el campo correspondiente la palabra o el
                            termino que desea agregar a la base de datos y
                            seleccione la(s) comuna(s) a la que pertenece dicha
                            palabra.
                          </div>
                        </v-card-text>
                        <v-card
                          :loading="loading"
                          class="mx-auto my-12"
                          max-width="464"
                        >
                          <template slot="progress">
                            <v-progress-linear
                              color="deep-purple"
                              height="10"
                              indeterminate
                            ></v-progress-linear>
                          </template>

                          <v-form>
                            <v-text-field
                              label="Termino"
                              outlined
                              dense
                              required
                              v-model="nuevoTermino.termino"
                            >
                            </v-text-field>
                            <v-checkbox
                              v-for="comuna in listaComunas"
                              :key="comuna"
                              :label="'Comuna ' + `${comuna}`"
                              :value="comuna"
                              v-model="nuevoTermino.comuna"
                            >
                            </v-checkbox>
                            <v-divider class="mx-4"></v-divider>
                            <br />
                            <v-btn
                              depressed
                              color="primary"
                              v-on:click="guardar(), limpiar()"
                            >
                              Guardar
                            </v-btn>
                            <br />
                          </v-form>

                          <br />
                        </v-card>
                      </v-card>
                      <center>
                        <v-card-text class="blue--text">
                          {{ new Date().getFullYear() }} —
                          <strong>Universidad de Córdoba</strong>
                        </v-card-text>
                      </center>
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-sheet>
          </v-card>
        </v-container>
      </div>
    </v-app>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      ruta: "https://mapa-back.onrender.com/",
      nuevoTermino: {
        termino: "",
        comuna: [],
      },

      listaComunas: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  mounted() {
    if (!localStorage.token) {
      return this.$router.replace("/noauth");
    }
  },
  methods: {
    limpiar() {
      (this.nuevoTermino.termino = ""), (this.nuevoTermino.comuna = []);
    },

    guardar() {
      axios
        .post("https://mapa-back.onrender.com/new", this.nuevoTermino)
        .then((response) => {
          console.log(response);
        });
    },

    cerrarSesion() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    // axios.post(this.ruta, this.nuevoTermino).then(response=>{console.log(response)})
  },
};
</script>
