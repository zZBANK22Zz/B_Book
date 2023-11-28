<template>
  <div class="q-pa-md" align="center">
    <div class="column justify-center text-h6 text-bold">
      <h3>LOGIN</h3>
      <h6>--- Welcome to BookStore ---</h6>
    </div>
    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-sm"
    >
      <div>
        <q-input
        filled v-model="email"
        type="text"
        label="Your email" />
      </div>
      <div>
        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password"
        />
      </div>

      <div class="row justify-center">
        <q-btn label="Log in" type="submit" color="black" />
        <q-btn
          label="Register"
          color="brown"
          class="q-ml-sm"
          @click="this.$router.push('/register')"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from "../stores/user";

export default defineComponent({
  name: "LoginPage",
  data(){
    return{
      userStore: useLoginUserStore(),
      isPwd: true,
      password: null,
      email: null,
    }
  },
  methods: {
    onSubmit(){
      const data = {
        email: this.email,
        password:this.password
      }
      this.$api
      .post("/user/signin", data)
      .then((res)=>{
        if(res.status == 200){
          console.log("Login successfully")
          this.userStore.userid = res.data.id;
          this.userStore.email = res.data.email;
          this.$router.push("/user");
        }
      })
      .catch((err)=>{
          console.log(err);
        });
    },
  },
});
</script>
