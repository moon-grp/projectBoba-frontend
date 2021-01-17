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
                ></v-text-field>
                <v-text-field
                  label="Escrow Condition(s)"
                  outlined
                  color="#13274a"
                ></v-text-field>
                <v-text-field
                  label="Escrow value"
                  outlined
                  color="#13274a"
                  prefix="$"
                ></v-text-field>
                <v-text-field
                  label="escrow expire date"
                  outlined
                  color="#13274a"
                ></v-text-field>
                <v-text-field
                  label="Username"
                  outlined
                  color="#13274a"
                  prefix="@"
                ></v-text-field>
                <v-card-actions>
                  <v-btn class="text-capitalize " outlined color="#13274a"
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
                ></v-text-field>
            
            
             </v-tab-item>
      </v-tabs-items>
    </div>
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
      tab: null,
      dialog: true,
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
    openPaystack() {
      var handler = PaystackPop.setup({
        key: key,
        email: 'olumidemm@gmail.com',
        amount: '400000',
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
              `https://mrkayenterprise.herokuapp.com/api/v1/user/payproduct`,
              {}
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
