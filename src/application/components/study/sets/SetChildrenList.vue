<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="You have created any sets yet. <br>
Create your own sets or explore the public and save ones you want."
		>
			<div class="flex items-center gap-5">
				<router-link class="py-3 lg:px-7 px-4 bg-gray text-white font-bold lg:text-base text-xs rounded-xl"
					to="/study/folders/create">
					Create Sets
				</router-link>
				<router-link
					class="py-3 lg:px-7 px-4 border border-solid border-faded_gray text-gray font-bold lg:text-base text-xs rounded-xl"
					to="/search/sets">
					Explore Sets
				</router-link>
			</div>

		</EmptyState>
		<div class="showcase">
			<SetListCard v-for="set in filtered" :key="set.hash" :openMenu="(event) => openMenu(set, event)"
				:set="set" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { SetEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'SetSetsList',
	components: { SetListCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		sets: {
			type: Array as PropType<SetEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const openMenu = (entity: SetEntity, event: Event) => openStudyEntityMenu(entity, { set: props.set }, event)
		const filtered = computed(() => props.sets.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu }
	}
})
</script>
