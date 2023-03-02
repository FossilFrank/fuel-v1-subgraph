import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { DepositMade } from "../generated/schema"
import { DepositMade as DepositMadeEvent } from "../generated/FuelV1/FuelV1"
import { handleDepositMade } from "../src/fuel-v-1"
import { createDepositMadeEvent } from "./fuel-v-1-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let token = BigInt.fromI32(234)
    let value = BigInt.fromI32(234)
    let newDepositMadeEvent = createDepositMadeEvent(owner, token, value)
    handleDepositMade(newDepositMadeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DepositMade created and stored", () => {
    assert.entityCount("DepositMade", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DepositMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DepositMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "234"
    )
    assert.fieldEquals(
      "DepositMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "value",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
