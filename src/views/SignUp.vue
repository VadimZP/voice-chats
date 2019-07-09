<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <div :class="{ 'hasError': $v.form.username.$error }">
                <label for="username">Username</label>
                <input type="username" name="username" v-model="form.username">
            </div>
            <div :class="{ 'hasError': $v.form.email.$error }">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="form.email">
            </div>
            <div :class="{ 'hasError': $v.form.password.$error }">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="form.password">
            </div>
            <button type="submit" class="button">
                Submit
            </button>
        </form>
        <p v-if="loginError">{{loginError}}</p>
    </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import router from '../router';

export default {
  data() {
    return {
      loginError: '',
      form: {
        username: '',
        email: '',
        password: '',
      },
    };
  },

  validations: {
    form: {
      username: { required, min: minLength(3) },
      email: { required, email },
      password: { required, min: minLength(6) },
    },
  },

  methods: {
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
      try {
        const result = await this.$store.dispatch('signup', { username: this.form.username, password: this.form.password });
        if (result) {
          router.push('home');
        }
      } catch (error) {
        if(error.statusCode === 403) {
          this.loginError = error.message
        }
        throw Error(error.message);
      }
    },
  },
};
</script>

<style lang="scss">
.hasError {
    color: red,
}
</style>
