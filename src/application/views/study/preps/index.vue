<template>
	<DefaultLayout>
		<div class="h-full flex flex-col">
			<header class="flex flex-col px-4 lg:px-0 py-6 lg:pt-0 gap-2">
				<IonText class="font-bold text-lg">Improve your studying</IonText>
				<span>Here you can find exam MCQ solutions, exam theory solutions, and textbook solutions.</span>
				<IonSearchbar class="mt-4" placeholder="Find solutions" />
			</header>

			<div class="flex items-center justify-between">
				<a v-for="name in [ 'MCQs', 'Theories', 'Textbooks']" :key="name"
					:class="{ '!text-primaryBg !border-primaryBg': name === tab}"
					class="border-b-2 border-itemBg text-secondaryText p-4 capitalize w-full flex justify-center items-center"
					@click="tab = name">
					<span>{{ name }}</span>
				</a>
			</div>

			<div class="p-4 py-6 lg:px-0 flex-grow flex flex-col">
				<template v-if="tab === 'Textbooks'">
					<EmptySearch />
				</template>
				<template v-else>
					<SavedTestPreps :obj="tab === 'MCQs'" />
				</template>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import SavedTestPreps from '@app/components/study/testPreps/SavedTestPreps.vue'

export default defineComponent({
	name: 'StudyPreps',
	components: { SavedTestPreps },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Test preps', {})
		const tab = ref('MCQs')
		return { tab }
	}
})
</script>
