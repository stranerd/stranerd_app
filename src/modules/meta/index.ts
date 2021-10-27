import { MetaApiDataSource } from './data/datasources/meta-api'
import { MessageApiDataSource } from './data/datasources/message-api'
import { MetaRepository } from './data/repositories/meta'
import { MessageRepository } from './data/repositories/message'
import { SearchUseCase } from './domain/usecases/meta/search'
import { AddMessageUseCase } from './domain/usecases/messages/addMessage'
import { MessageFactory } from './domain/factories/message'
import { BuyCoinsWithStripeUseCase } from './domain/usecases/meta/buyCoinsWithStripe'
import { VerifyStripePaymentUseCase } from './domain/usecases/meta/verifyStripePayment'

const metaDataSource = new MetaApiDataSource()
const messageDataSource = new MessageApiDataSource()

const metaRepository = new MetaRepository(metaDataSource)

export const BuyCoinsWithStripe = new BuyCoinsWithStripeUseCase(metaRepository)
export const VerifyStripePayment = new VerifyStripePaymentUseCase(metaRepository)
export const Search = new SearchUseCase(metaRepository)

const messageRepository = new MessageRepository(messageDataSource)

export const AddMessage = new AddMessageUseCase(messageRepository)

export { MessageFactory }
