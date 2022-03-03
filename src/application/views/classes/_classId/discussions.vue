<template>
	<ClassWrapper>
		<h1>Discussions Tab</h1>
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
					<ion-text class="text-xs text-gray flex items-center ">
						by Timmy Neutron <span class="dot" /> 2 days ago <span class="dot" /> 44 messages
					</ion-text>
				</div>
			</div>
		</div>
	</ClassWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassWrapper from '@app/components/classes/ClassWrapper.vue'

export default defineComponent({
	name: 'ClassClassIdDiscussions',
	displayName: 'Class',
	components: { ClassWrapper }
})
</script>
