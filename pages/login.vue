<!-- <template>
    <div>
        <nuxt-link to="" ><span @click.prevent="login">Login</span></nuxt-link>
    </div>
</template> -->

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
                  :type="passwordType"
                  placeholder="Masukan password"
                />
                <font-awesome-icon
                  v-if="passwordType === 'password'"
                  @click="passwordType = 'text'"
                  class="cutsom-position-2 cp"
                  :icon="['fas', 'eye']"
                />
                <font-awesome-icon
                  v-if="passwordType === 'text'"
                  @click="passwordType = 'password'"
                  class="cutsom-position-2 cp"
                  :icon="['fas', 'eye-slash']"
                />
              </div>
              <div class="error" v-if="$v.form.password.$error">
                Password is required
              </div>
              <div class="parent-custom">
                <span class="parent-child"
                  >Capcha |<span class="capcha"> {{ capcha }}</span></span
                ><input
                  class="custom-pl-5"
                  type="email"
                  placeholder="Enter this code here"
                  v-model="userCaptcha"
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
              <nuxt-link class="link-color" to="register"
                >Daftar disini</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  components: {
    Header,
  },

  data() {
    return {
      passwordType: "password",
      form: {
        user_account: "",
        password: "",
      },
      capcha: "",
      userCaptcha: "",
    };
  },

  validations: {
    form: {
      user_account: {
        required,
        // minLength: minLength(8)
      },
      password: {
        required,
        // minLength: minLength(4)
      },
    },
  },

  mounted() {
    this.capcha = this.makeid(5);
    if (process.browser) {
      if (localStorage.getItem("token") !== null) {
        this.$router.push("/dashboard");
      }
    }
  },

  methods: {
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.capcha === this.userCaptcha) {
          try {
            let rs = await this.$axios.$post(
              "https://apiagent.cikatechdev.fun/api/v1/login",
              this.form
            );
            let { data } = rs;
            localStorage.setItem("username", this.form.user_account);
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
        } else {
          this.$toast.show({
            type: "danger",
            title: "Error",
            message: "Captcha doesnot matched",
          });
        }
      }
    },

    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
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
  padding-left: 200px;
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
.parent-custom {
  position: relative;
}
.parent-child {
  position: absolute;
  width: 190px;
  margin-top: 20px;
  margin-left: 0px;
  background: #5b32fd;
  height: 64px;
  padding-top: 10px;
  padding-left: 21px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.custom-pl-5 {
  padding-left: 220px;
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
.capcha {
  font-size: 25px;
  padding-left: 5px;
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
  .custom-pl-5 {
    padding-left: 210px;
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
.cp {
  cursor: pointer;
}
</style>
