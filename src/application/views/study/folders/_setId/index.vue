<template>
	<PageWrapper>
		<template v-slot:default="{ set, testPreps, notes, videos, flashCards, sets }">
			<div class="flex flex-col gap-6">
				<EmptyState v-if="!set.allSaved.length" info="This folder is empty" />

				<div v-if="sets.length">
					<ion-text class="font-semibold block text-main_dark mb-2">Folders</ion-text>
					<div class="study-showcase">
						<DoubleClick v-for="set in sets" :key="set.hash"
							:class="{'highlighted': highlighted === set.id}"
							class="w-full flex flex-col items-center"
							@click="highlighted = set.id"
							@doubleClick="$router.push(`/study/folders/${set.id}`)">
							<ion-icon :icon="folderSharp" class="text-dark_gray text-6xl" />
							<ion-text class="text-dark_gray w-full text-center break-words">{{ set.name }}</ion-text>
							<ion-text class="text-sm">
								{{
									formatNumber(set.allSaved.length)
								}} {{ pluralize(set.allSaved.length, 'item', 'items') }}
							</ion-text>
						</DoubleClick>
					</div>
				</div>

				<div v-if="testPreps.length + flashCards.length + notes.length + videos.length">
					<ion-text class="font-semibold block text-main_dark mb-2">Others</ion-text>
					<div class="study-showcase">
						<DoubleClick v-for="testPrep in testPreps" :key="testPrep.hash"
							:class="{'highlighted': highlighted === testPrep.id}"
							class="w-full flex flex-col items-center"
							@click="highlighted = testPrep.id">
							<img alt="" class="w-16 mb-1" src="@app/assets/images/New/testPrep.svg" />
							<ion-text class="text-sm text-dark_gray w-full text-center break-words capitalize">
								{{ testPrep.name }}
							</ion-text>
						</DoubleClick>
						<DoubleClick v-for="flashCard in flashCards" :key="flashCard.hash"
							:class="{'highlighted': highlighted === flashCard.id}"
							class="w-full flex flex-col items-center"
							@click="highlighted = flashCard.id"
							@doubleClick="$router.push(`/study/flashCards/${flashCard.id}`)">
							<img alt="" class="w-16 mb-1" src="@app/assets/images/New/flashCard.png" />
							<ion-text class="text-sm text-dark_gray w-full text-center break-words capitalize">
								{{ flashCard.title }}
							</ion-text>
						</DoubleClick>
						<DoubleClick v-for="note in notes" :key="note.hash"
							:class="{'highlighted': highlighted === note.id}"
							class="w-full flex flex-col items-center"
							@click="highlighted = note.id"
							@doubleClick="$router.push(`/study/notes/${note.id}`)">
							<ion-icon :icon="reader" class="text-dark_gray text-6xl" />
							<ion-text class="text-sm text-dark_gray w-full text-center break-words capitalize">
								{{ note.title }}
							</ion-text>
						</DoubleClick>
						<DoubleClick v-for="video in videos" :key="video.hash"
							:class="{'highlighted': highlighted === video.id}"
							class="w-full flex flex-col items-center"
							@click="highlighted = video.id"
							@doubleClick="$router.push(`/study/videos/${video.id}`)">
							<ion-icon :icon="filmSharp" class="text-dark_gray text-6xl" />
							<ion-text class="text-sm text-dark_gray w-full text-center break-words capitalize">
								{{ video.title }}
							</ion-text>
						</DoubleClick>
					</div>
				</div>
			</div>
		</template>
	</PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageWrapper from '@app/components/study/sets/page/PageWrapper.vue'
import { filmSharp, folderSharp, reader } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import DoubleClick from '@app/components/core/gestures/DoubleClick.vue'

export default defineComponent({
	name: 'StudyFoldersSetId',
	displayName: 'Study Folder',
	components: { DoubleClick, PageWrapper },
	setup () {
		const highlighted = ref('')
		return { reader, folderSharp, filmSharp, formatNumber, pluralize, highlighted }
	}
})
</script>

<style lang="scss" scoped>
	.highlighted {
		ion-icon, img {
			opacity: 0.5;
		}

		padding: 0.25rem;
		background: rgba($color-primary, 0.2);
		border-radius: 0.5rem;
	}
</style>
