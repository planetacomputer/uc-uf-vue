<template>
    <div class='some-page-wrapper'>
        <div class='row'>
            <div class='column'>
                    <div>
                        <MultiSelect v-model="selectedModuls" :options="groupedModules" filter optionLabel="fullModulName"
                            optionGroupLabel="nomCicle" optionGroupChildren="moduls" :maxSelectedLabels="3"
                            placeholder="Selecciona mòduls" class="w-full md:w-20rem">
                            <template #optiongroup="slotProps">
                                <div class="flex align-items-center">
                                    <img :alt="slotProps.option.codiCicle"
                                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                        :class="`mr-2`" style="width: 18px" />
                                    <div>{{ slotProps.option.codiCicle }}</div>
                                </div>
                            </template>
                        </MultiSelect>
                </div>
            </div>
            <div class='column'>
                <ul class="w3-ul w3-border">
                    <li><h2>Mòduls</h2></li>
                    <li v-for="selectedMod in selectedModuls">
                        <span>{{ selectedMod.fullModulName }} - <span class="w3-small w3-text-gray">
                            {{ jsonData.cicles.filter(d => d.nomCicle === selectedMod.nomCicle).map(e => e.moduls)[0].
                            filter(f => f.nomModul === selectedMod.nomModul).map(h => h.ucs)[0].map(i => (i.num + " " + i.nom)) }}</span></span>
                    </li>
                </ul>                   
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import jsonData from '../../public/moduls-ucs.json';
//import jsonData from '../assets/json/moduls-ucs.json';

const selectedModuls = ref();
const groupedModules = ref(jsonData.cicles);
const modulsNamed = ref([]);

jsonData.cicles.map(cicle => {
        cicle.moduls.map(modul => {
            modul['fullModulName'] = cicle.nomCicle + ' - ' + modul.nomModul;
            modul['nomCicle'] = cicle.nomCicle;
            modulsNamed.value.push(modul);
        });
    });
</script>

