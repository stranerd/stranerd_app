<template>
	<div>
		<Swiper :freeMode="true" :items="photos" :slides="3" class="md:hidden overflow-x-auto" slideClass="!w-24 mr-3">
			<template v-slot:default="{ item: photo, index }">
				<img :src="photo.link" alt=""
					class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-24 w-24 cursor-pointer"
					@click="showImage(photo, index)">
			</template>
		</Swiper>
		<Swiper :items="photos" :slides="3" class="hidden w-full md:block" slideClass="!w-40 mr-4">
			<template v-slot:default="{ item: photo, index }">
				<img :src="photo.link" alt=""
					class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-40 w-40 cursor-pointer"
					@click="showImage(photo, index)">
			</template>
		</Swiper>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Media } from '@modules/core'
import Swiper from '@app/components/core/Swiper.vue'

export default defineComponent({
	name: 'PhotoList',
	props: {
		photos: {
			type: Object as () => Media[],
			required: true
		}
	},
	components: { Swiper },
	setup () {
		const showImage = (image: Media, index: number) => {
			// console.log(image, index)
			//imageSrc.value = props.photos
			//showModal.value = true
			//componentName.value = 'photoView'
			//selectedImageIndex.value = index
		}

		return { showImage }
	}
})
</script>
