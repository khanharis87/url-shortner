<template>
  <form @submit.prevent="submit">
      <section class="content">
          <h2>{{title}}</h2>
          
          <slot />

          <div class="actions">
              <slot name="actions" />
          </div>

        <slot name="links" />

        <div class="error" v-if="error">ERROR: {{error}}! Sign up for account</div>
      </section>
  </form>
</template>

<script>
export default {
    data() {
        return {
            error: null,
            busy: false
        }
    },
    props: {
      title: {
          type: String,
          required: true
      },
      operation: {
          type: Function,
          required: true
      },
      valid: {
          type: Boolean
      }
  },
  methods: {
      async submit() {
          if(this.valid) {
              this.error = null
              try {
                  await this.operation()
              } catch(e) {
                  this.error = e.message
              }
          }
      }
  }
}
</script>

<style lang="scss">
.error {
    color: tomato;
}
</style>
