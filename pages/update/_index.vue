<template>
  <div>
    <div class="">
      <div class="custom-bg mx-auto w-full">
        <div class="md:flex justify-center min-h-screen">
          <div class="text-white">
            <div>
              <p class="poppins">Update member : {{ showform.username }}</p>
            </div>
            <form>
              <!-- <div>
                <input v-model="showform.id" name="id" class="" type="hidden" />
              </div> -->
              <div>
                <label>Username</label>
                <input v-model="showform.username" class="" type="text" />
              </div>
              <div>
                <label>Email</label>
                <input class="" v-model="showform.email" type="email" />
              </div>
              <div>
                <label>Phone</label>
                <input class="" v-model="showform.phone" type="text" />
              </div>
              <div>
                <input
                  @click.prevent="updateUser()"
                  class=""
                  type="submit"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middlware: "auth",

  data() {
    return {
      showform: {},
    };
  },

  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      // console.log(this.$route.params.index);
      let getuserList = await this.$axios.$get(
        "https://apiagent.cikatechdev.fun/api/v1/member/accountList"
      );
      let user = getuserList.data.filter(
        (x) => x.id == this.$route.params.index
      );
      this.showform = user[0];
    },

    async updateUser() {
      let payload = this.showform;
      payload.password = "dsfdfdf12132";
      payload.bank_name = "USA";
      payload.account_number = "345657567";
      payload.account_name = "fasfdsadfsa";
      // console.log(payload);

      await this.$axios.$post(
        "https://apiagent.cikatechdev.fun/api/v1/member/updateAccount",
        payload
      );

      this.$toast.show({
        type: "success",
        title: "Hurray!",
        message: "Your Account Updated Successfully",
      });
    },
  },
};
</script>

<style scoped>
.custom-bg {
  background: #1f1b2e;
  padding-left: 140px;
}
.poppins {
  font-family: Poppins;
  font-size: 30px;
  font-weight: 800;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: left;
  color: #fd1a79;
  margin-top: 25px;
}

input[type="text"],
[type="password"],
[type="email"] {
  margin-top: 20px;
  padding: 20px 20px 20px 30px;
  width: 532px;
  background: #28223c;
}

input[type="submit"] {
  margin-top: 20px;
  padding: 12px 226px;
  background: #fd1a74;
  font-size: 25px;
}

input:focus {
  outline: none;
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
label {
  display: block;
  margin-top: 15px;
  margin-bottom: -10px;
}
@media screen and (min-width: 380px) and (max-width: 768px) {
  .custom-bg {
    padding-left: 40px;
  }
  input[type="text"],
  [type="password"],
  [type="email"] {
    padding: 20px 20px 20px 30px;
    width: 420px;
  }
  input[type="submit"] {
    padding: 15px 169px;
  }
  .custom-input {
    padding: 20px 74px 20px 30px;
  }
  .bg-cust {
    padding: 19px 10px 20px;
  }
  .text-center {
    margin-left: 50px;
  }
}
</style>
