<template>
<button @click="sendRequest">Send Request</button>
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