<template>
  <div class="login container">
    <form @submit.prevent="doLogin" class="card-panel">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password:</label>
        <input type="text" name="password" id="password" v-model="password">
      </div>

      <p class="red-text center" v-if="feedback">
        {{ feedback }}
      </p>

      <div class="field center">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
      name: 'Login',
      data(){
          return{
              feedback: null,
              email: null,
              password: null,
          }
      },
      methods:{
        doLogin:function () {
            if(!this.email || !this.password){
                this.feedback = "Please fill up the all input field";
            }
            else{
                this.feedback = null;
            }
            if(this.email && this.password  && !this.feedback){
                firebase.auth().signInWithEmailAndPassword(this.email , this.password).then(cred =>{
                    this.$router.push({name: 'Dashboard'})
                }).catch(error =>{
                    this.feedback = error.message;
                })
            }
        }
      }
  }
</script>

<style>
  .login{
    width: 500px;
    margin-top: 70px;
  }
  h2{
    font-size: 22px;
  }
</style>
