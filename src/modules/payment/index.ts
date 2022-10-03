import { CardApiDataSource } from './data/datasources/cardApi'
import { TransactionApiDataSource } from './data/datasources/transactionApi'
import { PlanApiDataSource } from './data/datasources/planApi'
import { WalletApiDataSource } from './data/datasources/walletApi'
import { CardTransformer } from './data/transformers/card'
import { TransactionTransformer } from './data/transformers/transaction'
import { PlanTransformer } from './data/transformers/plan'
import { WalletTransformer } from './data/transformers/wallet'
import { CardRepository } from './data/repositories/card'
import { TransactionRepository } from './data/repositories/transaction'
import { PlanRepository } from './data/repositories/plan'
import { WalletRepository } from './data/repositories/wallet'
import { CardsUseCase } from './domain/usecases/cards'
import { TransactionsUseCase } from './domain/usecases/transactions'
import { PlansUseCase } from './domain/usecases/plans'
import { WalletsUseCase } from './domain/usecases/wallets'
import { CardEntity } from './domain/entities/card'
import { TransactionEntity } from './domain/entities/transaction'
import { PlanEntity } from './domain/entities/plan'
import { WalletEntity } from './domain/entities/wallet'
import { WalletAccountFactory } from './domain/factories/account'
import type { Bank, FlutterwaveSecrets } from './domain/types'
import { Currencies, CurrencyCountries, PlanDataType, TransactionStatus, TransactionType } from './domain/types'

const cardDataSource = new CardApiDataSource()
const transactionDataSource = new TransactionApiDataSource()
const planDataSource = new PlanApiDataSource()
const walletDataSource = new WalletApiDataSource()

const cardTransformer = new CardTransformer()
const transactionTransformer = new TransactionTransformer()
const planTransformer = new PlanTransformer()
const walletTransformer = new WalletTransformer()

const cardRepository = new CardRepository(cardDataSource, cardTransformer)
const transactionRepository = new TransactionRepository(transactionDataSource, transactionTransformer)
const planRepository = new PlanRepository(planDataSource, planTransformer)
const walletRepository = new WalletRepository(walletDataSource, walletTransformer)

export const CardsUseCases = new CardsUseCase(cardRepository)
export const TransactionsUseCases = new TransactionsUseCase(transactionRepository)
export const PlansUseCases = new PlansUseCase(planRepository)
export const WalletsUseCases = new WalletsUseCase(walletRepository)

export { CardEntity, TransactionEntity, PlanEntity, WalletEntity, WalletAccountFactory }
export { Currencies, CurrencyCountries, TransactionStatus, TransactionType, PlanDataType, FlutterwaveSecrets, Bank }
