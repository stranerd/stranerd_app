<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>Study sets</ion-text>
			</div>
			<router-link
				:to="`/study/sets`"
				class="text-primary normalText flex items-center font-bold">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="filtered.length === 0">
			<EmptyState info="No sets created." />
		</template>

		<template v-else>
			<div class="showcase">
				<SetCard v-for="set in filtered" :key="set.hash" :set="set" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import SetCard from '@app/components/study/sets/SetListCard.vue'
import { SetEntity } from '@modules/study'

export default defineComponent({
	name: 'RootSetList',
	components: { SetCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		sets: {
			type: Array as PropType<SetEntity[]>,
			required: true
		}
	},
	setup (props) {
		const filtered = computed({
			get: () => props.sets.slice(0, 6),
			set: () => {
			}
		})
		return { filtered }
	}
})
</script>

<style>
	ion-badge {
		--background: #FFDC00 !important;
		--color: #132740 !important;
		--padding-top: 6px !important;
	}
</style>
