<template>
	<div class="flex flex-col">
		<div class="p-4">
			<IonSearchbar v-model.trim="search" placeholder="Search" type="search" />
		</div>
		<BlockLoading v-if="loading" />
		<router-link v-if="!loading && !error && groups.length === 0" to="/classes">
			<EmptyState :info="search ? 'No results' : 'Join a class to have discussions'"
				class="border-bottom-line py-6" />
		</router-link>
		<MetaBlock v-if="unRead.length" :metas="unRead" :open="true" class="border-bottom-line" title="Unread" />
		<ClassesGroupsList v-for="group in groups" :key="group.key" :classId="group.key" :metas="group.values"
			class="border-bottom-line" />
		<MetaBlock :metas="connects" class="border-bottom-line" title="Student Connect" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ClassesGroupsList from '@app/components/messaging/chatMetas/ClassesGroupsList.vue'
import MetaBlock from '@app/components/messaging/chatMetas/MetaBlock.vue'
import { useChatMetas } from '@app/composable/messaging/chatMetas'
import { groupBy } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ChatMetasList',
	components: { ClassesGroupsList, MetaBlock },
	setup () {
		const { id } = useAuth()
		const { meta, error, loading, search } = useChatMetas()
		const groups = computed(() => groupBy(meta.value.filter((m) => m.isClasses(m)), (m) => {
			if (m.isClasses(m)) return m.data.group.classId
			return ''
		}))
		const connects = computed(() => meta.value.filter((m) => m.isPersonal(m)))
		const unRead = computed(() => meta.value.filter((m) => m.hasUnRead(id.value)))
		return { search, groups, connects, unRead, error, loading }
	}
})
</script>
