import {
  DepositMade as DepositMadeEvent,
  TokenIndexed as TokenIndexedEvent
} from "../generated/FuelV1/FuelV1"
import { DepositMade, Token } from "../generated/schema"

export function handleDepositMade(event: DepositMadeEvent): void {
  let entity = new DepositMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.token = event.params.token
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenIndexed(event: TokenIndexedEvent): void {
  let entity = new Token(event.params.id.toString())
  entity.token = event.params.token

  entity.save()
}
