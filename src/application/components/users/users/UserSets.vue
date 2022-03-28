<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 py-8 px-4">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 md:gap-4 flex flex-col">
		<div v-if="user.id === id" class="px-4 md:px-0">
			<IonButton class="w-full md:w-auto btn-primary" @click="editMode = !editMode">
				{{ editMode ? 'Done' : 'Edit' }}
			</IonButton>
		</div>
		<SetListCard v-for="set in sets" :key="set.hash" :edit="editMode" :set="set" />
		<EmptyState v-if="!loading && !error && sets.length === 0"
			info="This user hasn't created any folders yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'
import { useUserSetList } from '@app/composable/users/users/sets'
import { useAuth } from '@app/composable/auth/auth'

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
		const { id } = useAuth()
		const editMode = ref(false)
		const { sets, error, loading } = useUserSetList(props.user.id)
		return { sets, error, loading, editMode, id }
	}
})
</script>
