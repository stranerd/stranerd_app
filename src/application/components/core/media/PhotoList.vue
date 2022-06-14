<template>
	<div v-if="photos.length">
		<div v-if="zoomed" class="zoomed">
			<div class="under" @click="zoomed = false" />
			<div class="inner">
				<span id="close" @click="zoomed = false">
					<IonIcon :icon="close" class="text-heading3" />
				</span>
				<img :src="photos[index].link" alt="" class="w-full">
			</div>
		</div>
		<div class="scroller flex gap-2">
			<img v-for="(photo, index) in photos" :key="photo.link" :src="photo.link" alt=""
				class="rounded-lg h-20 w-20"
				@click="enterZoom(index)">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Media } from '@modules/core'
import { close } from 'ionicons/icons'

export default defineComponent({
	name: 'PhotoList',
	props: {
		photos: {
			type: Array as PropType<Media[]>,
			required: true
		}
	},
	setup () {
		const zoomed = ref(false)
		const index = ref(0)
		const enterZoom = (idx: number) => {
			index.value = idx
			zoomed.value = true
		}
		return { zoomed, index, enterZoom, close }
	}
})
</script>

<style lang="scss" scoped>
	$max-width: 800px;
	.zoomed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		z-index: 100000;

		@media (max-width: $max-width) {
			padding: 0.5rem;
		}

		.under {
			background: $color-bodyBg;
			opacity: 0.8;
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.inner {
			width: 100%;
			margin: auto;
			max-width: $max-width;
			position: relative;

			img {
				max-width: 100vw;
				max-height: 100vh;
				object-fit: contain;
			}

			#close {
				margin: 1rem;
				position: absolute;
				right: 0;
				top: 0;
				z-index: 1;
				background: $color-primaryBg;
				color: $color-primaryText;
				border-radius: 10rem;
				padding: 0.5rem;
				width: 2.5rem;
				height: 2.5rem;
			}
		}
	}

	.scroller {
		overflow-x: auto;
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
