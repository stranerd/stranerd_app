<template>
	<div class="!gap-4 card-padding flex flex-col">
		<div class="flex gap-4 items-center" @click="show = !show">
			<IonText class="font-bold capitalize truncate w-full">{{ classInst.name }}</IonText>
			<IonIcon :icon="show ? chevronUpOutline : chevronDownOutline" class="text-heading2" />
		</div>
		<div v-if="show" class="flex flex-col">
			<EmptyState v-if="!loading && !error && groups.length === 0" class="py-2 text-secondaryText"
				info="This class has no discussions" />
			<GroupsListCard v-for="group in groups" :key="group.hash" :classInst="classInst" :group="group" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useGroupList } from '@app/composable/classes/groups'
import { useRoute } from 'vue-router'
import GroupsListCard from '@app/components/classes/groups/GroupsListCard.vue'
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'ClassesGroupsList',
	components: { GroupsListCard },
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		},
		searchTerm: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup (props) {
		const route = useRoute()
		const show = ref(route.query.classId === props.classInst.id)
		const { loading, error, groups: allGroups } = useGroupList(props.classInst.id)
		const groups = computed(() => allGroups.value.filter((g) => g.search(props.searchTerm)))
		return {
			show, groups, error, loading,
			chevronUpOutline, chevronDownOutline
		}
	}
})
</script>
