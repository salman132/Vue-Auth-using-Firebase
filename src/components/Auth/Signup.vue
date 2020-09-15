<template>
  <div class="signup container">
    <form  class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password:</label>
        <input type="text" name="password" id="password" v-model="password">
      </div>

      <div class="field">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" v-model="username">
      </div>

      <p class="red-text center" v-if="feedback">
        {{ feedback }}
      </p>

      <div class="field center">
       <button class="btn deep-purple">Register</button>
      </div>


    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init';
  import firebase from 'firebase'
  export default {
      name: 'Signup',
      data(){
          return{
            email:null,
            password:null,
            username: null,
            feedback: null,
            slug: null,

          }
      },
      methods:{
          signup:function () {
              if(this.username && this.email && this.password){
              this.slug = this.makeSlug(this.username)
                 let ref = db.collection('users').doc(this.slug)
                 ref.get().then(doc =>{
                     if(doc.exists){
                         this.feedback = 'This username already exist'
                     }
                     else{
                         this.feedback = null;
                         firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(cred =>{
                            ref.set({
                                username: this.username,
                                user_id: cred.user.uid

                            }).then(()=>{
                                this.$router.push({name: 'Dashboard'})
                            })
                         })

                             .catch(error =>{

                             this.feedback = error.message
                         })
                     }
                 })

              }
              else{
                this.feedback = "You must enter all fields";
              }
          },

          makeSlug:function (text) {
              return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
          }
      }
  }
</script>

<style>
  .signup{
    width: 500px;
    margin-top: 70px;
  }
  h2{
    font-size: 22px;
  }
</style>
