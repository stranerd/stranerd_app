import { MethodApiDataSource } from './data/datasources/methodApi'
import { TransactionApiDataSource } from './data/datasources/transactionApi'
import { PlanApiDataSource } from './data/datasources/planApi'
import { WalletApiDataSource } from './data/datasources/walletApi'
import { MethodTransformer } from './data/transformers/method'
import { TransactionTransformer } from './data/transformers/transaction'
import { PlanTransformer } from './data/transformers/plan'
import { WalletTransformer } from './data/transformers/wallet'
import { MethodRepository } from './data/repositories/method'
import { TransactionRepository } from './data/repositories/transaction'
import { PlanRepository } from './data/repositories/plan'
import { WalletRepository } from './data/repositories/wallet'
import { MethodsUseCase } from './domain/usecases/methods'
import { TransactionsUseCase } from './domain/usecases/transactions'
import { PlansUseCase } from './domain/usecases/plans'
import { WalletsUseCase } from './domain/usecases/wallets'
import { MethodEntity } from './domain/entities/method'
import { TransactionEntity } from './domain/entities/transaction'
import { PlanEntity } from './domain/entities/plan'
import { WalletEntity } from './domain/entities/wallet'
import { WalletAccountFactory } from './domain/factories/account'
import type { Bank, FlutterwaveSecrets } from './domain/types'
import { Currencies, CurrencyCountries, PlanDataType, TransactionStatus, TransactionType } from './domain/types'

const methodDataSource = new MethodApiDataSource()
const transactionDataSource = new TransactionApiDataSource()
const planDataSource = new PlanApiDataSource()
const walletDataSource = new WalletApiDataSource()

const methodTransformer = new MethodTransformer()
const transactionTransformer = new TransactionTransformer()
const planTransformer = new PlanTransformer()
const walletTransformer = new WalletTransformer()

const methodRepository = new MethodRepository(methodDataSource, methodTransformer)
const transactionRepository = new TransactionRepository(transactionDataSource, transactionTransformer)
const planRepository = new PlanRepository(planDataSource, planTransformer)
const walletRepository = new WalletRepository(walletDataSource, walletTransformer)

export const MethodsUseCases = new MethodsUseCase(methodRepository)
export const TransactionsUseCases = new TransactionsUseCase(transactionRepository)
export const PlansUseCases = new PlansUseCase(planRepository)
export const WalletsUseCases = new WalletsUseCase(walletRepository)

export { MethodEntity, TransactionEntity, PlanEntity, WalletEntity, WalletAccountFactory }
export { Currencies, CurrencyCountries, TransactionStatus, TransactionType, PlanDataType, FlutterwaveSecrets, Bank }
