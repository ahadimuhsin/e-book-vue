<template>
  <main class="login">
    <h1>Please login to continue</h1>
    <!-- <form>

    </form> -->
    <SmartFrom
      class="form"
      :title="title"
      :operation="operation"
      :valid="valid"
    >
      <FormInput name="username" v-model="username" placeholder="Username">
      </FormInput>
      <FormInput
        name="password"
        v-model="password"
        type="password"
        placeholder="Password"
      >
      </FormInput>
      <template v-if="mode === 'signup'">
        <FormInput
          name="verify-password"
          type="password"
          v-model="password_confirmation"
          placeholder="Retype Your Password"
          :invalid="retypePasswordError"
        >
        </FormInput>
        <FormInput
          name="email"
          v-model="email"
          type="email"
          placeholder="Email"
        >
        </FormInput>
      </template>
      <template slot="actions">
        <template v-if="mode === 'login'">
          <button type="button" class="secondary" @click="mode = 'signup'">
            Sign Up
          </button>
          <button type="submit" :disabled="!valid">Login</button>
        </template>
        <template v-else-if="mode === 'signup'">
          <button type="button" class="secondary" @click="mode = 'login'">
            Back To Login
          </button>
          <button type="submit" :disabled="!valid">Create Account</button>
        </template>
      </template>
    </SmartFrom>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      mode: "login",
      password: "",
      password_confirmation: "",
      email: "",
    };
  },
  computed: {
    title() {
      switch (this.mode) {
        case "login":
          return "Login";
        case "signup":
          return "Create a new account";
      }
    },
    retypePasswordError() {
      return (
        this.password_confirmation &&
        this.password !== this.password_confirmation
      );
    },
    signUpValid() {
      return this.password_confirmation && this.email && !this.retypePasswordError;
    },
    valid() {
      return (
        !!this.username &&
        !!this.password &&
        (this.mode !== "signup" || this.signUpValid)
      );
    },
  },

  methods: {
    async operation() {
      await this[this.mode]()
    },
    async login() {
      this.$state.user = await this.$fetch('login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
      this.$router.replace(this.$route.params.wantedRoute || {name: 'home'})
    },
    async signup() {
      await this.$fetch('signup', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email
        }),
      })
      this.mode = 'login';
    },
  },
};
</script>

<style lang="stylus" scoped>
.form{
  >>> .content{
    max-width: 400px;
  }
}
</style>
