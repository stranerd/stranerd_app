<template>
	<PageWrapper>
		<template v-slot="{ set, testPreps }">
			<SetTestPrepsList :set="set" :testPreps="testPreps" />
		</template>
	</PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageWrapper from '@app/components/study/sets/page/PageWrapper.vue'
import SetTestPrepsList from '@app/components/study/testPreps/SetTestPrepsList.vue'

export default defineComponent({
	name: 'SetPageTestPreps',
	displayName: 'Explore',
	components: { PageWrapper, SetTestPrepsList }
})
</script>
