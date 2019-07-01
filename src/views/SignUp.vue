<template>
  <p>Hello {{username}}</p>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters.username;
    },
  },
  created() {
    this.$store.dispatch('auth', { username: 'admin', password: 'password' });
  },
};
</script>
