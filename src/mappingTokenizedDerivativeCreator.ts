import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  TokenizedDerivativeCreator,
  CreatedTokenizedDerivative as CreatedTokenizedDerivativeEvent
} from "../generated/TokenizedDerivativeCreator/TokenizedDerivativeCreator"

import { Synthetic } from "../generated/templates"

import { SyntheticTokenFacility } from "../generated/schema"

export function handleCreatedTokenizedDerivative(
  event: CreatedTokenizedDerivativeEvent
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  let contractId = event.transaction.hash.toHex()
  let entity = new SyntheticTokenFacility(contractId)

  // Entity fields can be set based on event parameters
  entity.contractAddress = event.params.contractAddress
  entity.creator = event.transaction.from.toHex()
  entity.timestamp = event.block.timestamp
  log.warning('Token facility created with UMA Token Builder {}', [event.params.contractAddress.toHex()])
  entity.synthetic = event.params.contractAddress.toHex()

  // Entities can be written to the store with `.save()`
  entity.save()

  Synthetic.create(event.params.contractAddress)

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getCurrentTime(...)
  // - contract.marginCurrencyWhitelist(...)
  // - contract.isTest(...)
  // - contract.returnCalculatorWhitelist(...)
  // - contract.createTokenizedDerivative(...)
}
