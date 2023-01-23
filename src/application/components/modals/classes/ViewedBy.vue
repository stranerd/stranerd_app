<template>
	<Modal :close="close" class="h-screen md:h-auto">
		<template v-slot:title>
			Viewed by
		</template>
		<span>Only admins can see who viewed</span>
		<ViewedByUser v-for="user in viewers"
			:key="user.hash"
			:connect="connects.find((c) => c.members.includes(id) && c.members.includes(user.id)) ?? null"
			:createConnect="createConnect"
			:loading="connectLoading"
			:user="user"
		/>
	</Modal>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { getViewedBy, useClassMembersList } from '@app/composable/classes/classes'
import { useConnects } from '@app/composable/users/connects'
import { useAuth } from '@app/composable/auth/auth'
import ViewedByUser from '@app/components/classes/classes/ViewedByUser.vue'

const props = defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const viewedBy = getViewedBy()
if (!viewedBy) props.close()
const { id } = useAuth()
const { classInst = null as any, views = {} } = viewedBy!
const { users, loading } = useClassMembersList(classInst)
const { connects, loading: connectLoading, createConnect } = useConnects()
const viewers = computed(() => {
	const viewed = Object.keys(views)
	return users.value.filter((u) => viewed.includes(u.id))
})
</script>
