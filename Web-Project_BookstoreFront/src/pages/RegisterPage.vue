<template>
  <div class="q-pa-md row-justify-center" align="center">
    <div class="column justify-center text-h6 text-bold">
      <h3>REGISTER</h3>
      <h6>--- Welcome to BookStore ---</h6>
    </div>
    <q-form @submit.prevent="onSubmit" @reset.prevent="onReset" class="q-mt-sm">
      <div>
        <q-input
          filled
          v-model="firstName"
          type="text"
          label="Please type your Firstname"
          lazy-rules
          :rules="[requiredValidate]"
        />
      </div>
      <div>
        <q-input
          filled
          v-model="lastName"
          type="text"
          label="Please type your Lastname"
          lazy-rules
          :rules="[requiredValidate]"
        />
      </div>

      <div>
        <q-input
          filled
          v-model="email"
          type="text"
          label="Please type your Email"
          lazy-rules
          :rules="[emailValidate, requiredValidate]"
        />
      </div>
      <div>
        <q-input
          filled
          v-model="dateOfBirth"
          type="text"
          label="Please type your Birthday"
          lazy-rules
          :rules="[requiredValidate]"
        />
      </div>
      <div>
        <q-input
          filled
          v-model="address"
          type="text"
          label="Please type your address"
          lazy-rules
          :rules="[requiredValidate]"
        />
      </div>
      <div>
        <q-input
          filled
          v-model="phoneNumber"
          type="text"
          label="Please type your Phonenumber"
          lazy-rules
          :rules="[requiredValidate]"
        />
      </div>
      <div>
        <q-input
          filled
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="Please type your password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) || 'Must be 6 characters at least.',
          ]"
        >
          <template v-slot:append>
            <q-icon
              @click="isPwd = !isPwd"
              :name="isPwd ? 'visibility_off' : 'visibility'"
            />
          </template>
        </q-input>
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="brown" />
        <q-btn label="Reset" type="reset" color="black" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { emailValidate, requiredValidate } from "../utils/validations";

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      // ... (your existing data properties)
    };
  },
  methods: {
    // ... (your existing methods)

    onSubmit() {
      const newUser = {
        // ... (your existing user data properties)
      };

      this.$api
        .post("/user/create", newUser)
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          alert("Error creating the user. Please try again.");
        });
    },
  },
});
</script>
