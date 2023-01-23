<template>
	<DefaultLayout>
		<template v-if="classInst && classInst.admins.includes(id)" v-slot:content-top-left>
			<slot v-if="classInst" :classInst="classInst" name="header" />
		</template>
		<div class="flex flex-col h-full">
			<BlockLoading v-if="loading" />
			<template v-else-if="classInst">
				<div v-if="!hideTitle" class="flex items-center gap-4 border-bottom-line p-4 lg:hidden">
					<Avatar :name="classInst.name" :size="24" :src="classInst.photo" />
					<IonText class="font-bold capitalize w-full truncate">{{ classInst.name }}</IonText>
				</div>
				<slot v-if="classInst.members.includes(id)" :classInst="classInst" />
				<SearchClassListCard v-else :key="classInst.hash" :classInst="classInst" />
			</template>
			<NotFound v-else title="Class not found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useClass } from '@app/composable/classes/classes'
import { useAuth } from '@app/composable/auth/auth'
import SearchClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'

const props = defineProps({
	hideTitle: {
		type: Boolean,
		required: false,
		default: false
	}
})

const { id } = useAuth()
const route = useRoute()
const { classId } = route.params
const { loading, error, classInst } = useClass(classId as string)
</script>
