<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 py-8">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 gap-4 flex flex-col text-body">
		<SetListCard v-for="set in sets" :key="set.hash" :openMenu="(event) => openMenu(set, event)" :set="set" />
		<EmptyState v-if="!loading && !error && sets.length === 0"
			info="This user hasn't created any folders yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'
import { SetEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { useUserRootSet } from '@app/composable/study/sets'

export default defineComponent({
	name: 'ProfileSets',
	components: { SetListCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { sets, error, loading } = useUserRootSet(props.user.id)
		const openMenu = (entity: SetEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		return { sets, error, loading, openMenu }
	}
})
</script>
