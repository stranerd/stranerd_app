<template>
	<ExploreWrapper>
		<ExploreTestPrep/>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import ExploreTestPrep from '@app//components/study/explore/ExploreTestPrep.vue'
export default defineComponent({
	name: 'Explore TestPreps',
	displayName: 'Explore',
	components: {  ExploreWrapper, ExploreTestPrep }
})
</script>

<style lang="scss" scoped>
.ion-iten-transparent{
    --background:transparent;
}

ion-searchbar{
    --box-shadow:'none';
    --border-radius:0.5rem;
}
.searchbar-input.sc-ion-searchbar-md{
	padding-top: 12px;
    padding-bottom: 12px;
}
</style>