<template>
  <div>
    <div class="bg-custom text-white">
      <div class="flex justify-center">
        <div class="text-white">
          <div class="container mx-auto pt-5">
            <div class="flex justify-between mb-5">
              <h2 class="custom-color pr-5">Member List</h2>
              <div class="pl-5 position">
                <input
                  class="custom-search-bar"
                  type="text"
                  placeholder="Search..."
                />
                <font-awesome-icon
                  class="pos-rel"
                  :icon="['fas', 'magnifying-glass']"
                />
              </div>
            </div>
            <div class="w-full">
              <table class="mx-auto">
                <div class="table-responsive">
                  <thead class="rounded-3 custom-heading">
                    <th class="px-5 py-2">NO.</th>
                    <th class="px-5 py-2">Username</th>
                    <th class="px-5 py-2">Email</th>
                    <th class="px-5 py-2">Telephone</th>
                    <th class="px-5 py-2">Bank</th>
                    <th class="px-5 py-2">Account Number</th>
                    <th class="px-5 py-2">Account Name</th>
                    <th class="px-5 py-2 text-center" style="width: 200px">
                      Action
                    </th>
                  </thead>

                  <tbody class="rounded-3 mt-3 custom-body">
                    <tr v-for="(users, key) in showform" :key="key">
                      <td class="px-5 py-3">{{ users.id }}</td>
                      <td class="px-5 py-3">{{ users.username }}</td>
                      <td class="px-5 py-3">{{ users.email }}</td>
                      <td class="px-5 py-3">{{ users.phone }}</td>
                      <td class="px-5 py-3">{{ users.name_bank }}</td>
                      <td class="px-5 py-3">{{ users.nomor_rekening }}</td>
                      <td class="px-5 py-3">{{ users.nama_rekening }}</td>
                      <td class="px-5 py-3">
                        <nuxt-link
                          :to="`/update/${users.id}`"
                          class="custom-btn mr-2 ml-2"
                          >Edit</nuxt-link
                        >
                        <button
                          @click="deleteAccount(users.id)"
                          class="custom-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showform: [],
    };
  },

  mounted() {
    if (process.browser) {
      if (localStorage.getItem("token") == null) {
        this.$router.push("/");
      }
    }

    this.getUser();
  },

  methods: {
    async getUser() {
      let getuserList = await this.$axios.$get("/member/accountList");
      this.showform = getuserList.data;
    },

    async deleteAccount(id) {
      let payload = { id: id };
      await this.$axios.$post("/member/deleteAccount", payload);

      this.$toast.show({
        type: "success",
        title: "Success",
        message: "Account Deleted Successful",
      });

      this.getUser();
    },
  },
};
</script>

<style scoped>
.bg-custom {
  background: #161224;
}
.custom-color {
  font-family: Poppins;
  font-size: 36px;
  font-weight: 800;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: left;
  color: #fd1a79;
}
.custom-search-bar {
  height: 38px;
  width: 195px;
  left: 1080px;
  top: 106px;
  border-radius: 200.25px;
  padding: 10px, 22px, 10px, 22px;
  border: 1px solid #5b32fd;
  background: #393153;
  padding-left: 45px;
}
.custom-search-bar:focus {
  outline: none;
}
.custom-heading {
  text-align: left;
  color: #fff;
  background: #482bc7;
}
.custom-body {
  background: #393153;
  text-align: left;
}
.rounded-3 {
  border-radius: 10px;
}
.custom-btn {
  background: #fd1a79;
  padding: 5px 13px;
  border-radius: 20px;
}
.custom-btn {
  margin-top: 10px;
}
.position {
  position: relative;
}
.pos-rel {
  position: absolute;
  width: 14px;
  height: 20px;
  top: 10px;
  right: 156px;
  color: rgb(126, 118, 118);
}
@media screen and (min-width: 380px) and (max-width: 768px) {
  .table-responsive {
    width: 400px;
    overflow-x: scroll;
  }
  /* .custom-btn {
    margin-top: 10px;
  } */
}
</style>
