<template>
	<div class="d-flex justify-content-center bg-primary text-white">
		<button class="btn text-white flex-grow-1 w-100 py-1" @click="acceptSession">
			Accept
		</button>
		<div class="bg-white my-0-5" style="width: 1px; height: inherit;" />
		<button class="btn text-dark flex-grow-1 w-100 py-1" @click="rejectSession">
			Reject
		</button>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { SessionEntity } from '@modules/sessions'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSession } from '@app/hooks/sessions/sessions'

export default defineComponent({
	name: 'TutorSessionOption',
	props: {
		session: {
			type: Object as PropType<SessionEntity>,
			required: true
		}
	},
	setup (props) {
		const { acceptSession, rejectSession, loading, error } = useSession(props.session.id)
		return { acceptSession, rejectSession, loading, error }
	}
})
</script>
