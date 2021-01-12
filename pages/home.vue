<template>
  <div>
    <v-row justify="center" class="mt-4">
      <div style="width: 800px" class="tabswitch">
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tab class="text-capitalize"> Home </v-tab>
          <v-tab class="text-capitalize"> Escrow </v-tab>
          <v-tab class="text-capitalize"> Profile </v-tab>
        </v-tabs>
      </div>
    </v-row>

    <v-row justify="end" class="mt-8">
      <div>
        <v-tabs-items v-model="tab">
          <!--first tab-->
          <v-tab-item class="tabdetail ">
        <transcationComp />
          </v-tab-item>
          <v-tab-item class="tabdetail text-justify">
            Agents can market their services to potential tenants and landlords
            based on positive reviews from other users, as well as, their
            performance. Agents can track all their mandates, landlords,
            tenants, properties, and tenancy agreements within the platform,
            without the need for a back-office or filing system. The platform
            presents the agent for each property, as designated by the landlord,
            so that prospective tenants can easily identify and communicate with
            the authorized agent for each property.
          </v-tab-item>
          <v-tab-item class="tabdetail text-justify">
            tenant can market their services to potential tenants and landlords
            based on positive reviews from other users, as well as, their
            performance. Agents can track all their mandates, landlords,
            tenants, properties, and tenancy agreements within the platform,
            without the need for a back-office or filing system. The platform
            presents the agent for each property, as designated by the landlord,
            so that prospective tenants can easily identify and communicate with
            the authorized agent for each property.
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-row>
  </div>
</template>

<script>
import transcationComp from '~/components/transactions.vue'
export default {
  layout: 'authpages',
  components: {
    transcationComp,
  },
  data() {
    return {
      tab: null,
    }
  },
}
</script>

<style scoped>
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
</style>
