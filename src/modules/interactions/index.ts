import { CommentApiDataSource } from './data/datasources/comment-api'
import { LikeApiDataSource } from './data/datasources/like-api'
import { ViewApiDataSource } from './data/datasources/view-api'
import { TagApiDataSource } from './data/datasources/tag-api'
import { CommentTransformer } from './data/transformers/comment'
import { LikeTransformer } from './data/transformers/like'
import { ViewTransformer } from './data/transformers/view'
import { TagTransformer } from './data/transformers/tag'
import { CommentRepository } from './data/repositories/comment'
import { LikeRepository } from './data/repositories/like'
import { ViewRepository } from './data/repositories/view'
import { TagRepository } from './data/repositories/tag'
import { CommentsUseCase } from './domain/usecases/comments'
import { LikesUseCase } from './domain/usecases/likes'
import { ViewsUseCase } from './domain/usecases/views'
import { TagsUseCase } from './domain/usecases/tags'
import { CommentEntity } from './domain/entities/comment'
import { CommentFactory } from './domain/factories/comment'
import { LikeEntity } from './domain/entities/like'
import { ViewEntity } from './domain/entities/view'
import { InteractionEntities, TagTypes } from './domain/types'
import { TagEntity } from './domain/entities/tag'
import { TagFactory } from './domain/factories/tag'

const commentDataSource = new CommentApiDataSource()
const likeDataSource = new LikeApiDataSource()
const viewDataSource = new ViewApiDataSource()
const tagDataSource = new TagApiDataSource()

const commentTransformer = new CommentTransformer()
const likeTransformer = new LikeTransformer()
const viewTransformer = new ViewTransformer()
const tagTransformer = new TagTransformer()

const commentRepository = new CommentRepository(commentDataSource, commentTransformer)
const likeRepository = new LikeRepository(likeDataSource, likeTransformer)
const viewRepository = new ViewRepository(viewDataSource, viewTransformer)
const tagRepository = new TagRepository(tagDataSource, tagTransformer)

export const CommentsUseCases = new CommentsUseCase(commentRepository)
export const LikesUseCases = new LikesUseCase(likeRepository)
export const ViewsUseCases = new ViewsUseCase(viewRepository)
export const TagsUseCases = new TagsUseCase(tagRepository)

export { CommentEntity, CommentFactory }
export { LikeEntity, ViewEntity, InteractionEntities }
export { TagEntity, TagFactory, TagTypes }
