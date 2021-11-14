<template>
	<Justified>
		<div class="normalText">
			<PageLoading v-if="loading"/>
			<template v-if="user">
				<UserProfileCard :user="user"/>
				<div class="mx-auto md:w-[83.33%] lg:w-[50%] grid grid-cols-12">
					<slot :user="user"/>
				</div>
			</template>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserProfileCard from '@app/components/users/users/UserProfileCard.vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import Justified from '@app/layouts/Justified.vue'
import { useUser } from '@app/composable/users/user'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'UserPageWrapper',
	components: { UserProfileCard, PageLoading, Justified },
	setup() {
		const { userId } = useRoute().params
		const { user, loading, error } = useUser(userId as string)
		return { user, loading, error }
	}
})
</script>
