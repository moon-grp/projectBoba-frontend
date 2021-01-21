<template>
  <div>
    <!--  <div>
    <v-row justify="center" class="mt-4">
      <div style="width: 800px" class="tabswitch">
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tab class="text-capitalize"> Home </v-tab>
          <v-tab class="text-capitalize"> Escrow </v-tab>
          <v-tab class="text-capitalize"> Profile </v-tab>
        </v-tabs>
      </div>
    </v-row>

    <div class="mt-8">
      <v-tabs-items v-model="tab">
        
        <v-tab-item>
          <v-row justify="center">
            <v-card width="200" height="120" color="#DAE3F7" tile
              ><div class="ml-4 mt-6 amtFmt" >Balance</div></v-card
            >
          </v-row>
        </v-tab-item>
        <v-tab-item class="tabdetail text-justify"> </v-tab-item>
        <v-tab-item class="tabdetail text-justify"> </v-tab-item>
      </v-tabs-items>
    </div> -->

    <v-row justify="end" class="mt-4">
      <v-card width="350" height="150" color="#DAE3F7" elevation="5" tile>
        <v-card-title class="amtFnt2"> Balance </v-card-title>

        <v-card-subtitle>
          <div class="mt-2 amtFnt">₦ {{ balance }}</div>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            class="text-capitalize ml-2"
            outlined
            color="#13274a"
            @click="dialog2 = true"
          >
            fund wallet
            <v-icon right> mdi-cash-plus </v-icon>
          </v-btn>
          <v-btn
            class="text-capitalize mx-auto"
            @click="dialog = true"
            outlined
            color="#13274a"
            >send cash
            <v-icon right> mdi-account-cash </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row class="mt-12" justify="start">
      <div class="text-capitalize amtFnt">transactions</div>
    </v-row>
    <v-row class="mt-6">
      <div class="tbl">
        <v-row justify="center" class="mt-6 text--disabled">
          <div>No transactions yet..</div>
        </v-row>
        <v-simple-table v-if="isTransactions">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left text-capitalize">#</th>
                <th class="text-left text-capitalize">transaction type</th>
                <th class="text-left text-capitalize">amount</th>
                <th class="text-left text-capitalize">transaction reference</th>
                <th class="text-left text-capitalize">other party</th>
                <th class="text-left text-capitalize">date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-row>

    <v-dialog persistent max-width="300px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Send cash</span>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-container>
            <v-row>
              <v-text-field
                label="Username"
                outlined
                color="#13274a"
                prefix="@"
                v-model="username"
              ></v-text-field>
              <v-text-field
                label="Amount"
                outlined
                color="#13274a"
                prefix="₦"
                v-model="amount"
                type="number"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn
            @click="sendCash"
            class="text-capitalize ml-2"
            outlined
            color="#13274a"
            >send cash
          </v-btn>
          <v-btn
            @click="dialog = false"
            class="text-capitalize mx-auto"
            outlined
            color="#13274a"
            >cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent max-width="300px" v-model="dialog2">
      <v-card>
        <v-card-title>
          <span class="headline">Deposit to wallet</span>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-container>
            <v-row>
              <v-text-field
                label="Amount"
                outlined
                type="number"
                color="#13274a"
                prefix="₦"
                v-model="depositAmount"
                :error-messages="depositAmountError"
                @input="$v.depositAmount.$touch()"
                @blur="$v.depositAmount.$touch()"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn
            @click="openPaystack"
            class="text-capitalize ml-2"
            outlined
            color="#13274a"
            >deposit cash
          </v-btn>
          <v-btn
            @click="dialog2 = false"
            class="text-capitalize ml-2"
            outlined
            color="#13274a"
            >cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
      {{ msg }}
    </v-snackbar>
    <v-snackbar v-model="snackbarErr" :timeout="timeout" color="error">
      {{ msg }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import transcationComp from '~/components/transactions.vue'
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
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
  mixins: [validationMixin],

  validations: {
    depositAmount: { required },
  },
  data() {
    return {
      timeout: 7000,
      snackbar: '',
      snackbarErr: '',
      username: '',
      amount: '',
      msg: '',
      depositAmount: '',
      balance: '',
      email: '',
      isTransactions: false,
      tab: null,
      dialog: false,
      dialog2: false,
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
  created() {
    this.userDetails()
  },
  computed: {
    depositAmountError() {
      const errors = []
      if (!this.$v.depositAmount.$dirty) return errors
      !this.$v.depositAmount.required && errors.push('Amount is required')
      return errors
    },
  },
  methods: {
    async sendCash() {
      try {
        const res = await this.$axios.$post(
          'https://project-boba-be.herokuapp.com/api/v1/user/sendcash',
          {
            username: this.username,
            amount: parseInt(this.amount),
          }
        )
        console.log(res)
        this.msg = res
        this.snackbar = true
      } catch (error) {
        console.log(error.response)
        this.msg = error.response.data
        this.snackbarErr = true
      }
    },
    async userDetails() {
      try {
        const res = await this.$axios.$get(
          'https://project-boba-be.herokuapp.com/api/v1/user/getuser'
        )
        console.log(res)
        this.balance = res.Balance
        this.email = res.email
        if (res.Transactions.length == 0) {
          this.isTransactions = false
        } else {
          this.isTransactions = true
        }
      } catch (error) {
        console.warn(error)
      }
    },
    openPaystack() {
      const token = JSON.parse(localStorage.getItem('token'))
      this.dialog2 = false
      var key = process.env.pAPI_KEY
      var amount = this.depositAmount
      var email = this.email
      var handler = PaystackPop.setup({
        key: key,
        email: email,
        amount: amount + '00',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
          custom_fields: [
            {
              display_name: 'Mobile Number',
              variable_name: 'mobile_number',
              value: '+2348012345678',
            },
          ],
        },
        callback: async function (response) {
          //  alert('success. transaction ref is ' + response.reference);
          axios
            .post(
              `https://project-boba-be.herokuapp.com/api/v1/user/fundwallet`,
              {
                referenceCode: response.reference,
                email: email,
                depositAmount: amount,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log(res)
            })

          console.log(name)
        },
        onClose: function () {},
      })
      handler.openIframe()
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
  color: #01579b;
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
