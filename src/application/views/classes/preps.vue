<template>
	<classWrapper>
		<ExploreTestPrepsList />
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'

export default defineComponent({
	name: 'ClassPreps',
	displayName: 'Classes',
	components: { classWrapper, ExploreTestPrepsList }
})
</script>
