<template>
	<div class="showcase-flex px-4">
		<IonButton class="btn-primary w-full" @click="openCreateTagModal(null)">Create Tag</IonButton>
		<BlockLoading v-if="loading" />
		<PageLoading v-if="deleteLoading" />
		<EmptyState v-if="!loading && !error && tags.length === 0" info="No tags found." />
		<IonAccordionGroup>
			<IonAccordion key="questions">
				<IonItem slot="header" class="text-base">
					<IonLabel class="capitalize my-4">Questions Tags</IonLabel>
				</IonItem>
				<IonAccordionGroup slot="content" class="ml-4">
					<IonAccordion v-for="{ parent, children } in groups" :key="parent.hash">
						<IonItem slot="header" class="text-base">
							<IonLabel class="capitalize my-4">{{ parent.title }}</IonLabel>
						</IonItem>
						<IonList slot="content" class="ml-4">
							<IonItem>
								<span class="flex w-full gap-6 justify-end">
									<IonIcon :icon="addOutline" class="text-success"
										@click="openCreateTagModal(parent)" />
									<IonIcon :icon="pencilOutline" class="text-warning"
										@click="openTagEditModal(parent)" />
									<IonIcon :icon="trashBinOutline" class="text-danger" @click="deleteTag(parent)" />
								</span>
							</IonItem>
							<IonItem v-for="tag in children" :key="tag.hash" class="text-sm">
								<IonLabel class="w-full">{{ tag.title }}</IonLabel>
								<span class="flex gap-4 justify-end">
									<IonIcon :icon="pencilOutline" class="text-warning"
										@click="openTagEditModal(tag)" />
									<IonIcon :icon="trashBinOutline" class="text-danger" @click="deleteTag(tag)" />
								</span>
							</IonItem>
							<IonItem v-if="!children.length" class="text-sm">
								<IonLabel>No children for this tag</IonLabel>
							</IonItem>
						</IonList>
					</IonAccordion>
				</IonAccordionGroup>
			</IonAccordion>
			<IonAccordion key="departments">
				<IonItem slot="header" class="text-base">
					<IonLabel class="capitalize my-4">Departments Tags</IonLabel>
				</IonItem>
				<IonList slot="content" class="ml-4">
					<IonItem v-for="tag in departmentTags" :key="tag.hash" class="text-sm">
						<IonLabel class="w-full">{{ tag.title }}</IonLabel>
						<span class="flex gap-4 justify-end">
							<IonIcon :icon="pencilOutline" class="text-warning" @click="openTagEditModal(tag)" />
							<IonIcon :icon="trashBinOutline" class="text-danger" @click="deleteTag(tag)" />
						</span>
					</IonItem>
					<IonItem v-if="!departmentTags.length" class="text-sm">
						<IonLabel>No department tags</IonLabel>
					</IonItem>
				</IonList>
			</IonAccordion>
		</IonAccordionGroup>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { openCreateTagModal, openTagEditModal, useDeleteTag, useTagList } from '@app/composable/interactions/tags'
import { groupBy } from '@utils/commons'
import { addOutline, pencilOutline, trashBinOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'TagsList',
	setup () {
		const { tags, questionTags, departmentTags, error, loading } = useTagList()
		const { deleteTag, loading: deleteLoading, error: deleteError } = useDeleteTag()
		const groups = computed(() => {
			const grouped = groupBy(questionTags.value, (tag) => tag.parent ?? '')
			return (grouped.find((g) => g.key === '')?.values ?? []).map((t) => ({
				parent: t,
				children: grouped.find((g) => g.key === t.id)?.values ?? []
			}))
		})
		return {
			tags, groups, departmentTags, error, loading, openCreateTagModal, openTagEditModal,
			deleteTag, deleteLoading, deleteError,
			addOutline, pencilOutline, trashBinOutline
		}
	}
})
</script>
