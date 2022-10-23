<template>
  <div class="colorfondo">
    <v-container>
      <v-row>
        <v-card class="mx-auto" max-width="3000">
          <v-img
            height="620px"
            width="1260"
            src="https://i.ibb.co/nBzVxNc/imgN2.png"
          >
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

              <v-toolbar-title class="text-h6 white--text pl-0">
                Iniciar sesión
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn color="white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>
            <br /><br />

            <v-row>
              <v-col cols="12" sm="6" offset-sm="6">
                <v-card ref="form">
                  <v-card-text for="Username">
                    <v-text-field
                      id="username"
                      name="username"
                      v-model="input.username"
                      label="Usuario"
                      placeholder="Ingrese su usuario"
                      required
                    ></v-text-field>
                  </v-card-text>

                  <v-card-text for="password">
                    <v-text-field
                      type="password"
                      id="password"
                      name="password"
                      v-model="input.password"
                      label="Contraseña"
                      placeholder="Ingrese su contraseña"
                      required
                    ></v-text-field>
                  </v-card-text>
                  <v-divider class="mt-12"></v-divider>
                  <v-card-actions>
                    <v-btn
                      class="ma-2"
                      outlined
                      color="primary"
                      v-on:click="login()"
                    >
                      Acceder
                    </v-btn>
                    <v-spacer></v-spacer>
                    <router-link :to="{ name: 'inicio1' }" class="noneline">
                      <v-btn color="primary" text> Volver al inicio </v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-img>

          <v-card-text>
            <center>
              <v-card-text class="blue--text">
                {{ new Date().getFullYear() }} —
                <strong>Universidad de Córdoba</strong>
              </v-card-text>
            </center>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="red">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "Login",
  data() {
    return {
      snackbar: false,
      text: null,
      timeout: 2000,
      token: "",

      input: {
        username: "",
        password: "",
      },
    };
  },

  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
      this.$router.push("/formulario");
    }
  },
  methods: {
    login() {
      axios
        .post("https://mapa-back.onrender.com/login", this.input)
        .then((response) => {
          if (response.data.message == "Sesion iniciada con exito") {
            this.token = response.data.token;
            this.persist();
            return this.$router.push("formulario");
          }
          if (
            response.data == "Usuario o contraseña incorrecta" ||
            response.data == "El usuario no existe"
          ) {
            this.text = "Usuario o contraseña incorrecta";
            return (this.snackbar = true);
          }
          if (response.data.status == 500) {
            this.text = "Error en el servidor";
            return (this.snackbar = true);
          }
        });
    },
    persist() {
      localStorage.token = this.token;
    },
    errorToast(message) {
      this.$buefy.toast.open({
        duration: 2500,
        message: message,
        position: "is-bottom",
        type: "is-danger",
      });
    },
  },
};
</script>
<style>
.contenedor1 {
  height: 500px;
  width: 1208px;
}
</style>
