<template>
  <div class="new-ticket">
    <h1>New Ticket</h1>
    <SmartFrom title="New Ticket" :operation="operation" :valid="valid">
      <FormInput
        name="title"
        v-model="title"
        placeholder="Short Description"
        maxlength="100"
        required
      ></FormInput>
      <FormInput
      type="textarea"
      name="description"
      v-model="description"
      placeholder="Describe your problem in details"
      rows="4"></FormInput>

      <template slot="actions">
        <router-link tag="button"
        :to="{name: 'tickets'}"
        class="secondary">
        Go Back
        </router-link>
        <button type="submit" :disabled="!valid">
          Send Ticket
        </button>
      </template>
    </SmartFrom>
  </div>
</template>

<script>
import PersistantData from '../mixins/PersistantData'
export default {
  mixins: [
    PersistantData('NewTicket', [
      'title', 'description'
    ])
  ],
  data() {
    return {
      title: "",
      description: "",
    };
  },
  computed: {
    valid(){
      return !!this.title && !!this.description
    },
  },
  methods: {
    async operation(){
      const result = await this.$fetch('tickets/new', {
        method: 'POST',
        body: JSON.stringify({
          title: this.title,
          description: this.description
        }),
      })
      this.title = this.description = ''
    }
  }
};
</script>

<style>
</style>
