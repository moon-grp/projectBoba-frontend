<template>
  <div>
    <v-row>
      <v-col cols="6" md="6" sm="12">
        <div id="boxSpace">
          <div class="trs fnt mb-5">
            join the <span class="coll">wish-list.</span>
          </div>

          <v-row>
            <v-col>
              <div>
                <v-text-field
                  outlined
                  label="Name"
                  prepend-inner-icon="mdi-account"
                  class="text-capitalize tf"
                  color="#6C63FF"
                  v-model="name"
                  :error-messages="nameError"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>

                <v-text-field
                  outlined
                  label="Email"
                  prepend-inner-icon="mdi-email-outline"
                  class="text-capitalize tf"
                  color="#6C63FF"
                  v-model="email"
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>

                <v-text-field
                  outlined
                  label="Password"
                  prepend-inner-icon="mdi-key"
                  class="text-capitalize tf"
                  color="#6C63FF"
                  v-model="password"
                  :error-messages="passwordErros"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
              </div>
              <v-btn
                color="#6C63FF"
                class="fnt-p trs"
                outlined
                dark
                :loading="loading"
                @click="signUp"
              >
                join us
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <div class="mx-auto">
          <Lottie
            :width="600"
            :height="500"
            :options="lottieOptions"
            v-on:animCreated="handleAnimation"
          />
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
      {{ msg }}
    </v-snackbar>
    <v-snackbar v-model="snackbarErr" :timeout="timeout" color="error">
      {{ msg }}
    </v-snackbar>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import Lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '~/assets/ani1.json'
export default {
  layout: 'authpages',
  mixins: [validationMixin],

  validations: {
    name: { required },

    password: { required, minLength: minLength(8) },

    email: { required, email },
  },
  components: {
    Lottie,
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      name: null,
      email: null,
      password: null,
      loading: false,
      snackbar: false,
      snackbarErr: false,
      timeout: 7000,
      msg: '',
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    async signUp() {
      this.loading = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          let res = await this.$store.dispatch('signUp', {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          this.msg = res.data.message
          console.log(res)
          localStorage.setItem('token', JSON.stringify(res.data.token))
          this.snackbar = true
          this.loading = false
          this.$router.push({ name: 'wish' })
        } catch (error) {
          console.log(error.response)
          this.msg = error.response.data
          this.snackbarErr = true
          this.loading = false
        }
      } else {
        this.loading = false
      }
    },
  },
  computed: {
    nameError() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Your name is required.')
      return errors
    },
    passwordErros() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Password must be at most 8 characters long')
      !this.$v.password.required && errors.push('Your password is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('Your E-mail is required')
      return errors
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

#boxSpace {
  margin-top: 10%;
  margin-bottom: 10%;
}

.fnt {
  font-family: 'Poppins', sans-serif;
  font-size: 35px;
}

.fnt-p {
  font-family: 'Poppins', sans-serif;
}

.trs {
  text-transform: capitalize;
}

.tf {
  border-radius: 10px;
}

.coll {
  color: #6c63ff;
  font-size: 50px;
}
</style>
