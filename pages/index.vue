<template>
  <div>
    <Header />
    <div class="bg">
      <div class="">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          tempora ullam consequuntur quidem. Et nihil recusandae ex? Minus earum
          possimus asperiores dolorum cupiditate at repellendus maxime ut eum!
          Mollitia, autem!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          tempora ullam consequuntur quidem. Et nihil recusandae ex? Minus earum
          possimus asperiores dolorum cupiditate at repellendus maxime ut eum!
          Mollitia, autem!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          tempora ullam consequuntur quidem. Et nihil recusandae ex? Minus earum
          possimus asperiores dolorum cupiditate at repellendus maxime ut eum!
          Mollitia, autem!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          tempora ullam consequuntur quidem. Et nihil recusandae ex? Minus earum
          possimus asperiores dolorum cupiditate at repellendus maxime ut eum!
          Mollitia, autem!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          tempora ullam consequuntur quidem. Et nihil recusandae ex? Minus earum
          possimus asperiores dolorum cupiditate at repellendus maxime ut eum!
          Mollitia, autem!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          tempora ullam consequuntur quidem. Et nihil recusandae ex? Minus earum
          possimus asperiores dolorum cupiditate at repellendus maxime ut eum!
          Mollitia, autem!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          tempora ullam consequuntur quidem. Et nihil recusandae ex? Minus earum
          possimus asperiores dolorum cupiditate at repellendus maxime ut eum!
          Mollitia, autem!
        </p>
        <br />
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
  mounted() {
    if (process.browser) {
      if (localStorage.getItem("token") !== null) {
        this.$router.push("/dashboard");
      }
    }
  },
};
</script>

<style scoped>
.bg {
  background: #1f1b2e;
  min-height: 100vh;
  color: #fff;
  padding: 60px;
  text-align: center;
}
</style>
