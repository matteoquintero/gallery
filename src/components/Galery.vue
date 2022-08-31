
<template>
    <div class="mx-auto max-w-9xl px-4 sm:w-3/4 mt-8">
        <div class="grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-2 grid-flow-row-dense ">
            <button v-if="!hiddeButtonEven" v-on:click="evenPhotos()" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:text-pink-200">Par</button>
            <button v-if="!hiddeButtonOdd" v-on:click="oddPhotos()" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:text-pink-200">Impar</button>
            <button v-on:click="loadPhotos()" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:text-pink-200">Todos</button>
            <button v-on:click="cleanPhotos()" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:text-pink-200">Nada</button>

        </div>
    </div>
    <div class="mx-auto max-w-9xl px-4 sm:w-3/4 mt-8">
        <div class="grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-2 grid-flow-row-dense">
            <div v-if="!phothos">Loading Please wait...</div>
            <div v-else v-for="item in phothos" class="group cursor-pointer flex flex-col justify-center items-center">
                <div class="hidden group-hover:block h-full">
                    <div class="flex flex-col justify-center items-center h-full">
                        <strong class="text-pink-100">{{ item.title }}</strong>
                        <small class="text-pink-200">{{ item.albumId }}</small>
                        <img :src="item.thumbnailUrl" :alt="item.title" />                        
                    </div>                    
                </div>
                <small class="text-1xl text-pink-200 text-center">{{ item.id }}</small>
                <img class="group-hover:hidden" :src="item.url" :alt="item.title" />
            </div>
        </div>
    </div>
        <div class="w-full text-center mt-8">
        <div class="inline-flex rounded-md shadow">
            <a href="#" v-on:click="loadPhotos()" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:bg-pink-700 hover:text-white">Cargar mas</a>
        </div>
    </div>
</template>

<script lang="ts" >
    import type Photo from "@/interfaces/photo.interface";
    import type ResponseData from "@/interfaces/response-data.interface";
    import PhotoService from "@/services/photo.service";
    import { defineComponent } from "vue";
    export default defineComponent({
    data() {
        return {
            phothos: [] as Photo[],
            counter: 1,
            hiddeButtonOdd: false,
            hiddeButtonEven: false
        };
    },
    methods: {
        cleanPhotos(){
            this.phothos = []
        },        
        evenPhotos(){
            this.hiddeButtonOdd = true
            this.phothos = this.phothos.filter(function(element) {
                return (element.id % 2 === 0);
            })
        },
        oddPhotos(){
            this.hiddeButtonEven = true
            this.phothos = this.phothos.filter(function(element) {
                return (element.id % 2 !== 0);
            })
        },        
        loadPhotos() {
            this.hiddeButtonEven = false
            this.hiddeButtonOdd = false
            PhotoService.get(this.counter)
            .then((response: ResponseData) => {
                
                /*hack :(*/
                this.counter++;

                this.phothos = response.data.map((photo: { [x: string]: any; id: any; url: any; title: any; thumbnailUrl: any; }) => {
                return {
                    albumId: photo.albumId,
                    id: photo.id,
                    url: photo.url,
                    title: photo.title,
                    thumbnailUrl: photo.thumbnailUrl
                };
            });

            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
    },
    mounted() {
        this.loadPhotos();
    },
    });
</script>
