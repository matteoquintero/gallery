
<template>
    <div class="mx-auto max-w-9xl px-4 sm:w-3/4 mt-8">
        <div class="grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-2 grid-flow-row-dense ">
            <a href="#" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:bg-pink-700 hover:text-white">Par</a>
            <a href="#" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:bg-pink-700 hover:text-white">Impar</a>
            <a href="#" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:bg-pink-700 hover:text-white">Todos</a>
            <a href="#" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-pink-100 hover:bg-pink-700 hover:text-white">Nada</a>

        </div>
    </div>
    <div class="mx-auto max-w-9xl px-4 sm:w-3/4 mt-8">
        <div class="grid md:grid-cols-4 md:gap-4 sm:grid-cols-2 sm:gap-2 grid-flow-row-dense ">
            <div v-if="!phothos">Loading Please wait...</div>
            <div v-else v-for="item in phothos" class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                <div>
                    <strong>{{ item.title }}</strong>
                    <small>{{ item.albumId }}</small>
                    <img :src="item.thumbnailUrl" :alt="item.title" />
                </div>
                <img :src="item.url" :alt="item.title" />
            </div>
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
        };
    },
    methods: {
        loadPhotos() {
            PhotoService.get(1)
            .then((response: ResponseData) => {
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
