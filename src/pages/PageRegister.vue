<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input 
                        v-model="form.username"
                        @blur="$v.form.username.$touch()"
                        class="input is-large"
                        type="text"
                        placeholder="Username">
                        <div v-if="$v.form.username.$error" class="form-error">
                          <span v-if="!$v.form.username.required" class="help is-danger">Username is required</span>
                        </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input 
                        v-model="form.name"
                        @blur="$v.form.name.$touch()"
                        class="input is-large"
                         type="text"
                         placeholder="Name">
                         <div v-if="$v.form.name.$error" class="form-error">
                          <span v-if="!$v.form.name.required" class="help is-danger">Name is required</span>
                        </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input 
                        v-model="form.email"
                        @blur="$v.form.email.$touch()"
                        class="input is-large"
                         type="email"
                         placeholder="Your Email">
                         <div v-if="$v.form.email.$error" class="form-error">
                          <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                          <span v-if="!$v.form.email.email" class="help is-danger">Email is not valid</span>
                        </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input 
                        v-model="form.avatar"
                        @blur="$v.form.avatar.$touch()"
                        class="input is-large"
                         type="text"
                         placeholder="Avatar"
                         autocomplete="">
                         <div v-if="$v.form.avatar.$error" class="form-error">
                          <span v-if="!$v.form.avatar.url" class="help is-danger">Url is not valid</span>
                          <span v-if="!$v.form.avatar.supportedFileType" class="help is-danger">Selected file type is not valid!</span>
                        </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input 
                        v-model="form.password"
                        @blur="$v.form.password.$touch()"
                        class="input is-large"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="new-password">
                         <div v-if="$v.form.password.$error" class="form-error">
                          <span v-if="!$v.form.password.required" class="help is-danger">Password is required</span>
                          <span v-if="!$v.form.password.minLength" class="help is-danger">Password minimum is 6</span>
                        </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input 
                        v-model="form.password_confirmation"
                        @blur="$v.form.password_confirmation.$touch()"
                        class="input is-large"
                         type="password"
                         placeholder="Password Confirmation"
                         autocomplete="off">
                         <div v-if="$v.form.password_confirmation.$error" class="form-error">
                          <span v-if="!$v.form.password_confirmation.required" class="help is-danger">Password confirmation is required</span>
                          <span v-if="!$v.form.password_confirmation.sameAs" class="help is-danger">Password confimation is not match</span>

                        </div>
                </div>
              </div>
              <button @click.prevent="register" 
                      :disabled="isFormInvalid"
                      type="submit" class="button is-block is-info is-large is-fullwidth">Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{name: 'PageLogin'}">Login</router-link> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
import {required,email,minLength,url,sameAs} from 'vuelidate/lib/validators'
import { supportedFileType } from '@/helpers/validators'
  export default {
      data() {
          return {
              form:{
                username: null,
                name: null,
                email:null,
                avatar: null,
                password:null,
                password_confirmation: null          
              }
          }
      },
      validations:{
        form:{
          username: {
            //required
          },
          name: {
           // required
          },
          email:{
            required,
            email
          },
          avatar: {
            url,
            supportedFileType
          },
          password:{
            required,
            minLength : minLength(6)
          },
          password_confirmation: {
            required,
            sameAs : sameAs('password')
          } 
        }
      },
      computed: {
        isFormInvalid () {
          return this.$v.form.$invalid
        }
      },
      methods:{
          ...mapActions('auth',['registerUser']),
          register () {
              this.$v.form.$touch()
              this.registerUser(this.form)
              .then(()=>{
                this.$router.push('/login')
              })
              .catch(errorMessage => {
                this.$toasted.error(errorMessage,{
                  duration:5000
                })
              })
          }
      }
  }
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>