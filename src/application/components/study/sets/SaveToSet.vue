<template>
	<div class="flex flex-col gap-1 text-sm">
		<span v-if="!set" class="flex gap-4 items-center" @click="showSets = !showSets">
			<IonIcon :icon="showSets ? chevronUp : chevronDown" class="text-2xl" />
			<IonText class="font-bold">Save In Folder</IonText>
		</span>
		<div v-else class="flex gap-2 items-center">
			<IonText class="text-sm truncate w-full max-w-[10rem]">-&nbsp;&nbsp;{{ set.name }}</IonText>
			<IonIcon v-if="sets.length" :icon="showSets ? chevronUp : chevronDown" class="text-xl"
				@click="showSets = !showSets" />
			<IonIcon :icon="set.allSaved.includes(itemId) ? heart : heartOutline" class="text-xl" @click="saveItem" />
		</div>
		<div v-if="showSets && sets.length" class="ml-2">
			<SaveToSet v-for="set in sets" :key="set.hash" :itemId="itemId" :save="(savingSet) => save(savingSet)"
				:set="set" :unsave="(savingSet) => unsave(savingSet)" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { SetEntity } from '@modules/study'
import { chevronDown, chevronUp, heart, heartOutline } from 'ionicons/icons'
import { useSet, useUserRootSet } from '@app/composable/study/sets'

export default defineComponent({
	name: 'SaveToSet',
	props: {
		set: {
			type: SetEntity,
			required: false
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
		const showSets = ref(false)
		const { loading, error, sets } = props.set ? useSet(props.set) : useUserRootSet()
		const saveItem = async () => {
			if (!props.set) return
			if (props.set.allSaved.includes(props.itemId)) await props.unsave(props.set)
			else await props.save(props.set)
		}
		return {
			chevronUp, chevronDown, heart, heartOutline,
			showSets, loading, error, sets, saveItem
		}
	}
})
</script>
