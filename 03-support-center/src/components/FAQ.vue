<template>
  <main class="faq">
    <h1>Frequently Asked Questions</h1>
    <Loading v-if="remoteDataBusy"></Loading>
    <div class="error" v-if="error">
      Can't load the questions
    </div>
    <section class="list">
      <article v-for="question of questionList" :key="question._id">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>

<script>
import RemoteData from '../mixins/RemoteData'
export default {
  mixins: [
    RemoteData({
      questionList : 'questions'
    })
  ],
};
</script>

<style>
</style>
