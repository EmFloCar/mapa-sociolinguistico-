<template>
  <v-app>
    <div class="colorfondo">
      <v-container fluid>
        <v-card class="overflow-hidden">
          <v-app-bar absolute color="#305DBF" dark height="100">
            <template v-slot:img="{ props }">
              <v-img v-bind="props"></v-img>
            </template>
            <router-link :to="{ name: 'inicio1' }" class="noneline">
              <v-app-bar-title style="color:white;"
                ><h4>Mapa sociolingüístico interactivo</h4>
                <h4>de la ciudad de Montería</h4></v-app-bar-title
              >
            </router-link>
            <v-spacer></v-spacer>

            <router-link :to="{ name: 'creditos' }" class="noneline">
              <!--              //<v-icon>{{ icons.mdiAccount }}</v-icon> -->
              <div class="mx-2"></div>
            </router-link>
            <!-- <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field> -->
            <!--             <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn> -->
            <v-dialog transition="dialog-bottom-transition" max-width="900">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                  <v-icon>{{ icons.mdiAccount }}</v-icon>
                </v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-card-text>
                    <div class="text-h2 pa-12">
                      <v-card class="mx-auto my-12" max-width="684">
                        <v-card-title>Acerca de:</v-card-title>
                        <v-card-text>
                          <v-row align="center" class="mx-0"> </v-row>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-text
                          >El
                          <b
                            >Mapa sociolingüístico interactivo de la ciudad de
                            Montería</b
                          >, es un software derivado del proyecto de
                          investigación que tiene su mismo nombre, cuya
                          finalidad principal es identificar de forma
                          cartográfica (mapa)e interactiva las distintas
                          expresiones lexicales manifestadas en las jergas de
                          los grupos sociales representativos de la ciudad de
                          Montería - Córdoba, tales como los mototaxistas, los
                          comerciantes, los estudiantes, etc. Distribuidos en
                          las diferentes comunas de la ciudad para una mejor
                          comprensión teniendo en cuenta la finalidad pedagógica
                          de este.</v-card-text
                        >

                        <v-card-text> </v-card-text>

                        <v-card-actions>
                          <!--    <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn> -->
                          <v-btn class="ma-2" outlined color="success">
                            Ver más
                          </v-btn>
                          <v-btn text @click="dialog.value = false"
                            >Cerrar</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <!--                     <v-btn class="ma-2" outlined color="primary">
                      Equipo de trabajo
                    </v-btn> -->
                    <img
                      src="https://i.ibb.co/zHcNkgt/unicor.png"
                      alt="unicor"
                      border="0"
                      class="universidad"
                    />
                    <!--                     <v-btn class="ma-2" outlined color="orange">
                      Ayuda y soporte
                    </v-btn> -->
                    <img
                      src="https://i.ibb.co/MSgXLHh/l.png"
                      alt="l"
                      border="0"
                      class="lexicon"
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <!--      <v-btn icon>
              <v-icon>mdi-home</v-icon>
            </v-btn> -->
            <router-link :to="{ name: 'login' }" class="noneline">
              <v-btn icon>
                <v-avatar>
                  <img src="https://i.ibb.co/0fHsR36/apoyo.png" alt="admin" />
                </v-avatar>
              </v-btn>
            </router-link>
          </v-app-bar>
          <v-sheet max-height="760">
            <v-container style="height: 1000px;">
              <br />
              <br />
              <br />
              <br />
              <br />
              <div>
                <v-row>
                  <v-col cols="2">
                    <div>
                      <v-row>
                        <v-col> </v-col>
                        <v-col>
                          <div
                            style="border: 0px solid powderblue"
                            class="div-select"
                          >
                            <v-container fluid>
                              <v-row align="center">
                                <v-col class="d-flex" cols="12" sm="12">
                                  <v-expansion-panels>
                                    <v-expansion-panel>
                                      <v-expansion-panel-header>
                                        <h2>Comuna</h2>
                                      </v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <v-btn
                                          v-for="(item, index) in comunas"
                                          :key="index"
                                          class="ma-2"
                                          depressed
                                          color="cyan"
                                          @click="com = index"
                                        >
                                          {{ comunas[index].comuna }}
                                        </v-btn>
                                        <br />
                                        <br />
                                      </v-expansion-panel-content>
                                    </v-expansion-panel>
                                  </v-expansion-panels>
                                </v-col>
                              </v-row>
                            </v-container>
                          </div>
                        </v-col>
                      </v-row>
                      <br />
                    </div>
                  </v-col>

                  <v-col cols="10">
                    <div style="border: 1px solid powderblue">
                      <br />
                      <mapa
                        :url="this.comunas[com].mapaUrl"
                        :width="this.comunas[com].width"
                        :height="this.comunas[com].height"
                        :palabras="this.comunas[com].palabras"
                      />
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-sheet>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script>
// const axios = require("axios");
import mapa from "./mapa.vue";
import { mdiAccount } from "@mdi/js";
export default {
  name: "App",

  components: {
    mapa,
  },
  data() {
    return {
      search: "",
      icons: {
        mdiAccount,
      },
      palabras: [
        {
          termino: "basado",
          comuna: [7, 1, 2],
        },
        {
          termino: "aleman",
          comuna: [7, 1, 9],
        },
        {
          termino: "casa",
          comuna: [7, 1, 9],
        },
        {
          termino: "domingo",
          comuna: [1, 7, 5, 9],
        },
        {
          termino: "xoxo",
          comuna: [1, 7, 5, 9],
        },
        {
          termino: "el pepe",
          comuna: [1, 7, 5, 9],
        },
      ],
      com: 0,
      comunas: [
        {
          comuna: "Montería",
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1Z3zNCXWCoFiz-3CXLTI--4yoougXbSqd&ehbc=2E312F",
          width: 610,
          height: 500,
        }, //general
        {
          comuna: 1,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1sGtUBNn1t56F-_vN1VeBfTLqD4chOREw&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 2,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1yhzIKq2qRtst39cyyjdRf-3K5RulXZr2&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 3,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1kfVWDlnRBb7tg8CBa12o3KPOPUaKt4sG&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 4,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=12-F1xq5M3_vEd1GBFWdiwteEZtiQORlK&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 5,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=13K7BndeZl5plt5Yr_CZ5KZOznVSldQf9&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 6,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1Dfkk95_HPtpsBDOwna606s3clZ_Jnfax&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 7,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1pb6yRMcQ0zbuf_vIqdFejKs4vZ-npMJK&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 8,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1wBKoV-ra23aHoaZ_7u64Md49XNAhcNMg&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
        {
          comuna: 9,
          mapaUrl:
            "https://www.google.com/maps/d/u/0/embed?mid=1S9Rvg4EQQ011fMVDf7Pv7B5j3nMkKgPq&ehbc=2E312F",
          width: 610,
          height: 500,
          palabras: [],
        },
      ],
    };
  },
  async mounted() {
    // let response = await axios.get("https://mapa-back.onrender.com/");
    // this.palabras = response.data;
    // console.log(response.data);

    this.palabras.sort((a, b) => {
      console.log(this.palabras)
      if(a.termino.toLowerCase() < b.termino.toLowerCase()) return -1
      if(a.termino.toLowerCase() > b.termino.toLowerCase()) return 1
      return 0
    });

    for (let index = 1; index < this.comunas.length; index++) {
      for (let i = 0; i < this.palabras.length; i++) {
        if (this.palabras[i].comuna.length > 1) {
          for (let j = 0; j < this.palabras[i].comuna.length; j++) {
            if (this.palabras[i].comuna[j] == index) {
              this.comunas[index].palabras.push(this.palabras[i]);
            }
          }
        } else {
          if (this.palabras[i].comuna[0] == index) {
            this.comunas[index].palabras.push(this.palabras[i]);
          }
        }
      }
    }
    
  },

  computed: {
    
  }
};
</script>

<style>
.divbarrios {
  border-radius: 1rem;
}
.colorfondo {
  background-color: #d6d6d6;
}
.div-select {
  border-radius: 0.5rem;
}
.screen {
  position: relative;
}
.innerdiv {
  position: absolute;
  bottom: 0;
  left: 0;
}
.universidad {
  height: 95px;
  width: 140px;
  padding-left: 10px;
}
.lexicon {
  width: 100px;
  height: 90px;
  display: flex;

  padding-left: 10px;
}
</style>
