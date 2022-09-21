<template>
	<DefaultLayout>
		<div class="flex flex-col gap-4">
			<Search class="p-4 pb-0 lg:p-0" />
			<div class="flex items-center justify-between text-sm">
				<router-link v-for="path in [
						{ name: 'All', key: 'all', route: `${baseRoute}` },
						{ name: 'Questions', key: 'questions', route: `${baseRoute}?tab=questions` },
						{ name: 'FlashCards', key: 'flashCards', route: `${baseRoute}?tab=flashCards` },
						{ name: 'Students', key: 'users', route: `${baseRoute}?tab=users` },
					]" :key="path.key" :class="{ '!text-primaryBg !border-primaryBg': path.key === tab}"
					:to="path.route"
					class="border-b-2 border-itemBg text-secondaryText p-3 capitalize w-full flex justify-center items-center gap-2"
					@click="tab = path.key">
					<span class="capitalize">{{ path.name }}</span>
				</router-link>
			</div>
			<slot :tab="tab" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Search from '@app/components/search/Search.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'SearchWrapper',
	props: {
		baseRoute: {
			type: String,
			required: true
		}
	},
	components: { Search },
	setup () {
		const route = useRoute()
		const { tab: t = '' } = route.query
		const tabValues = ['questions', 'flashCards', 'users']
		const tab = ref(tabValues.includes(t as string) ? t as string : 'all')
		return { tab }
	}
})
</script>
