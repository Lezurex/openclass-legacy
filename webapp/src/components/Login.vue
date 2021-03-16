<template>
  <h1>This is a test lol</h1>
  <button class="btn btn-primary" @click="sendRequest">Send Request</button>
</template>

<script>
export default {
  name: "Login",
  methods: {
    async sendRequest() {
      await fetch('/api/', {
        method: "GET",
      });
    }
  }
}
</script>

<style scoped>

</style>