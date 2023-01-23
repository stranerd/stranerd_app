<template>
	<span class="w-full flex justify-between items-center gap-4 border border-itemBg px-4 py-3 rounded-xl"
		@click="isOpen = true">
		<span class="text-secondaryText">
			{{ selectedTag?.title ?? (allowAll ? 'All subjects' : 'Select a subject') }}
		</span>
		<IonIcon :icon="caretDownOutline" class="text-sm text-secondaryText opacity-50" />
		<IonModal v-bind="{ ...modalProps, isOpen }" @didDismiss="isOpen = false">
			<div class="h-full overflow-y-auto flex flex-col gap-8 modal-content p-4 lg:p-8">
				<div class="flex justify-between">
					<span />
					<span class="text-xl font-bold">Select Subject</span>
					<IonIcon :icon="closeOutline" @click="isOpen = false" />
				</div>
				<div v-if="allowAll" class="flex flex-col gap-2">
					<IonText class="font-bold"></IonText>
					<div class="flex gap-2 flex-wrap">
						<div :class="{ '!bg-primaryBg !text-primaryText': '' === value }"
							class="rounded-full py-2 px-4 bg-itemBg min-w-[50px] text-center"
							@click="selectTag('')">
							All
						</div>
					</div>
				</div>
				<div v-for="{ parent, children } in groups" :key="parent.id" class="flex flex-col gap-2">
					<IonText class="font-bold">{{ parent.title }}</IonText>
					<div class="flex gap-2 flex-wrap">
						<div v-for="tag in children" :key="tag.id"
							:class="{ '!bg-primaryBg !text-primaryText': tag.id === value }"
							class="rounded-full py-2 px-4 bg-itemBg min-w-[50px] text-center"
							@click="selectTag(tag.id)">
							{{ tag.title }}
						</div>
					</div>
				</div>
			</div>
		</IonModal>
	</span>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref } from 'vue'
import { useTagList } from '@app/composable/interactions/tags'
import { modalProps } from '@app/composable/core/modal'
import { caretDownOutline, closeOutline } from 'ionicons/icons'
import { groupBy } from '@utils/commons'

const props = defineProps({
	value: {
		type: String,
		required: true
	},
	allowAll: {
		type: Boolean,
		required: false,
		default: false
	}
})

const emit = defineEmits(['update:value'])

const isOpen = ref(false)
const { questionTags } = useTagList()
const selectedTag = computed(() => questionTags.value.find((t) => t.id === props.value))
const groups = computed(() => {
	const grouped = groupBy(questionTags.value, (tag) => tag.parent ?? '')
	return (grouped.find((g) => g.key === '')?.values ?? []).map((t) => ({
		parent: t,
		children: grouped.find((g) => g.key === t.id)?.values ?? []
	}))
})
const selectTag = (tagId: string) => {
	emit('update:value', tagId)
	isOpen.value = false
}
</script>

<style lang="scss" scoped>
ion-modal.modal-class {
	--height: 100%;
}
</style>
