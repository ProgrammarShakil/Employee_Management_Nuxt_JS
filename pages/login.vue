<!-- <template>
    <div>
        <nuxt-link to="" ><span @click.prevent="login">Login</span></nuxt-link>
    </div>
</template> -->

<template>
  <div>
    <div class="">
      <div class="mx-auto md:max-w-full">
        <div class="md:flex min-h-screen">
          <div class="w-2/6 hidden lg:block">
            <img class="" src="~/assets/images/log-side-img.jpg" />
          </div>
          <div class="p-8 custom-bg text-white w-full lg:w-4/6">
            <div class="custom-font">Login</div>
            <div>
              <small class="poppins"
                >Masuk dan dapatkan bonus tiap minggunya</small
              >
            </div>
            <form>
              <div class="parent">
                <font-awesome-icon
                  class="cutsom-position"
                  :icon="['far', 'address-card']"
                />
                <input
                  v-model="form.user_account"
                  class=""
                  type="text"
                  placeholder="Masukan username"
                />
              </div>
              <div class="error" v-if="$v.form.user_account.$error">
                Username is required
              </div>
              <div class="parent-2">
                <font-awesome-icon
                  class="cutsom-position"
                  :icon="['fas', 'lock']"
                />
                <input
                  v-model="form.password"
                  class=""
                  type="password"
                  placeholder="Masukan password"
                />
                <font-awesome-icon
                  class="cutsom-position-2"
                  :icon="['fas', 'eye']"
                />
              </div>
              <div class="error" v-if="$v.form.password.$error">
                Password is required
              </div>
              <div>
                <span class="bg-cust"
                  >Captha <span class="pl-4">| 24</span></span
                ><input
                  class="custom-input"
                  type="email"
                  placeholder="Enter this code here"
                />
              </div>
              <div>
                <input
                  @click.prevent="login"
                  class=""
                  type="submit"
                  value="Masuk"
                />
              </div>
            </form>
            <div class="p-5">
              <span class="text-center">Belum punya account?</span>
              <nuxt-link class="link-color" to="#">Daftar disini</nuxt-link>
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
  auth: "guest",

  data() {
    return {
      form: {
        user_account: "",
        password: "",
      },
    };
  },

  validations: {
    form: {
      user_account: {
        required,
        // minLength: minLength(4)
      },
      password: {
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
    async login() {
      try {
        let rs = await this.$axios.$post(
          "https://apiagent.cikatechdev.fun/api/v1/login",
          this.form
        );
        let { data } = rs;
        
        localStorage.setItem('user_account', this.form.user_account);

        localStorage.setItem("token", data.token);

        this.$router.push({ path: "/dashboard" });

        this.$toast.show({
          type: "success",
          title: "Success",
          message: "You Are Successfully Logged In",
        });
      } catch (err) {
        this.$router.push({ path: "/login" });

        this.$toast.show({
          type: "danger",
          title: "Error",
          message: "Credetials are Dont Mached",
        });
        console.log(err);
      }

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
  padding-left: 140px;
}
.custom-font {
  margin-top: 30px;
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
[type="email"] {
  margin-top: 20px;
  padding: 20px 20px 20px 70px;
  width: 530px;
  background: #28223c;
  border-radius: 5px;
}

input[type="submit"] {
  margin-top: 20px;
  padding: 12px 20px;
  width: 531px;
  background: #fd1a74;
  font-size: 25px;
  border-radius: 5px;
}
input:focus {
  outline: none;
  border: none;
}
.custom-input {
  margin-top: 20px;
  padding: 20px 20px 20px 30px;
  width: 329px;
  background: #28223c;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.bg-cust {
  background: #5b32fd;
  padding: 19px 50px 20px;
  margin-top: 1px;
  margin-right: -5px;
  font-size: 18px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.p-5 {
  padding-top: 10px;
}
.text-center {
  margin-left: 120px;
}
.link-color {
  color: #fd1a79;
  text-decoration: underline;
}

.parent {
  position: relative;
}
.parent-2 {
  position: relative;
}
.cutsom-position {
  position: absolute;
  width: 23px;
  height: 32px;
  top: 36px;
  left: 30px;
  color: rgb(255 245 245);
  font-size: 30px;
}
.cutsom-position-2 {
  position: absolute;
  width: 17px;
  height: 33px;
  top: 36px;
  left: 485px;
  color: rgb(255 245 245);
  font-size: 30px;
}

@media screen and (min-width: 380px) and (max-width: 768px) {
  .custom-bg {
    padding-left: 40px;
  }
  input[type="text"],
  [type="password"],
  [type="email"] {
    padding: 20px 20px 20px 70px;
    width: 410px;
  }
  input[type="submit"] {
    padding: 15px 20px;
    width: 410px;
  }
  .custom-input {
    padding: 20px 20px 20px 30px;
    width: 288px;
  }
  .bg-cust {
    padding: 19px 10px 20px;
  }
  .text-center {
    margin-left: 50px;
  }
  .cutsom-position-3 {
    left: 153px;
  }
  .cutsom-position-2 {
    left: 370px;
  }
}
</style>
