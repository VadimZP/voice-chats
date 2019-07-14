<template>
  <div>
    <form novalidate class="md-layout form-container" @submit.prevent="submit">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-progress-bar md-mode="indeterminate" v-if="loading" />

        <md-card-header>
          <div class="md-title">Sign Up</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('username')">
            <label for="first-name">Username</label>
            <md-input
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              v-model="form.username"
            />
            <span class="md-error" v-if="!$v.form.username.required">Username is required</span>
            <span class="md-error" v-else-if="!$v.form.username.minlength">Invalid username</span>
          </md-field>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
            />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input
              type="password"
              name="password"
              id="password"
              autocomplete="password"
              v-model="form.password"
            />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.form.password">Invalid password</span>
          </md-field>
        </md-card-content>

        <span class="md-error" v-if="signUpError">{{signUpError}}</span>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="loading">Sign Up</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="successfulRegistration">Thanks for registration!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

import router from "../router";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      signUpError: "",
      loading: false,
      successfulRegistration: false,
      form: {
        username: "",
        email: "",
        password: ""
      }
    };
  },

  validations: {
    form: {
      username: { required, min: minLength(3) },
      email: { required, email },
      password: { required, min: minLength(6) }
    }
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
      try {
        this.loading = true;
        const result = await this.$store.dispatch("signup", {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        });
        if (result) {
          this.successfulRegistration = true;
          setTimeout(() => {
            this.loading = false;
            router.push("login");
          }, 2000);
        }
      } catch (error) {
        this.loading = false;

        if (error.statusCode === 409) {
          this.signUpError = 'This username is already registered';
        }
        throw Error(error.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  justify-content: center;
}
</style>
