<template>
	<div class="flex items-center gap-2 card-padding !px-0">
		<span>
			<Avatar :id="user.id" :name="user.bio.fullName" :size="24" :src="user.bio.photo" />
		</span>
		<span class="flex-grow truncate font-bold ">{{ user.bio.fullName }}</span>
		<template v-if="user.id !== id">
			<SpinLoading v-if="loading" />
			<div v-else-if="connect" class="rounded-full border-primaryBg border text-primaryBg py-1 px-3">
				Connected
			</div>
			<IonButton v-else-if="!connect" class="btn-primary" style="

--border-radius: 10rem;"
				@click="createConnect(user.id)">
				Connect
			</IonButton>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ConnectEntity, UserEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ViewedByUser',
	props: {
		user: {
			type: UserEntity,
			required: true
		},
		connect: {
			type: Object as PropType<ConnectEntity | null>,
			required: true,
			default: null
		},
		loading: {
			type: Boolean,
			required: true
		},
		createConnect: {
			type: Function as PropType<(id: string) => Promise<void>>,
			required: true
		}
	},
	setup () {
		const { id } = useAuth()
		return { id }
	}
})
</script>
