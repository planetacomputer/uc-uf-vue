<template>
    <div class='some-page-wrapper'>
        <div class='row'>
            <div class="column card flex justify-content-center">
                <MultiSelect v-model="selectedUCs" filter :options="listUC" optionLabel="fullNameUC"
                    placeholder="Selecciona les unitats de competencia" :maxSelectedLabels="3"
                    class="w-full md:w-20rem" />
                <ul class="w3-ul w3-tiny" style="width: 80%;">
                    <li style="color: grey;" v-for="item in selectedUCs" v-on:mouseover="highlight">
                        {{ item.fullNameUC }}
                    </li>
                </ul>
            </div>
            <div class='column'>
                <ul class="w3-ul w3-border w3-hoverable">
                    <li>
                        <h4 class="w3-monospace">Mòduls completats <span class="w3-badge w3-sand" v-if="arrayModulsCompletats.length > 0">{{ arrayModulsCompletats.length }}</span></h4>
                    </li>
                    <li v-for="item in arrayModulsCompletats">
                        {{ item }} - <span class="w3-small w3-text-gray">{{ jsonData.cicles.filter(d => d.nomCicle ===
                    item.split('|')[0].trim())[0].moduls.filter(e => e.nomModul ===
                        item.split('|')[1].trim())[0].ucs.map(e => e.num) }}</span>
                    </li>
                </ul>
                <hr />
                <ul class="w3-ul w3-border w3-hoverable">
                    <li>
                        <h4 class="w3-monospace">Mòduls parcialment completats <span class="w3-badge w3-sand"
                               v-if="arrayModulsAfectats.length > 0">{{ arrayModulsAfectatsComputed.length }}</span>
                        </h4>
                    </li>
                    <li v-for="item in arrayModulsAfectatsComputed">
                        {{ item.split('-')[0].trim() }} - <span class="w3-small w3-text-gray">{{
                    jsonData.cicles.filter(d => d.nomCicle === item.split('|')[0].trim())[0].moduls.filter(e =>
                        e.nomModul === item.split('|')[1].split('-')[0].trim())[0].ucs.map(e => e.num) }}</span>
                    </li>
                </ul>
            </div>
            <div v-show="false">{{ arrayModulsCompletats }}</div>
            <div v-show="false">{{ arrayModulsAfectats }}</div>
            <div v-show="false">{{ uniqueModuls.sort() }}</div>
            <div v-show="false">{{ modulsAfectats }}</div>
            <div v-show="false">{{ arrayModulsCompletatsComputed }}</div>
            <div v-show="false">{{ selectedUCs }}</div>
            <div v-show="false">{{ UCList }}</div>
            <div v-show="false">SET: {{ setUC }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import jsonData from '../../public/moduls-ucs.json';

const selectedUCs = ref([]);
const arrayUC = ref([]);

const setUC = ref(new Set());
const arrayModulsAfectats = ref([]);
const arrayModulsCompletats = ref([]);

const UCList = computed(() => {
    return jsonData.cicles.map(cycle => {
        return cycle.moduls.map(modul => {
            return modul.ucs.map(uc => {
                if (!arrayUC.value.includes(uc)) {
                    uc['fullNameUC'] = cycle.codiCicle + " | " + uc['num'] + " | " + uc['nom'];
                    arrayUC.value.push(uc);
                }
                setUC.value.add(uc);
                return `${uc}`
            });
        });
    });
});

const arrayModulsAfectatsComputed = computed(() => {
    let arrayIntern = [];
    if (arrayModulsAfectats.value.length > 0) {
        return arrayModulsAfectats.value.filter(function (item, pos) {
            if (arrayModulsCompletats.value.indexOf(item.split('-')[0].trim()) == -1) {
                if (arrayIntern.indexOf(item.split('-')[0].trim()) == -1) {
                    arrayIntern.push(item.split('-')[0].trim())
                    //return arrayModulsAfectats.value.indexOf(item);
                    return arrayIntern;
                }
            }

        })
    }
    arrayIntern = [];
})

const arrayModulsCompletatsComputed = computed(() => {
    let hash = {};
    return arrayModulsAfectats.value.forEach(function (item, index) {
        //Split the string in the array element by hyphen
        let split = item.split("-");
        //Create a hash with key first element of the split array and the number of occurrences of that key
        //If first element of split is not in the hash, add it
        if (!hash[split[0]]) {
            hash[split[0]] = 0;
        }
        //Increment the number of occurrences of the key
        hash[split[0]]++;
        //If the number of occurrences of the key is equal to the last element of the split array, push the element to the array arrayModulsCompletats
        if (hash[split[0]] === parseInt(split[2])) {
            if (!arrayModulsCompletats.value.includes(split[0])) {
                arrayModulsCompletats.value.push(split[0]);
            }
        }
        return arrayModulsCompletats;

    });
});

const listUC = computed(() => {
    return getUniqueListBy(arrayUC.value, 'num');
});

const uniqueModuls = computed(() => {
    return arrayModulsAfectats.value.filter((item, i, ar) => ar.indexOf(item) === i);
});

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
const modulsAfectats = computed(() => {
    arrayModulsAfectats.value = [];
    arrayModulsCompletats.value = [];
    if (selectedUCs.value.length > 0) {
        return jsonData.cicles.map(cycle => {
            return cycle.moduls.map(modul => {
                return modul.ucs.map(uc => {
                    selectedUCs.value.forEach(function (item, index) {
                        if (item.num === uc.num) {
                            arrayModulsAfectats.value.push(cycle.codiCicle + " | " + modul.nomModul + "-" + index + 1 + "-" + modul.ucs.length);
                            return `${modul}`
                        }
                    })
                });
            });
        });
    }
})
</script>