<template>
	<div class="d-inline-flex text-nowrap justify-content-center">
		<a @click.prevent="setRating(1)">
			<i :class="rating > 0 ? 'text-gold' : 'text-sub'" class="fas fa-star" />
		</a>
		<a @click.prevent="setRating(2)">
			<i :class="rating > 1 ? 'text-gold' : 'text-sub'" class="fas fa-star" />
		</a>
		<a @click.prevent="setRating(3)">
			<i :class="rating > 2 ? 'text-gold' : 'text-sub'" class="fas fa-star" />
		</a>
		<a @click.prevent="setRating(4)">
			<i :class="rating > 3 ? 'text-gold' : 'text-sub'" class="fas fa-star" />
		</a>
		<a @click.prevent="setRating(5)">
			<i :class="rating > 4 ? 'text-gold' : 'text-sub'" class="fas fa-star" />
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'SelectRating',
	props: {
		rating: {
			type: Number,
			required: true
		},
		setRating: {
			type: Function as PropType<(val: number) => void>,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	a {
		margin: 0 0.2rem;
	}
</style>
