<template>
    <div class='some-page-wrapper'>
        <div class='row'>
            <div class="column card flex justify-content-center">
                <MultiSelect v-model="selectedUCs" filter :options="listUC" optionLabel="fullNameUC"
                    placeholder="Selecciona les unitats de competencia" :maxSelectedLabels="3"
                    class="w-full md:w-20rem" />
                <ul class="w3-ul w3-tiny" style="width: 80%;">
                    <li @mouseover="hoverUCList($event, item.num)" @mouseleave="hoverOut" v-bind:id="item.num" :key="{key}" :style="modulCompletHover ? `--bcolor: #bff8e5` : `--bcolor: #ede09f`" :class="{ backcolorClassUCs: (classObject[item.num]) }" class="w3-display-container" v-for="(item, key) in selectedUCs">
                        <span>{{ item.fullNameUC }}</span><span @mouseover.stop="hoverOut" @click="removeSelectedUC($event)" class="w3-button w3-display-right w3-tiny">&times;</span>
                    </li>
                </ul>
            </div>
            <div class='column'>
                <ul class="w3-ul w3-border w3-hoverable">
                    <li class="modulsCompletatsHeader">
                        <h4 class="w3-monospace">Mòduls completats <span class="w3-badge w3-sand" v-if="arrayModulsCompletats.length > 0">{{ arrayModulsCompletats.length }}</span></h4>
                    </li>
                    <li @mouseover="hoverIn($event, 1)" @mouseleave="hoverOut" :style="`--bcolor: #bff8e5`" :class="{ backcolorClass: (classObject[item]) }" v-for="item in arrayModulsCompletats">
                        {{ item }} - <span class="w3-small w3-text-gray">{{ jsonData.cicles.filter(d => d.nomCicle ===
                    item.split('|')[0].trim())[0].moduls.filter(e => e.nomModul ===
                        item.split('|')[1].trim())[0].ucs.map(e => e.num) }}</span>
                    </li>
                </ul>
                <hr />
                <ul class="w3-ul w3-border w3-hoverable">
                    <li class="modulsIncompletatsHeader">
                        <h4 class="w3-monospace">Mòduls parcialment completats <span class="w3-badge w3-sand"
                               v-if="arrayModulsAfectats.length > 0">{{ arrayModulsAfectatsComputed.length }}</span>
                        </h4>
                    </li>
                    <li @mouseover="hoverIn($event, 0)" @mouseleave="hoverOut" :style="`--bcolor: #ede09f`" :class="{ backcolorClass: (classObject[item]) }" v-for="item in arrayModulsAfectatsComputed">
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
            <div v-show="false">{{ setUC }}</div>
        </div>
    </div>
</template>
<style scoped>
.backcolorClass {
    background-color: var(--bcolor);
}

.backcolorClassUCs {
    background-color: var(--bcolor);
}

.backcolorClassUCs:hover {
    background-color: #ccc;
}

.modulsCompletatsHeader, .modulsCompletatsHeader:hover{
    background-color: rgb(191, 248, 229) !important;
}

.modulsIncompletatsHeader, .modulsIncompletatsHeader:hover{
    background-color: rgb(237, 224, 159) !important;
}

</style>
<script setup>
import { ref, computed, reactive } from "vue";
import jsonData from '../../public/moduls-ucs.json';

const selectedUCs = ref([]);
const arrayUC = ref([]);
const modulCompletHover = ref(false);
const classObject = reactive({})
const setUC = ref(new Set());
const arrayModulsAfectats = ref([]);
const arrayModulsCompletats = ref([]);

function hoverOut(event){
    selectedUCs.value.forEach(function (item, index) {
        classObject[item.num] = false;
    });
    arrayModulsAfectatsComputed.value.forEach(function (item, index) {
        classObject[item] = false;
    });
    arrayModulsCompletats.value.forEach(function (item, index) {
        classObject[item] = false;
    });
}

function hoverUCList(event, itemnum) {
    
    if (event) {
        selectedUCs.value.forEach(function (item, index) {
            classObject[itemnum] = true;
        });
        let listElement = event.target;
        //Obtenim el número de la UC
        let ucNumber = listElement.textContent.split('|')[1].trim()
        arrayModulsAfectatsComputed.value.forEach(function (item, index) {
            //Find the modules in json file that are affected by the selected UC
            let nombreModulo = item.split('|')[1].split('-')[0].trim() 
            let nombreCiclo = item.split('|')[0].trim()
            let afectadas = jsonData.cicles.filter(d => d.nomCicle === nombreCiclo)[0].moduls.filter(
                e => e.nomModul === nombreModulo)[0].ucs.filter(e => e.num === ucNumber)
            if(afectadas.length>0){
                classObject[item] = true;
            }
        });
        arrayModulsCompletats.value.forEach(function (item, index) {
            //Find the modules in json file that are affected by the selected UC
            let nombreModulo = item.split('|')[1].split('-')[0].trim() 
            let nombreCiclo = item.split('|')[0].trim()
            let completadas = jsonData.cicles.filter(d => d.nomCicle === nombreCiclo)[0].moduls.filter(
                e => e.nomModul === nombreModulo)[0].ucs.filter(e => e.num === ucNumber)
            if(completadas.length>0){
                classObject[item] = true;
            }
        });
    }
}

function hoverIn(event, modulComplete) {
  if (event) {
    modulCompletHover.value = modulComplete;
    let listElement = event.target;
    let arrUC = '';
    try {  
        arrUC = listElement.firstChild.nextElementSibling.innerHTML;  
        selectedUCs.value.forEach(function (item, index) {
            classObject[item.num] = false;
        });
        const parsedArray = JSON.parse(arrUC).map(item => `${item}`);
        parsedArray.forEach(function (item, index) {
            classObject[item] = true;
        });  
    } catch (e) {}
  }
}

function removeSelectedUC(event) {
    let listElement = event.target
    listElement.parentElement.style.display='none'
    let ucNumber = listElement.previousSibling.textContent.split('|')[1].trim()
    selectedUCs.value = selectedUCs.value.filter(function (value, index, arr) {
        return value.num !== ucNumber;
    });
}

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