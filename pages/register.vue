<template>
  <div>
    <Header />
    <div class="">
      <div class="mx-auto md:max-w-full">
        <div class="md:flex min-h-screen">
          <div class="hidden lg:block">
            <img
              class="max-w-full min-h-screen"
              src="~/assets/images/log-side-img.jpg"
            />
          </div>
          <div class="p-8 custom-bg text-white w-full">
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
                      v-model.trim="$v.regform.username.$model"
                      class=""
                      type="text"
                      placeholder="Username 6-16 karakter standar"
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
                      :type="passwordType"
                      placeholder="Password (6 karakter atau lebih)"
                    />
                    <font-awesome-icon
                      v-if="passwordType === 'password'"
                      @click="passwordType = 'text'"
                      class="eyeHideShow cutsom-position-2 cp"
                      :icon="['fas', 'eye']"
                    />
                    <font-awesome-icon
                      v-if="passwordType === 'text'"
                      @click="passwordType = 'password'"
                      class="eyeHideShow cutsom-position-2 cp"
                      :icon="['fas', 'eye-slash']"
                    />
                  </div>

                  <div class="error" v-if="$v.regform.password.$error">
                    Password is required
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'lock']"
                    />
                    <input
                      v-model="regform.confirmPassword"
                      class=""
                      :type="ConPasswordType"
                      placeholder="Confirm Password"
                    />
                    <font-awesome-icon
                      v-if="ConPasswordType === 'password'"
                      @click="ConPasswordType = 'text'"
                      class="eyeHideShow cutsom-position-2 cp"
                      :icon="['fas', 'eye']"
                    />
                    <font-awesome-icon
                      v-if="ConPasswordType === 'text'"
                      @click="ConPasswordType = 'password'"
                      class="eyeHideShow cutsom-position-2 cp"
                      :icon="['fas', 'eye-slash']"
                    />
                  </div>
                  <div v-if="$v.regform.confirmPassword.$error" class="error">
                    <span v-if="!$v.regform.confirmPassword.required"
                      >Confirm Password is required</span
                    >
                    <span
                      v-if="
                        regform.confirmPassword &&
                        !$v.regform.confirmPassword.sameAsPassword
                      "
                      >Password and Confirm Password should match</span
                    >
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
                </div>
                <div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'mobile-button']"
                    />
                    <input
                      v-model="regform.phone"
                      class=""
                      type="number"
                      placeholder="Telepon"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.phone.$error">
                    Telephone is required
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'money-check-dollar']"
                    />
                    <input
                      v-model="regform.account_number"
                      class=""
                      type="number"
                      placeholder="No Rekening"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.account_number.$error">
                    Account Number (Min 8 and Max 16)
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
                      @keydown="onlyString($event)"
                    />
                  </div>
                  <div class="error" v-if="$v.regform.account_name.$error">
                    Account Name (Min 8 and Max 16)
                  </div>
                  <div class="position-icon">
                    <font-awesome-icon
                      class="cutsom-position-icons"
                      :icon="['fas', 'money-bill-trend-up']"
                    />
                    <select v-model="regform.bank_name">
                      <option selected disabled value="">Select Bank</option>
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
              <nuxt-link class="link-color" to="login">Login disini</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import Header from "./header.vue";

export default {
  components: {
    Header,
  },

  data() {
    return {
      regform: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        bank_name: "",
        account_number: "",
        account_name: "",
      },
      passwordType: "password",
      ConPasswordType: "password",
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
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
        // minLength: minLength(4)
      },
      account_name: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16),
      },
      phone: {
        required,
        // minLength: minLength(4)
      },
      account_number: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16),
      },
      bank_name: {
        required,
        // minLength: minLength(8)
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
      this.$v.$touch();
      let self = this;

      if (!this.$v.$invalid) {
        await this.$axios
          .post("/register", this.regform)
          .then((response) => {
            let payload = this.regform;
            payload.user_account = this.regform.username;
            payload.password = this.regform.password;

            this.$axios
              .$post("/login", payload)
              .then((response) => {
                localStorage.setItem("username", this.regform.username);
                localStorage.setItem("token", response.data.token);
                
                console.log(response);
                this.$router.push({ path: "/dashboard" });

                self.$toast.show({
                  type: "success",
                  title: "Success",
                  message: "You Are Successfully Logged In",
                });
              })
              .catch(() => {
                this.$router.push({ path: "/register" });
                self.$toast.show({
                  type: "danger",
                  title: "Error",
                  message: "Failed",
                });
                console.log(err);
              });
          })
          .catch((message) => {
            console.log(message.response);
            self.$toast.show({
              type: "danger",
              title: "please try again",
              message: message.response.data.message,
            });
          });
      }
    },
    onlyString(e) {
      if (e.shiftKey || e.ctrlKey || e.altKey) {
        e.preventDefault();
      } else {
        var key = e.keyCode;

        if (
          !(
            key == 8 ||
            key == 32 ||
            key == 46 ||
            (key >= 35 && key <= 40) ||
            (key >= 65 && key <= 90)
          )
        ) {
          e.preventDefault();
        }
      }
    },
    onlyNumber(evt) {
      var theEvent = evt;

      // Handle paste
      if (theEvent.type === "paste") {
        key = event.clipboardData.getData("text/plain");
      } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
      }
      var regex = /[0-9]|\./;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.min-h-screen {
  min-height: 110vh;
}
.custom-bg {
  background: #1f1b2e;
  padding-left: 120px;
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
[type="number"],
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
.eyeHideShow {
  position: absolute;
  top: 46px;
  left: 309px;
}

@media screen and (min-width: 380px) and (max-width: 768px) {
  .custom-bg {
    padding-left: 40px;
  }
  input[type="text"],
  [type="password"],
  [type="email"],
  [type="number"],
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
  .eyeHideShow {
    left: 370px;
  }
}
</style>
