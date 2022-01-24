<template>
	<div class="flex no-wrap justify-end">
		<ion-icon
			v-for="index in 5"
			:key="'comment'+ index"
			:class="[index <= rating - 1 ? 'text-star_yellow' : 'text-icon_inactive', 'h-4 text-2xl text-[18px]']"
			:icon="starSharp"
		/>
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
