<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <vue-json-pretty :root-path="path" :data="data" showIcon showLineNumber showLength virtual />
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import jsonData from '../../public/moduls-ucs.json?v=2';

export default {
  name: "JSONViewer",
  components: {
    VueJsonPretty,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      path: "res",
      data: jsonData,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
