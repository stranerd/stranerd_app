<template>
	<classWrapper>
		<div class="bg-white p-6 rounded-xl mt-4" v-for="n in 3" :key="n">
			<div class="flex items-center mb-4">
				<Avatar  :size="48" src="#" />
				<div class="flex flex-col font-bold ml-4">
					<ion-text class="text-base text-main_dark">
						Timmy Neutron
					</ion-text>
					<ion-text class="text-xs text-gray">
						Tutor . 1 day ago  
					</ion-text>
				</div>
			</div>

			<ion-text class="text-xl">
				Hi, I am your maths tutor and I have posted all necessary notes for this semester. I am available for discussions everyday by 5pm.
			</ion-text>
		
		</div>
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'

export default defineComponent({
	name: 'classAnnouncement',
	displayName: 'Classes',
	components: { classWrapper }
})
</script>
