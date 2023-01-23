<template>
	<div class="showcase-flex !p-0">
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
		</IonAccordionGroup>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue'
import { openCreateTagModal, openTagEditModal, useDeleteTag, useTagList } from '@app/composable/interactions/tags'
import { groupBy } from '@utils/commons'
import { addOutline, pencilOutline, trashBinOutline } from 'ionicons/icons'

const { tags, questionTags, error, loading } = useTagList()
const { deleteTag, loading: deleteLoading, error: deleteError } = useDeleteTag()
const groups = computed(() => {
	const grouped = groupBy(questionTags.value, (tag) => tag.parent ?? '')
	return (grouped.find((g) => g.key === '')?.values ?? []).map((t) => ({
		parent: t,
		children: grouped.find((g) => g.key === t.id)?.values ?? []
	}))
})
</script>
