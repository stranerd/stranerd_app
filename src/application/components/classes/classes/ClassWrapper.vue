<template>
	<DefaultLayout>
		<template v-if="classInst && classInst.admins.includes(id)" v-slot:content-top-left>
			<slot :classInst="classInst" name="header" />
		</template>
		<div class="flex flex-col">
			<BlockLoading v-if="loading" />
			<div v-if="classInst && !hideTitle" class="flex items-center gap-4 border-bottom-line p-4 lg:hidden">
				<Avatar :name="classInst.name" :size="24" :src="classInst.photo" />
				<IonText class="font-bold capitalize w-full truncate">{{ classInst.name }}</IonText>
			</div>
			<slot v-if="classInst && classInst.members.includes(id)" :classInst="classInst" />
			<SearchClassListCard v-else-if="classInst" :classInst="classInst" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useClass } from '@app/composable/classes/classes'
import { useAuth } from '@app/composable/auth/auth'
import SearchClassListCard from '@app/components/classes/classes/SearchClassListCard.vue'

export default defineComponent({
	name: 'ClassWrapper',
	components: { SearchClassListCard },
	props: {
		hideTitle: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup () {
		const { id } = useAuth()
		const route = useRoute()
		const { classId } = route.params
		const { loading, error, classInst } = useClass(classId as string)
		return { loading, error, classInst, id }
	}
})
</script>
