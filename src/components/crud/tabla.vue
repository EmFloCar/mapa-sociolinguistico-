<template>
  <div>
    <div>
      <v-app>
        <div class="colorfondo">
          <v-container fluid>
            <v-card class="overflow-hidden">
              <v-app-bar absolute color="#305DBF" dark height="100">
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
                            <h6>Gestión lexical</h6>
                          </v-card-title>

                          <v-card-text class="text--primary">
                            <div>
                              En la siguiente tabla se muestran todas las
                              expresiones lexicales almacenadas en la base de
                              datos.
                            </div>
                          </v-card-text>
                          <v-container>
                            <v-simple-table class="d-flex justify-center">
                              <template>
                                <thead>
                                  <tr>
                                    <th>Palabra</th>
                                    <th>Comunas</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="palabra in palabras"
                                    :key="palabra.palabra"
                                  >
                                    <td>{{ palabra.termino }}</td>
                                    <td>{{ palabra.comuna.join(", ") }}</td>
                                    <td>
                                      <v-btn
                                        color="blue"
                                        v-on:click="editar(palabra._id)"
                                      >
                                        <v-icon color="white"
                                          >mdi-pencil
                                        </v-icon>
                                      </v-btn>
                                    </td>
                                    <td>
                                      <v-row justify="center">
                                        <v-dialog
                                          v-model="dialog"
                                          persistent
                                          max-width="290"
                                        >
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-btn
                                              color="red"
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              <v-icon color="white"
                                                >mdi-delete
                                              </v-icon>
                                            </v-btn>
                                          </template>
                                          <v-card>
                                            <v-card-title class="text-h5">
                                              Borrar entrada
                                            </v-card-title>
                                            <v-card-text
                                              >Estás seguro que quieres
                                              <b>borrar</b> esta entrada? Esta
                                              acción no se puede
                                              deshacer.</v-card-text
                                            >
                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn
                                                color="green darken-1"
                                                text
                                                @click="dialog = false"
                                              >
                                                Cancelar
                                              </v-btn>
                                              <v-btn
                                                color="red"
                                                text
                                                @click="
                                                  eliminar(palabra._id),
                                                    (dialog = false)
                                                "
                                              >
                                                Borrar
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>
                                      </v-row>
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-container>
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
  </div>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      dialog: false,
      palabras: [],
    };
  },
  async mounted() {
    if (!localStorage.token) {
      return this.$router.replace("/noauth");
    }
    let response = await axios.get("https://mapa-back.onrender.com");
    this.palabras = response.data;
    console.log(response.data);
  },

  methods: {
    async eliminar(id) {
      let response = await axios.delete("https://mapa-back.onrender.com/" + id);
      this.palabras = this.palabras.filter((el) => el._id !== id);
      console.log(response);
    },
    editar(id) {
      this.$router.push("/editar/" + id);
    },

    cerrarSesion() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>