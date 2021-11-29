<template>
	<Justified>
		<div>
			<TopSection :name="name"/>
			<slot />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { checkmarkDone } from 'ionicons/icons'
import TopSection from '@app/components/study/explore/TopSection.vue'

export default defineComponent({
	name: 'StudyExplore',
	displayName: 'Explore',
	middlewares: ['isAuthenticated'],
	components: { Justified, TopSection },
	props:{
		name:{
			type: String,
			required:true
		}
	},
	setup () {

		return { checkmarkDone }
	}
})
</script>

