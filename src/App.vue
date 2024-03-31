<template>
  <router-link to="/ucs">Unitats de competència</router-link>
  <router-link to="/modules">Mòduls</router-link>
  <router-link to="/json" v-show="$showJSONFitxerMenu">Fitxer JSON</router-link>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped>
a {
  display: inline-block;
  background-color: black;
  border: solid 1px black;
  color: white;
  padding: 5px;
  margin: 10px;
}

a:hover,
a.router-link-active {
  background-color: rgb(110, 79, 13);
}

div {
  /*border: dashed black 1px;
    padding: 20px;*/
  margin: 10px;
  /*display: inline-block;*/
}
</style>

<script setup>
</script>
<style>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: flex-start;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
</style>