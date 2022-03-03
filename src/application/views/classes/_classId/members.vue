<template>
	<ClassWrapper>
		<h1>Members Tab</h1>
		<div v-for="n in 3" :key="n" class="bg-white p-6 rounded-xl mt-4">
			<div class="flex items-center">
				<Avatar :size="48" src="#" />
				<div class="flex flex-col items-start font-bold ml-4">
					<ion-text class="text-base text-main_dark">
						Timmy Neutron
					</ion-text>
					<tag :index="2" :secondary="true" tag="Comrade" />
				</div>
			</div>
		</div>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/ClassWrapper.vue'

export default defineComponent({
	name: 'ClassClassIdMembers',
	displayName: 'Class',
	components: { ClassWrapper }
})
</script>
