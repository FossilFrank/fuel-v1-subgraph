import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {
  DepositMade as DepositMadeEvent,
  TokenIndexed as TokenIndexedEvent
} from "../generated/FuelV1/FuelV1"
import { IERC20 } from "../generated/FuelV1/IERC20"
import { DepositMade, Token } from "../generated/schema"

export function handleDepositMade(event: DepositMadeEvent): void {
  let entity = new DepositMade(event.transaction.hash.concatI32(event.logIndex.toI32()))
  let token = Token.load(event.params.token.toString())!
  entity.owner = event.params.owner
  entity.token = event.params.token.toString()
  let amount = event.params.value.divDecimal(BigInt.fromString("10").pow(token.decimals as u8).toBigDecimal())
  entity.value = amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  token.amountDeposited += amount

  entity.save()
  token.save()
}

export function handleTokenIndexed(event: TokenIndexedEvent): void {
  let entity = new Token(event.params.id.toString())
  entity.token = event.params.token
  entity.amountDeposited = BigDecimal.zero()

  let tokenContract = IERC20.bind(event.params.token)

  let name_result = tokenContract.try_name()
  entity.name = name_result.reverted ? null : name_result.value

  let symbol_result = tokenContract.try_symbol()
  entity.symbol = symbol_result.reverted ? null : symbol_result.value

  let decimals = tokenContract.try_decimals()
  entity.decimals = decimals.reverted ? 0 : decimals.value

  if (event.params.token == Address.zero()) {
    entity.decimals = 18
    entity.name = "Ether"
    entity.symbol = "ETH"
  }

  entity.save()
}
