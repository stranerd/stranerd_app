<template>
	<classWrapper>

		<h1>
			classParticipants
		</h1>

		<div>
			<div class="bg-white p-6 rounded-xl mt-4" v-for="n in 3" :key="n">
				<div class="flex items-center">
					<Avatar  :size="48" src="#" />
					<div class="flex flex-col items-start font-bold ml-4">
						<ion-text class="text-base text-main_dark">
							Timmy Neutron
						</ion-text>
						<tag :index="2" :secondary="true" tag="Comrade"/>
					</div>
				</div>

		
			
			</div>
		</div>
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'
import Tag from '@root/application/components/core/Tag.vue'

export default defineComponent({
	name: 'classParticipants',
	displayName: 'Classes',
	components: { classWrapper, Tag }
})
</script>
