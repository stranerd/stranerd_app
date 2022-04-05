<template>
	<DashboardLayout>
		<div class="py-4 md:px-4 lg:px-0">
			<div class="px-4 md:px-0">
				<IonSegment v-model="tab"
					class="w-full bg-new_gray text-gray border border-new_gray border-xl md:border-white">
					<IonSegmentButton class="w-full" value="mine">My Classes</IonSegmentButton>
					<IonSegmentButton class="w-full" value="explore">Explore Classes</IonSegmentButton>
				</IonSegment>
			</div>
			<div class="md:mt-4">
				<ExploreClassesList v-if="tab=== 'explore'" />
				<ClassesList v-else />
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'
import ExploreClassesList from '@app/components/classes/classes/ExploreClassesList.vue'
import { IonSegment, IonSegmentButton } from '@ionic/vue'

export default defineComponent({
	name: 'Classes',
	displayName: 'Classes',
	components: { DashboardLayout, ClassesList, ExploreClassesList, IonSegment, IonSegmentButton },
	middlewares: ['isAuthenticated'],
	setup () {
		const tab = ref('mine')
		return { tab }
	}
})
</script>

<style lang="scss" scoped>
	ion-segment {
		border-radius: 0.5rem;
	}

	ion-segment-button {
		--background-checked: #{$color-white};
		--background-focused: #{$color-white};
		--indicator-color: #{$color-white};
		--padding-top: 0.75rem;
		--padding-bottom: 0.75rem;
		font-weight: bold;
		border-radius: 0.5rem;
		text-transform: capitalize;
		max-width: unset;
		color: $color-gray;
	}

	.segment-button-checked {
		color: $color-gray !important;
		background: $color-white;
	}
</style>
