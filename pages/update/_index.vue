<template>
  <div>
    <Header />
    <div class="">
      <div class="custom-bg mx-auto w-full">
        <div class="md:flex justify-center min-h-screen">
          <div class="text-white">
            <div>
              <p class="poppins">Update member : {{ showform.username }}</p>
            </div>
            <form>
              <div>
                <label>Username</label>
                <input disabled :placeholder="showform.username" type="text" />
              </div>
              <div>
                <label>Bank</label>
                <select v-model="showform.bank_name">
                      <option value="BCA">BCA</option>
                      <option value="BNI">BNI</option>
                      <option value="BRI">BRI</option>
                      <option value="CIMB">CIMB</option>
                </select>
              </div>
              <div>
                <label>Email</label>
                <input class="" v-model="showform.email" type="email" />
              </div>
              <div>
                <label>Phone</label>
                <input class="" v-model="showform.phone" type="text" />
              </div>
              <div class="md:flex justify-between">
                <nuxt-link to="/dashboard"
                  ><button class="custom-btn-back">Back</button></nuxt-link
                >
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
import Header from '../header.vue'
export default {
  components:{
    Header
  },
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
      let getuserList = await this.$axios.$get("/member/accountList");
      let user = getuserList.data.filter(
        (x) => x.id == this.$route.params.index
      );
      this.showform = user[0];
      console.log(this.showform);
      this.showform.bank_name = this.showform.name_bank;
    },

    async updateUser() {

      let payload = this.showform;

      if(this.showform.bank_name == 'BCA'){
        payload.bank_name = 1
      }else if(this.showform.bank_name == 'BNI'){
        payload.bank_name = 3
      }else if(this.showform.bank_name == 'BRI'){
        payload.bank_name = 4
      }else if(this.showform.bank_name == 'CIMB'){
        payload.bank_name = 5
      }
      // console.log(payload);
      let self = this;

      await this.$axios
        .$post("/member/updateAccount", payload)
        .then((response) => {
          self.$toast.success({
            title: "Hurray!", message: response.message,
          });
        })
        .catch((err) => {
          self.$toast.error({
            title: "Error!", message: err.response.data.message,
          });
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
[type="email"],
select,
option {
  margin-top: 20px;
  padding: 20px 20px 20px 30px;
  width: 532px;
  background: #28223c;
}

input[type="submit"],
.custom-btn-back {
  margin-top: 20px;
  padding: 1px 5px 5px;
  height: 50px;
  width: 250px;
  font-size: 20px;
  border-radius: 3px;
}
input[type="submit"] {
  background: #fd1a74;
}
.custom-btn-back {
  background: #1a82fd;
}
input,
select:focus {
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
::-webkit-input-placeholder {
  color: #fdd032;
}
::-moz-placeholder {
  color: #fdd032;
}
::placeholder {
  color: #fdd032;
}

@media screen and (min-width: 380px) and (max-width: 768px) {
  .custom-bg {
    padding-left: 40px;
  }
  input[type="text"],
  [type="password"],
  [type="email"],
  select {
    padding: 20px 20px 20px 30px;
    width: 420px;
  }

  .custom-input {
    padding: 20px 74px 20px 30px;
  }

  input[type="submit"],
  .custom-btn-back {
    width: 200px;
  }
  input[type="submit"] {
    margin-left: 15px;
  }
  .bg-cust {
    padding: 19px 10px 20px;
  }
  .text-center {
    margin-left: 50px;
  }
}
</style>
