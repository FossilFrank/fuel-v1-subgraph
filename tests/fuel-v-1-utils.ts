import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { DepositMade, TokenIndexed } from "../generated/FuelV1/FuelV1"

export function createDepositMadeEvent(
  owner: Address,
  token: BigInt,
  value: BigInt
): DepositMade {
  let depositMadeEvent = changetype<DepositMade>(newMockEvent())

  depositMadeEvent.parameters = new Array()

  depositMadeEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  depositMadeEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromUnsignedBigInt(token))
  )
  depositMadeEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return depositMadeEvent
}

export function createTokenIndexedEvent(
  token: Address,
  id: BigInt
): TokenIndexed {
  let tokenIndexedEvent = changetype<TokenIndexed>(newMockEvent())

  tokenIndexedEvent.parameters = new Array()

  tokenIndexedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenIndexedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return tokenIndexedEvent
}
