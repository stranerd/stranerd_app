<template>
	<div class="flex items-center justify-between mb-4">
		<div class="flex items-center">
			<img src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000"
				alt="" class="w-8 h-8 rounded-full object-cover mr-2" />
			<IonText class="text-base">{{name}}</IonText>
		</div>
		<IonText class="text-base">10/10</IonText>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
	name: 'studentCard',
	props: {
		name: {
			type: String,
			required: true
		}
	},
	setup(props) {


		return {

		}
	}
})
</script>