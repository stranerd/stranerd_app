<template>
	<router-link :to="`/classes/${classInst.id}`" class="rounded-xl bg-white gap-2 p-4 flex flex-col w-full">
		<div class="flex gap-2 items-center">
			<Avatar :name="classInst.name" :size="40" :src="classInst.photo" class="md:hidden" />
			<Avatar :name="classInst.name" :size="48" :src="classInst.photo" class="hidden md:inline" />
			<div class="flex flex-col">
				<ion-text class="text-main_dark font-500 capitalize">
					{{ classInst.name }}
				</ion-text>
				<ion-text class="text-sub text-gray">
					{{ classInst.members.length }} {{ pluralize(classInst.members.length, 'member', 'members') }}
				</ion-text>
			</div>
			<div v-if="!classInst.members.includes(id)" class="ml-auto">
				<IonSpinner v-if="loading" />
				<IonButton v-else class="btn-primary" style="--padding-top:0;--padding-bottom: 0;"
					@click="requestToJoinClass(!classInst.requests.includes(id))">
					{{ classInst.requests.includes(id) ? 'Cancel Request' : 'Join' }}
				</IonButton>
			</div>
		</div>
		<span>{{ classInst.description }}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { pluralize } from '@utils/commons'
import { useClassMembersList } from '@app/composable/classes/classes'
import { IonSpinner } from '@ionic/vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ExploreClassListCard',
	components: { IonSpinner },
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { loading, requestToJoinClass } = useClassMembersList(props.classInst, true)
		return { id, pluralize, loading, requestToJoinClass }
	}
})
</script>
