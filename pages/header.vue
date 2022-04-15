<template>
  <div class="bg-custom">
    <div class="container mx-auto">
      <nav class="flex items-center p-3 flex-wrap">
        <nuxt-link to="/dashboard" class="p-2 mr-4 inline-flex items-center">
          <span class="text-xl text-white font-bold uppercase tracking-wide"
            >LOGO</span
          >
        </nuxt-link>
        <button
          class="text-white px-4 py-2 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        >
          <i @click="isOpen = !isOpen">
            <font-awesome-icon
              class="cutsom-position"
              :icon="['fas', 'bars']"
            />
          </i>
        </button>
        <div
          :class="isOpen ? 'hidden' : 'block'"
          class="top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
          id="navigation"
        >
          <div
            class="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto"
          >
            <span
              v-if="loggedIn == false"
              class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              <span><nuxt-link to="/">Home</nuxt-link></span>
            </span>
            <span
              v-if="loggedIn == true"
              class="lg:inline-flex lg:w-auto w-full px-3 my-2 lg:my-0 py-2 lg:mx-4 me-4 rounded text-gray-400 items-center justify-center"
            >
              <span
                ><small class="text-white">{{ showform.username }}</small>
                <br />
                <small class="text-white">{{ showform.email }}</small>
              </span>
            </span>
            <span
              v-if="loggedIn == false"
              class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              <span><nuxt-link to="/login">Login</nuxt-link></span>
            </span>
            <span
              v-if="loggedIn == true"
              style="cursor: pointer"
              class="lg:inline-flex bg-red lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              <span @dblclick="logout">Logout</span>
            </span>
            <span
              v-if="loggedIn == false"
              class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              <span><nuxt-link to="/register">Register</nuxt-link></span>
            </span>
          </div>
        </div>
      </nav>
    </div>
    <!-- <Nuxt /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showform: {},
      isOpen: true,
      loggedIn: false,
      username: "",
    };
  },

  mounted() {
    this.storage();
    this.getUser();
  },

  methods: {
    storage() {
      if (process.browser) {
        if (localStorage.getItem("token") !== null) {
          this.loggedIn = true;
          this.username = localStorage.getItem("username");
        }
      }
    },
    logout() {
      localStorage.clear();
      this.loggedIn = false;
      this.$router.push("/");
    },

    async getUser() {
      let getuserList = await this.$axios.$get("/member/accountList");
      let user = getuserList.data.filter((x) => x.username == this.username);
      // console.log(getuserList.data);
      this.showform = user[0];
    },
  },
};
</script>

<style scoped>
.bg-custom {
  background: #28223c;
}
.bg-red {
  background: #e95750;
}
.text-warning {
  color: #b86d0b;
}
</style>
