<template>
  <div>
    <Header />
    <div class="custombg text-white">
      <div class="flex justify-center">
        <div class="text-white">
          <div class="container mx-auto pt-5">
            <div class="flex justify-between mb-5">
              <h2 class="custom-color pr-5">Member List</h2>
              <div class="pl-5 position">
                <input
                  v-model="searchTerm"
                  @input="serchUser"
                  class="custom-search-bar"
                  type="text"
                  placeholder="Search..."
                />
                <img
                  class="pos-rel"
                  src="~/assets/images/bx_bx-search-alt.png"
                  alt=""
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
                    <th class="px-5 py-2" style="width: 200px">Action</th>
                  </thead>

                  <tbody class="rounded-3 mt-3 custom-body">
                    <tr
                      v-for="(users, key) in searchTerm === ''
                        ? showform
                        : filtersearch"
                      :key="key"
                    >
                      <td class="px-5 py-3">{{ key + 1 }}</td>
                      <td class="px-5 py-3">{{ users.username }}</td>
                      <td class="px-5 py-3 col-ylw">{{ users.email }}</td>
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
              <div class="pagination">
                <button @click="previousPagination" class="cust-border">
                  <img
                    class="cust-pl"
                    src="~/assets/images/left-arrow.png"
                    alt=""
                  />
                </button>
                <button
                  :class="active === i ? 'bg-transparent' : 'btn'"
                  class="btn"
                  v-for="(i, index) in buttonNumber"
                  :key="index"
                  @click="setData(i)"
                >
                  {{ i }}
                </button>
                <button @click="nextPagination" class="cust-border">
                  <img
                    class="cust-pl"
                    src="~/assets/images/right-arrow.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";

export default {
  components: {
    Header,
  },

  data() {
    return {
      showform: [],
      searchTerm: "",
      FullUserList: [],
      perPage: 10,
      mod: "",
      buttonNumber: "",
      start: 0,
      end: 10,
      active: 1,
      filtersearch: [],
      totalFiltersearch: [],
      totalItems: "",
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

  computed: {
    // filtersearch() {
    //   return this.showform.filter((showform) => {
    //     return showform.username.match(this.searchTerm);
    //   });
    // },
  },

  methods: {
    async getUser() {
      // Get User List
      let getuserList = await this.$axios.$get("/member/accountList");

      // Shorting in ASC
      const sorter1 = (a, b) =>
      a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
      getuserList.data.sort(sorter1);
      this.active = 1;

      // Pagination and Get Button Number
      this.FullUserList = getuserList.data;
      this.totalItems = this.FullUserList.length;
      this.showform = getuserList.data.slice(this.start, this.end);
      this.mod = this.totalItems % this.perPage === 0 ? "no-mod" : "has-mod";
      if (this.mod === "no-mod") {
        this.buttonNumber = this.totalItems / this.perPage;
      } else if (this.mod === "has-mod") {
        let mod = this.totalItems % this.perPage;
        let round = this.totalItems - mod;
        let TotalButtton = round / this.perPage;
        this.buttonNumber = TotalButtton + 1;
      }
    },

    // Delele Account
    async deleteAccount(id) {
      if (confirm("Are You Sure ?")) {
        let payload = { id: id };
        await this.$axios
          .$post("/member/deleteAccount", payload)
          .then(() => {
            this.$toast.show({
              type: "success",
              title: "Success",
              message: "Account Deleted Successful",
            });
            this.getUser();
          })
          .catch((error) => {
            this.$toast.show({
              type: "success",
              title: "Success",
              message: error,
            });
            this.getUser();
          });
      }
    },

    // Pagination Data Showing
    setData(i) {
      if (this.searchTerm === "") {
        let data = this.FullUserList;
        if (i == 1) {
          this.showform = data.slice(this.start, this.end);
          this.active = 1;
        } else {
          let start = 10;
          this.showform = data.slice(start * (i - 1), this.end * i);
          this.active = i;
        }
      } else {
        let data = this.filtersearch;
        console.log(i);
        if (i == 1) {
          this.filtersearch = this.totalFiltersearch.slice(
            this.start,
            this.end
          );
          this.active = 1;
        } else {
          let start = 10;
          this.filtersearch = this.totalFiltersearch.slice(
            start * (i - 1),
            this.end * i
          );
          this.active = i;
        }
      }
    },
    previousPagination() {
      if (this.active > 1) {
        this.active = this.active - 1;
        this.setData(this.active);
      }
    },
    nextPagination() {
      if (this.active < this.buttonNumber) {
        this.active = this.active + 1;
        this.setData(this.active);
      }
    },
    serchUser() {
      this.active = 1;
      this.filtersearch = this.FullUserList;

      this.filtersearch = this.filtersearch.filter((showform) => {
        return showform.username.match(this.searchTerm);
      });
      this.totalFiltersearch = this.filtersearch;
      this.totalItems = this.filtersearch.length;
      this.mod = this.totalItems % this.perPage === 0 ? "no-mod" : "has-mod";
      if (this.mod === "no-mod") {
        this.buttonNumber = this.totalItems / this.perPage;
      } else if (this.mod === "has-mod") {
        let mod = this.totalItems % this.perPage;
        let round = this.totalItems - mod;
        let TotalButtton = round / this.perPage;
        this.buttonNumber = TotalButtton + 1;
      }
      console.log(this.filtersearch.length);
    },
  },
  watch: {
    searchTerm(value) {
      if (value === "") {
        this.getUser();
      }
    },
  },
};
</script>

<style scoped>
.custombg {
  background: #1f1b2e;
  min-height: 100vh;
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
  padding-left: 45px !important;
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
  width: 20px;
  height: 20px;
  top: 10px;
  right: 156px;
  color: rgb(126, 118, 118);
}
.col-ylw {
  color: #fdd032;
}
.pagination {
  display: flex;
  justify-content: center;
}
.btn {
  width: 27px;
  height: 27px;
  background: #393153;
  border-radius: 50%;
  margin: 25px 10px;
  font-weight: bold;
}
.btn:hover {
  background: transparent;
  border: 2px solid #5b32fd;
  border-radius: 50%;
}
.cust-border {
  margin: 25px 10px;
  width: 27px;
  height: 27px;
  border: 1px solid #5b32fd;
  border-radius: 50%;
}
.cust-pr {
  padding-right: 9px;
}
.cust-pl {
  padding-left: 9px;
}
.bg-transparent {
  width: 37px;
  height: 37px;
  background: #5b32fd;
  border-radius: 50%;
  margin: 20px 10px;
  font-weight: bold;
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
