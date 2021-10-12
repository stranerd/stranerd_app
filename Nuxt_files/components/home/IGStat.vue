<template>
	<div class="col-span-12 grid grid-cols-12 py-5 pb-14 bg-text_link">
		<div class="col-span-12 md:col-start-3 md:col-end-11 flex flex-col justify-center items-center">
			<div class="text-center md:py-7 py-4">
				<span class="text-white font-bold md:text-2xl text-lg">Already trusted by more than 33,000 students</span>
			</div>
			<div class="grid grid-cols-12 md:mt-16 mt-8">
				<div class="col-span-12 lg:col-span-6 text-center flex flex-col py-3 justify-center items-center">
					<img src="@app/assets/images/homepage/stranerd-ig.svg" class="w-10/12">
				</div>
				<div class="col-span-12 lg:col-span-6 text-center py-3 flex flex-col justify-center items-center">
					<img class="w-4/6" src="@app/assets/images/homepage/testimonial.svg">
					<div class="py-3 box md:max-w-[420px] max-w-[320px] mt-7">
						<div
							class="col-md-10 commentsBox p-1 py-2  flex flex-col justify-center items-center mx-auto"
						>
							<img :src="comments[currentIndex].img" class="testimonial-image">
							<div class="mb-1 line-clamp-3 md:text-base text-sm">
								{{ comments[currentIndex].text }}
							</div>
							<div class="mt-auto authorname">
								{{ comments[currentIndex].author }}
							</div>
						</div>
						<div class="flex justify-center items-center mt-1">
							<a class="commentIcons" to="#" @click.prevent="goToPrev">
								<i class="fas fa-chevron-left" />
							</a>
							<a
								v-for="(comment,index) in comments"
								:key="'comment'+ index"
								:class="currentIndex === index ? 'commentIconsDotActive' : 'commentIconsDot'"
								@click.prevent="goToComment(index)"
							>
								<i class="fas fa-circle" />
							</a>
							<a class="commentIcons" to="#" @click.prevent="goToNext">
								<i class="fas fa-chevron-right" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'IGStat',
	setup () {
		const comments = [
			{
				text: 'I’d say, for someone like me who has difficulty concentrating on stuff, you made navigation very easy. User interface, beautiful and easy to navigate. Cool and simple colors that do not confuse or hurt the eyes. And yay, I got my answer faster than I expected. I loved it.',
				author: 'Eunice Apo',
				img: require('@app/assets/images/testimonials/eunice.jpeg')
			},
			{
				text: 'I like how it\'s very well spelt-out what I have to do to advance in ranking.',
				author: 'Emmanuel Bello',
				img: require('@app/assets/images/testimonials/emmanuel.jpeg')
			},
			{
				text: 'It\'s very user friendly, and as someone mentioned earlier, the color palette of the website is easy on the eyes.',
				author: 'Laureen Abayomi',
				img: require('@app/assets/images/testimonials/laureen.jpeg')
			},
			{
				text: 'I\'ve been impressed mostly! I really like the "coin system”',
				author: 'Daniel Uwagwu',
				img: require('@app/assets/images/testimonials/daniel.jpeg')
			}
		]
		const currentIndex = ref(0)
		const goToComment = (index: number) => {
			if (index < 0) return currentIndex.value = comments.length - 1
			if (index >= comments.length) return currentIndex.value = 0
			return currentIndex.value = index
		}
		const goToNext = () => goToComment(currentIndex.value + 1)
		const goToPrev = () => goToComment(currentIndex.value - 1)
		const autoSlidder = () => {
			setInterval(() => {
				 if (currentIndex.value === 0) {
					goToNext()
				 } else if (currentIndex.value >= comments.length - 1) {
					 currentIndex.value = 0
				 } else {
					 goToNext()
				 }
			}, 4000)
		}

		autoSlidder()

		return { comments, currentIndex, goToComment, goToPrev, goToNext }
	}
})
</script>

<style lang="scss" scoped>
	.testimonial-image {
		height: 60px;
		width: 60px;
		border-radius: 100%;
		object-fit: cover;
		margin-bottom: 9px;
	}

	.authorname {
		color: $color-primary;
		font-size: 15px;
		font-weight: bold;
	}

	.commentsBox {
		background: $color-white;
		border: 1px solid $color-white;
		border-radius: 16px;
		color: $color-sub;
		min-height: 150px;
	}

	.box {
		position: absolute;
	}

	.sub {
		font-size: 18px;
		@media (min-width: $md) {
			font-size: 25px;
		}
		@media (min-width: $lg) {
			font-size: 30px;
		}

		font-weight: bold;
	}

	.commentIcons {
		color: $color-white;
		font-size: 20px;
		@media (min-width: $md) {
			font-size: 21px;
		}
		@media (min-width: $lg) {
			font-size: 23px;
		}

		margin-right: 10px;
	}

	.commentIconsDot {
		color: $color-white;
		font-size: 10px;
		@media (min-width: $md) {
			font-size: 12px;
		}
		@media (min-width: $lg) {
			font-size: 12px;
		}

		margin-right: 10px;
	}

	.commentIconsDotActive {
		color: $color-primary;
		font-size: 10px;
		@media (min-width: $md) {
			font-size: 12px;
		}
		@media (min-width: $lg) {
			font-size: 12px;
		}

		margin-right: 10px;
	}

</style>
