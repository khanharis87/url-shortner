<template>
  <main class="login">
      <h1>URL SHORTNER</h1>
    <FormLayout
        class="form"
        :title="title"
        :operation="operation"
        :valid="valid">
        <FormInput
            name="username"
            v-model="username"
            placeholder="Username" />
        <FormInput
            name="password"
            type="password"
            v-model="password"
            placeholder="Password" />
        <template v-if="mode === 'signup'">
            <FormInput
                name="confirm-password"
                type="password"
                v-model="confirmPassword"
                placeholder="Retype Password"
                :invalid="checkPasswordMatch" />
        </template>
        <template slot="actions">
            <template v-if="mode === 'login'">
                <button
                    type="button"
                    class="secondary-btn"
                    @click="mode = 'signup'">
                    Sign up
                </button>
                <button
                    class="primary-btn"
                    type="submit"
                    :disabled="!valid">
                    Login
                </button>
            </template>
            <template v-else-if="mode === 'signup'">
                <button
                    type="button"
                    class="secondary-btn"
                    @click="mode = 'login'">
                    Back to login
                </button>
                <button
                    type="submit"
                    class="primary-btn"
                    :disabled="!valid">
                    Create account
                </button>
            </template>
        </template>
    </FormLayout>
  </main>
</template>

<script>
import FormInput from './FormInput.vue'
import FormLayout from './FormLayout.vue'

export default {
    components: {
        FormInput,
        FormLayout
    },
    data() {
        return {
            mode: 'login',
            username: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        async operation() {
            await this[this.mode]()
        },
        async login() {
            this.$state.user = await this.$fetch('login', {
                method: 'POST',
                body: JSON.stringify({
                    "username": this.username,
                    "password": this.password,
                })
            })
            this.$router.push({name: 'home', params: { username: this.username }})
        },
        async signup() {
            await this.$fetch('signup', {
                method: 'POST',
                body: JSON.stringify({
                    "username": this.username,
                    "password": this.password,
                    "links": [],
                })
            })
            this.mode = 'login'
        }
    },
    computed: {
        title() {
            switch(this.mode) {
                case 'login': return 'Login'
                case 'signup': return 'Create a new account'
            }
        },
        checkPasswordMatch() {
            return this.confirmPassword && this.password !== this.confirmPassword
        },
        isSignupValid() {
            return this.confirmPassword && !this.checkPasswordMatch
        },
        valid() {
            return this.username && this.password && (this.mode !== 'signup' || this.isSignupValid)
        }
    }
}
</script>

<style lang="scss">
.ßform {
    width: 500px;
    margin: 15px auto;
    padding: 12px;
}
.actions {
    height: 35px;
}

.primary-btn,
.secondary-btn {
    height: 100%;
    width: 48%
}
</style>