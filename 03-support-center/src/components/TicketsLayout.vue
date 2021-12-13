<template>
  <main class="tickets-layout">
    <h1>Your Support Tickets</h1>
    <!-- TODO -->
    <!-- <Tickets></Tickets> -->
    <div class="action">
      <router-link v-if="$route.name !== 'tickets'" tag="button" class="secondary"
      :to="{name: 'tickets'}">See All Tickets</router-link>
      <router-link v-if="$route.name !== 'new-ticket'" tag="button"
      :to="{name: 'new-ticket'}">New Ticket</router-link>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
import Tickets from './Tickets.vue'
export default {
  components: {
    Tickets
  }
};
</script>

<style>
</style>
