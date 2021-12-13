<template>
  <main class="faq">
    <h1>Frequently Asked Questions</h1>
    <Loading v-if="remoteDataBusy"></Loading>
    <div class="empty" v-else-if="tickets.length === 0">
      Tidak Punya Tiket
    </div>
    <section v-else class="tickets-list">
      <div v-for="ticket of tickets" :key="ticket._id" class="ticket-item">
        <span>{{ticket.title}}</span>
        <span class="badge">{{ticket.status}}</span>
        <span class="date">{{ticket.date | date}}</span>
      </div>
    </section>
  </main>
</template>

<script>
import RemoteData from '../mixins/RemoteData'
export default {
  mixins: [
    RemoteData({
      tickets : 'tickets'
    })
  ],
};
</script>

<style>
</style>
