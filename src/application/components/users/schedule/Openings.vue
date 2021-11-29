<template>
	<div :class="`w-full ${colorClass} rounded-lg py-5 px-4 text-main_dark font-bold flex flex-col`">
		<div class="flex flex-row items-center normalText">
			<ion-icon :icon="calendar" class="text-[22px] mr-2 text-icon_inactive"></ion-icon>
			<span>10:00 - 11:00</span>
		</div>
		<div class="flex flex-row items-center mt-3 headings">
			<h2>{{ isOpening ? 'Opening' : 'Organic Chemistry' }}</h2>
		</div>
		<div class="flex flex-row items-center mt-9 normalText">
			<template v-if="!isOpening">
				<img class="inline h-5 mr-2" src="@app/assets/images/icons/person-circle.svg" />
				<span>Session with Jerry</span>
			</template>
			<template v-else>
				<span class="text-delete_red">Delete</span>
			</template>
		</div>
	</div>
</template>
<script lang="ts">

import { IonIcon } from '@ionic/vue'
import { calendar, time } from 'ionicons/icons'

export default {
	name: 'Opening',
	components: { IonIcon },
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		isOpening: {
			type: Boolean,
			default: false
		}
	},
	setup () {
		return {
			calendar, time
		}
	}

}
</script>
