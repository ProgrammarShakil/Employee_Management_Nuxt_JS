<template>
  <div>
    <div class="">
      <div class="mx-auto md:max-w-full">
        <div class="md:flex min-h-screen">
          <div class="w-2/6 hidden lg:block">
            <img class="" src="~/assets/images/log-side-img.jpg" />
          </div>
          <div class="p-8 custom-bg text-white w-full lg:w-4/6">
            <div class="custom-font">Register</div>
            <form @submit.prevent="register()">
              <div class="md:flex">
                <div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'user-plus']"
                    />
                    <input
                      v-model="$v.regform.username.$model"
                      class=""
                      type="text"
                      placeholder="Username"
                    />
                    <div class="error" v-if="$v.regform.username.$error">
                      Username is required
                    </div>
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'lock']"
                    />
                    <input
                      v-model="regform.password"
                      class=""
                      type="password"
                      placeholder="Password (6 karakter atau lebih)"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.password.$error">
                    Password is required
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['far', 'envelope']"
                    />
                    <input
                      v-model="regform.email"
                      class=""
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.email.$error">
                    Email is required
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'mobile-button']"
                    />
                    <input
                      v-model="regform.phone"
                      class=""
                      type="text"
                      placeholder="Telephone"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.phone.$error">
                    Telephone is required
                  </div>
                </div>
                <div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'money-check-dollar']"
                    />
                    <input
                      v-model="regform.account_number"
                      class=""
                      type="text"
                      placeholder="No Rekening"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.account_number.$error">
                    Account Number is required
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'money-check-dollar']"
                    />
                    <input
                      v-model="regform.account_name"
                      class=""
                      type="text"
                      placeholder="Nama Rekening"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.account_name.$error">
                    Account Name is required
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'money-bill-trend-up']"
                    />
                    <select v-model="regform.bank_name">
                      <option selected disabled>Select Bank</option>
                      <option value="1">BCA</option>
                      <option value="3">BNI</option>
                      <option value="4">BRI</option>
                      <option value="5">CIMB</option>
                    </select>
                  </div>
                  <div class="error" v-if="$v.regform.bank_name.$error">
                    Bank Name is required
                  </div>
                </div>
              </div>
              <div><input class="" type="submit" value="Register" /></div>
            </form>

            <div class="p-5">
              <span class="text-center">Sudah punya account?</span>
              <nuxt-link class="link-color" to="#">Login disini</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      regform: {
        username: "",
        password: "",
        email: "",
        phone: "",
        bank_name: "",
        account_number: "",
        account_name: "",
      },
    };
  },

  validations: {
    regform: {
      username: {
        required,
        // minLength: minLength(4)
      },
      email: {
        required,
        // minLength: minLength(4)
      },
      password: {
        required,
        // minLength: minLength(4)
      },
      account_name: {
        required,
        // minLength: minLength(4)
      },
      phone: {
        required,
        // minLength: minLength(4)
      },
      account_number: {
        required,
        // minLength: minLength(4)
      },
      bank_name: {
        required,
        // minLength: minLength(4)
      },
    },
  },

  mounted() {
    if (process.browser) {
      if (localStorage.getItem("token") !== null) {
        this.$router.push("/dashboard");
      }
    }
  },

  methods: {
    async register() {
      await this.$axios
        .post("/register", this.regform)
        .then((response) => {
          this.$toast.show({
            type: "success",
            title: "Success",
            message: "You Are Successfully Registered",
          });
        })
        .catch((error) => {
          this.$toast.show({
            type: "danger",
            title: "please try again",
            message: "You Are Failed To Register",
          });
        });

      this.$v.$touch();

      if (this.$v.$invalid) {
        console.log("invalid");
      } else {
        console.log("valid");
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.custom-bg {
  background: #1f1b2e;
  padding-left: 70px;
}
.custom-font {
  margin-top: -20px;
  font-family: Oswald;
  font-size: 62px;
  font-weight: 700;
  line-height: 107px;
  letter-spacing: 3px;
  text-align: left;
}
.poppins {
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
}

input[type="text"],
[type="password"],
[type="email"],
select,
option {
  margin-top: 20px;
  padding: 20px 20px 20px 70px;
  width: 350px;
  margin-right: 40px;
  background: #28223c;
  border-radius: 5px;
}

input[type="submit"] {
  margin-top: 20px;
  padding: 12px 328px;
  background: #fd1a74;
  font-size: 25px;
  border-radius: 5px;
}
input,
select,
option:focus {
  outline: none;
  border: none;
}
.p-5 {
  padding-top: 10px;
}
/* .form-group--error{
  border: 1px solid red;
} */
.text-center {
  margin-left: 230px;
}
.link-color {
  color: #fd1a79;
  text-decoration: underline;
}
.position-icon {
  position: relative;
}
.cutsom-position-icons {
  position: absolute;
  width: 23px;
  height: 32px;
  top: 36px;
  left: 30px;
  color: rgb(255 245 245);
  font-size: 30px;
}

@media screen and (min-width: 380px) and (max-width: 768px) {
  .custom-bg {
    padding-left: 40px;
  }
  input[type="text"],
  [type="password"],
  [type="email"],
  select,
  option {
    padding: 20px 20px 20px 70px;
    width: 410px;
  }
  input[type="submit"] {
    padding: 15px 160px;
  }

  .text-center {
    margin-left: 50px;
  }
}
</style>
