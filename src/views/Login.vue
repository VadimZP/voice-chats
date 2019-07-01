<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="submit">
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
    </div>
</template>

<script>
import {
  required, minLength, between, email,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        password: '',
        email: '',
      },
    };
  },

  validations: {
    form: {
      password: { required },
      email: { required, email },
    },
  },

  methods: {
    submit() {
      this.$v.form.$touch();
      console.log(this.$v.form);
      if (this.$v.form.$error) return;
      // to form submit after this
      alert('Form submitted');
    },
  },
};
</script>

<style lang="scss">
.hasError {
    color: red,
}
</style>
