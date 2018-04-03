<template>
    <div>
        <navigaton-menu></navigaton-menu>
        <FormLayout
            class="form"
            :title="title"
            :valid="true"
            :operation="submit">
            <FormInput
                name="url-shortner"
                v-model="longURL"
                placeholder="Enter desired Url"
            />
            <template slot="actions">
                <button class="primary-btn">
                     Shorten Url
                </button>
            </template>
            <template slot="links">    
                <ul class="link-list">
                    <li class="link" v-for="(link, index) of links" :key="index">
                        <a :href="link">{{link}}</a>
                        <i @click="remove(index)" class="fa fa-remove"></i>
                    </li>
                </ul>
            </template> 
        <!-- <form @submit.prevent="submit">
            <h2> Enter the Long URL </h2>
            <input class="url-shortner" v-model="longURL" type="text">
            <button class="shorten">Shorten</button>
            <ul class="link-list">
                <li class="link" v-for="(link, index) of links" :key="index">
                    <a :href="link">{{link}}</a>
                    <i @click="remove(index)" class="fa fa-remove"></i>
                </li>
            </ul>
        </form> -->
        </FormLayout>
    </div>
</template>

<script>
import NavigatonMenu from './Navigation'
import FormInput from './FormInput.vue'
import FormLayout from './FormLayout.vue'

export default {
    components: {
        NavigatonMenu,
        FormInput,
        FormLayout
    },
    data () {
        return {
            error: null,
            links: this.$state.user.links,
            title: 'Enter long Url',
            longURL: '',
            shortURL: ''
        }
    },
    methods: {
        async remove(i) {
            this.links.splice(i, 1)
            console.log(this.links, 'LINKS REMOVE', this.$route.params.username)
            await this.$fetch('shortenLink', {
                method: 'PUT',
                body: JSON.stringify({
                    "username": this.$state.user.username,
                    "links": this.$state.user.links,
                })
            })
        },
        async submit() {
            console.log('inside')
            const postBody = {"longUrl" : this.longURL}
            const requestURL = 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCU4d38Q6suPr7YFvcCg8GDIN7b_KtT5sk'
            try {
                let response = await fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postBody)
                })
                if(response.ok) {
                    const result = await response.json()
                    this.shortURL = result.id
                    console.log(this.shortURL)
                    this.links.push(this.shortURL)
                    await this.$fetch('shortenLink', {
                        method: 'POST',
                        body: JSON.stringify({
                            "username": this.$route.params.username,
                            "links": this.shortURL,
                        })
                    })
                } else {
                    throw new Error('error')
                }
            } catch (e) {
                this.error = e
            }
        }
  }
}
</script>

