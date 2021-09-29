<template>
	<div class="d-inline-flex text-no-wrap justify-content-end">
		<i
			:class="{'fa-star text-gold': rating >= 0.5, 'fa-star-half-alt text-gold': rating > 0 && rating < 0.5, 'fa-star text-sub': rating <= 0 }"
			class="fas"
		/>
		<i
			:class="{'fa-star text-gold': rating >= 1.5, 'fa-star-half-alt text-gold': rating > 1 && rating < 1.5, 'fa-star text-sub': rating <= 1 }"
			class="fas"
		/>
		<i
			:class="{'fa-star text-gold': rating >= 2.5, 'fa-star-half-alt text-gold': rating > 2 && rating < 2.5, 'fa-star text-sub': rating <= 2 }"
			class="fas"
		/>
		<i
			:class="{'fa-star text-gold': rating >= 3.5, 'fa-star-half-alt text-gold': rating > 3 && rating < 3.5, 'fa-star text-sub': rating <= 3 }"
			class="fas"
		/>
		<i
			:class="{'fa-star text-gold': rating >= 4.5, 'fa-star-half-alt text-gold': rating > 4 && rating < 4.5, 'fa-star text-sub': rating <= 4 }"
			class="fas"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue
export default defineComponent({
	name: 'ShowRatings',
	props: {
		rating: {
			type: Number,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	i {
		font-size: 0.9rem;
	}
</style>
