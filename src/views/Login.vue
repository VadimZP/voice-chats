<template>
  <div>
    <form novalidate class="md-layout form-container" @submit.prevent="submit">

      <md-card class="md-layout-item md-size-50 md-small-size-100">
			<md-progress-bar md-mode="indeterminate" v-if="loading" />

        <md-card-header>
          <div class="md-title">Login</div>
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

				<span class="md-error" v-if="loginError">{{loginError}}</span>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="loading">Login</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import router from "../router";

export default {
  data() {
    return {
      loginError: "",
      loading: false,
      form: {
        password: "",
        username: ""
      }
    };
  },

  validations: {
    form: {
      password: { required },
      username: { required }
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

        const result = await this.$store.dispatch("login", {
          username: this.form.username,
          password: this.form.password
        });
        if (result) {
          setTimeout(() => {
            this.loading = false;
            router.push("home");
          }, 2000);
        }
      } catch (error) {
        this.loading = false;

        if (error.statusCode === 403) {
          this.loginError = error.message;
        }
        throw Error(error.message);
      }
    }
  }
};
</script>

<style lang="scss">
.form-container {
  justify-content: center;
}
</style>
