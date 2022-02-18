<template>
	<classWrapper>
		<div>
			<div class="bg-white p-6 rounded-xl mt-4" v-for="n in 3" :key="n">
				<div class="flex items-center">
					<ion-icon
						class="text-gray text-5xl"					
						:icon="chatboxEllipses"
					/>
					<div class="flex flex-col items-start font-bold ml-4">
						<ion-text class="text-base text-main_dark">
							General Discussion
						</ion-text>
						<ion-text class="text-xs text-gray">
							by Timmy Neutron . 2 days ago . 44 messages 
						</ion-text>
					</div>
				</div>
			</div>
		</div>
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'
import { chatboxEllipses } from 'ionicons/icons'

export default defineComponent({
	name: 'classDiscussion',
	displayName: 'Classes',
	components: { classWrapper },
	setup(){
		return {
			chatboxEllipses
		}
	}
})
</script>
