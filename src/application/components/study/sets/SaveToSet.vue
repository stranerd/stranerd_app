<template>
	<div class="flex flex-col gap-1 text-sm">
		<template v-if="set">
			<span class="flex gap-2 items-center">
				<IonIcon v-if="root && sets.length" :icon="showSets ? chevronUp : chevronDown" class="text-2xl"
					@click="showSets = !showSets" />
				<IonText :class="{'font-bold': root}" class="truncate w-full max-w-[10rem]"
					@click="showSets = !showSets">
					{{ root ? `Save To ${set.name}` : `-  ${set.name}` }}
				</IonText>
				<IonIcon v-if="!root && sets.length" :icon="showSets ? chevronUp : chevronDown" class="text-xl"
					@click="showSets = !showSets" />
				<IonIcon :class="root ? 'text-2xl' : 'text-xl'"
					:icon="set.allSaved.includes(itemId) ? bookmark : bookmarkOutline"
					@click="saveItem" />
			</span>
		</template>
		<div v-if="showSets && sets.length" :class="{'ml-2': set}">
			<SaveToSet v-for="loopSet in sets" :key="loopSet.hash" :itemId="itemId"
				:root="!set"
				:save="(savingSet) => save(savingSet)" :set="loopSet"
				:unsave="(savingSet) => unsave(savingSet)" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { SetEntity } from '@modules/study'
import { bookmark, bookmarkOutline, chevronDown, chevronUp } from 'ionicons/icons'
import { useSet, useUserRootSet } from '@app/composable/study/sets'

export default defineComponent({
	name: 'SaveToSet',
	props: {
		set: {
			type: SetEntity,
			required: false
		},
		root: {
			type: Boolean,
			required: false,
			default: false
		},
		save: {
			type: Function as PropType<(set: SetEntity) => Promise<void>>,
			required: true
		},
		unsave: {
			type: Function as PropType<(set: SetEntity) => Promise<void>>,
			required: true
		},
		itemId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const showSets = ref(!props.set)
		const { loading, error, sets } = props.set ? useSet(props.set) : useUserRootSet()
		const saveItem = async () => {
			if (!props.set) return
			if (props.set.allSaved.includes(props.itemId)) await props.unsave(props.set)
			else await props.save(props.set)
		}
		return {
			chevronUp, chevronDown, bookmark, bookmarkOutline,
			showSets, loading, error, sets, saveItem
		}
	}
})
</script>
