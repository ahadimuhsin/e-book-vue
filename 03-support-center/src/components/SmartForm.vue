<template>
  <form @submit.prevent="submit">
    <section class="content">
      <h2>{{ title }}</h2>
      <!-- Main Content -->
      <slot></slot>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
      <div class="error" v-if="error">{{ error }}</div>
    </section>

    <transition name="fade">
      <Loading v-if="busy" class="overlay"></Loading>
    </transition>
  </form>
</template>

<script>
import Loading from "./Loading.vue";
export default {
  components: { Loading },
  props: {
    title: {
      type: String,
      required: true,
    },
    operation: {
      type: Function,
      required: true,
    },
    Valid: {
      type: Boolean,
      required: true
    },
  },
  data (){
    return {
      error: null,
      busy: false
    }
  },

  methods: {
    async submit(){
      if(this.valid && !this.busy){
        this.error = null;
        this.busy = true;
        try{
          await this.operation()
        }
        catch(e){
          this.error = e.message;
        }
        this.busy = false;
      }
    }
  }
};
</script>

<style>
</style>
