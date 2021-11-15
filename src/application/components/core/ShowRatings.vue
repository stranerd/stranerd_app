<template>
	<div class="flex no-wrap justify-end">
		<ion-icon
			v-for="(comment,index) in 5"
			:key="'comment'+ index"
			:class="[index <= rating-1 ? 'text-star_yellow' : 'text-icon_inactive', 'h-4 text-2xl  text-[18px]']"
			:icon="starSharp"
		/>

		<!-- <i
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
		/> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, ellipse, starSharp } from 'ionicons/icons'

export default defineComponent({
	name: 'ShowRatings',
	components: { IonIcon },
	props: {
		rating: {
			type: Number,
			required: true
		}
	},
	setup () {
		return {
			starSharp, chevronBackOutline, ellipse
		}
	}

})
</script>

<style lang="scss" scoped>
	i {
		font-size: 0.9rem;
	}
</style>
