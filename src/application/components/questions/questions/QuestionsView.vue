<template>
	<div class="flex flex-col text-secondaryText">
		<a :class="{'hasBg': tagId === ''}" class="card-padding" @click="tagId = ''">
			All Questions
		</a>
		<template v-for="{ parent, children } in groups" :key="parent.hash">
			<div :class="{'hasBg': children.map((t) => t.id).includes(tagId) && show !== parent.id}"
				class="flex justify-between card-padding"
				@click="show = show === parent.id ? '' : parent.id">
				<IonText class="font-bold capitalize">{{ parent.title }}</IonText>
				<IonIcon :icon="show === parent.id ? chevronDownOutline : chevronForwardOutline" />
			</div>
			<template v-if="show === parent.id">
				<a v-for="tag in children" :key="tag.hash" :class="{'hasBg': tagId === tag.id}" class="card-padding"
					@click="tagId = tag.id">
					{{ tag.title }}
				</a>
			</template>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useQuestionList } from '@app/composable/questions/questions'
import { useTagList } from '@app/composable/interactions/tags'
import { groupBy } from '@utils/commons'
import { chevronDownOutline, chevronForwardOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'QuestionsView',
	setup () {
		const show = ref('')
		const { tagId } = useQuestionList()
		const { questionTags } = useTagList()
		const groups = computed(() => {
			const grouped = groupBy(questionTags.value, (tag) => tag.parent ?? '')
			return (grouped.find((g) => g.key === '')?.values ?? []).map((t) => ({
				parent: t,
				children: grouped.find((g) => g.key === t.id)?.values ?? []
			}))
		})
		return { show, tagId, groups, chevronForwardOutline, chevronDownOutline }
	}
})
</script>
