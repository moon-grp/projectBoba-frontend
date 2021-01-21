<template>
  <div>
    <v-row justify="center" class="mt-4">
      <div style="width: 800px" class="tabswitch">
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tab class="text-capitalize"> create escrow</v-tab>
          <v-tab class="text-capitalize"> view escrow</v-tab>
        </v-tabs>
      </div>
    </v-row>

    <div class="mt-8">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container>
            <v-row class="mt-4" justify="center">
              <v-card width="500px" class="px-4 pt-8">
                <v-text-field
                  label="Title of escrow"
                  outlined
                  color="#13274a"
                  v-model="esTitle"
                ></v-text-field>
                <v-text-field
                  label="Escrow Condition(s)"
                  outlined
                  color="#13274a"
                  v-model="esCondition"
                ></v-text-field>
                <v-text-field
                  label="Escrow value"
                  outlined
                  color="#13274a"
                  prefix="$"
                  type="number"
                  v-model="esValue"
                ></v-text-field>
                <v-text-field
                  label="escrow expire date"
                  outlined
                  color="#13274a"
                  v-model="esEx"
                ></v-text-field>
                <v-text-field
                  label="Username"
                  outlined
                  color="#13274a"
                  prefix="@"
                  v-model="esGuest"
                ></v-text-field>
                <v-card-actions>
                  <v-btn
                    @click="createEs"
                    class="text-capitalize"
                    outlined
                    color="#13274a"
                    >create escrow
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item class="tabdetail text-justify">
          <v-text-field
            label="Escrow Id.."
            outlined
            color="#13274a"
            v-model="esId"
            append-icon="mdi-map-marker"
            @click:append="getEscrowDetails"
          ></v-text-field>

          <v-card class="mx-auto" max-width="600" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div
                  class="text-capitalize headline mb-4 text-decoration-underline"
                >
                  {{ Title }}
                </div>
                <v-list-item-title class="text-capitalize overline mb-1">
                  {{ Condition }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-capitalize">{{
                  duration
                }}</v-list-item-subtitle>
                 <v-list-item-subtitle class="text-capitalize">{{
                  value
                }}</v-list-item-subtitle>
                
              </v-list-item-content>
            </v-list-item>


            <v-card-actions>
              <v-btn outlined rounded text> Button </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
      {{ msg }}
    </v-snackbar>
    <v-snackbar v-model="snackbarErr" :timeout="timeout" color="error">
      {{ msg }}
    </v-snackbar>
  </div>
</template>

<script>
import transcationComp from '~/components/transactions.vue'
export default {
  layout: 'authpages',
  components: {
    transcationComp,
  },
  head() {
    return {
      script: [{ src: 'https://js.paystack.co/v1/inline.js' }],
    }
  },
  data() {
    return {
      value:'',
      Title: '',
      Condition: '',
      duration: '',
      esId: '',
      msg: '',
      snackbar: false,
      snackbarErr: false,
      timeout: 7000,
      tab: null,
      dialog: true,
      esGuest: '',
      esEx: '',
      esValue: '',
      esCondition: '',
      esTitle: '',
      getEscrowId: '',
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  methods: {
    a() {
      alert('sfggs')
    },
    async getEscrowDetails() {
      try {
        const res = await this.$axios.$get(
          `https://project-boba-be.herokuapp.com/api/v1/user/viewescrow/${this.esId}`
        )
        console.log(res)
        this.Title = res.escrowTitle
        this.Condition = res.escrowCondition
        this.duration = res.escrowDuration
        this.value = res.escrowValue
        this.msg = res
        this.snackbar = true
      } catch (error) {
        console.log(error)
        this.msg = error.response.data
        this.snackbarErr = true
      }
    },
    async createEs() {
      try {
        const res = await this.$axios.$post(
          'https://project-boba-be.herokuapp.com/api/v1/user/createescrow',
          {
            guest: this.esGuest,
            escrowValue: parseInt(this.esValue),
            escrowTitle: this.esTitle,
            escrowCondition: this.esCondition,
            escrowDuration: this.esEx,
          }
        )
        console.log(res)
        this.msg = res
        this.snackbar = true
      } catch (error) {
        console.log(error)
        this.msg = error.response.data
        this.snackbarErr = true
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.tabswitch {
  border: 2px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 8px;
}
.tabtitle {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #13274a;
}

.brd {
  border-radius: 25px;
}

.amtFnt {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  color: #3a3a3a;
  font-weight: 300;
}

.amtFnt2 {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: #3a3a3a;
  font-weight: 100;
}
.tbl {
  width: 90vw;
}
</style>
