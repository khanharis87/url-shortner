<template>
  <div class="input-row">
      <input
        class="input"
        :class="inputClass"
        :name="name"
        :type="type"
        :value.prop ="value"
        :placeholder="placeholder"
        @input="update"
        />
  </div>
</template>

<script>
export default {
  props: {
      name: {
          type: String
      },
      type: {
          type: String,
          default: 'text'
      },
      value: {
          required: true
      },
      placeholder: {
          type: String
      },
      invalid: {
          type: Boolean,
          default: false
      }
  },
  methods: {
      update(event) {
          this.$emit('input', event.currentTarget.value)
      }
  },
  computed: {
      inputClass() {
          return {
              'invalid': this.invalid
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.input-row {
    padding: 12px
}

.input-row input {
    width: 100%;
    display: block;
    border-width: 1px;
    border-style: solid;
    padding: 12px;
    font-size: 0.95em;
}

.input-row input[type="password"] {
    background: #fff;
    border-color: #bbb;
    color: #555;
}
</style>
