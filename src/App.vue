
<template>
    <div class="card flex justify-content-center">
        <MultiSelect v-model="selectedCities" :options="groupedCities" filter optionLabel="label" optionGroupLabel="nomCicle" optionGroupChildren="moduls" display="chip" placeholder="Selecciona mòduls" class="w-full md:w-20rem">
            <template #optiongroup="slotProps">
                <div class="flex align-items-center">
                    <img :alt="slotProps.option.codiCicle" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.nomCicle.toLowerCase()} mr-2`" style="width: 18px" />
                    <div>{{ slotProps.option.codiCicle }}</div>
                </div>
            </template>
        </MultiSelect>
    </div>

    <div class="card flex justify-content-center">
        <MultiSelect v-model="selectedUCs" :options="arrayUC" optionLabel="nom" placeholder="Select UCs"
            :maxSelectedLabels="3" class="w-full md:w-20rem" />
    </div>

    <li v-for="selectedCity in selectedCities">
        <span>{{ selectedCity.label }}</span>
    </li>
    <div>{{ UCList }}</div>
    <div>SET: {{ setUC }}</div>
</template>

<script setup>
import { ref, computed } from "vue";
import jsonData from './assets/json/moduls-ucs.json'; 

const selectedCities = ref();
const selectedUCs = ref();
const groupedCities = ref(jsonData.cicles);
const arrayUC = ref([]);
const setUC = ref(new Set());


const computedArray = computed(() => {
    return jsonData.cicles.map(cycle => {
      // Perform your transformation logic here
      return `${cycle.nomCicle}`
    });
});

const UCList = computed(() => {
    return jsonData.cicles.map(cycle => {
        return cycle.moduls.map(modul => {
            return modul.value.map(uc => {
                arrayUC.value.push(uc);
                setUC.value.add(uc);
                console.log(uc)
                return `${uc}`
        });
    });
});
});


</script>
