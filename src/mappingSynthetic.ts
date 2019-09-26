import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Synthetic as SyntheticContract,
  NavUpdated,
  Default,
  Settled,
  Expired,
  Disputed,
  EmergencyShutdownTransition,
  TokensCreated,
  TokensRedeemed,
  Deposited,
  Withdrawal,
  Transfer,
  Approval
} from "../generated/templates/Synthetic/Synthetic"
import { Synthetic } from "../generated/schema"

function getSyntheticContractInstance (address: Address):
SyntheticContract {
  return SyntheticContract.bind(address)
}

export function handleNavUpdated(event: NavUpdated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = Synthetic.load(event.transaction.from.toHex())

  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (entity == null) {
  //   entity = new Synthetic(event.transaction.from.toHex())

  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }

  let syntheticContract = getSyntheticContractInstance(event.address)

  let contractId = event.transaction.from.toHex()
  let entity = new Synthetic(syntheticContract._address.toHexString())


  // BigInt and BigDecimal math are supported
  // entity.count = entity.count.plus(BigInt.fromI32(1))

  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.newNav = event.params.newNav
  entity.newTokenPrice = event.params.newTokenPrice
  entity.creator = event.transaction.from
  entity.timestamp = event.block.timestamp

  // Entities can be written to the store with `.save()`
  // let syntheticContract = getSyntheticContractInstance(event.address)
  entity.name = syntheticContract.name()
  entity.totalSupply = syntheticContract.totalSupply().toBigDecimal()

  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = SyntheticContract.bind(event.address)

  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.name(...)
  // - contract.approve(...)
  // - contract.totalSupply(...)
  // - contract.transferFrom(...)
  // - contract.decimals(...)
  // - contract.increaseAllowance(...)
  // - contract.derivativeStorage(...)
  // - contract.balanceOf(...)
  // - contract.symbol(...)
  // - contract.decreaseAllowance(...)
  // - contract.transfer(...)
  // - contract.allowance(...)
  // - contract.mint(...)
  // - contract.calcNAV(...)
  // - contract.calcTokenValue(...)
  // - contract.calcShortMarginBalance(...)
  // - contract.calcExcessMargin(...)
  // - contract.getCurrentRequiredMargin(...)
  // - contract.canBeSettled(...)
  // - contract.getUpdatedUnderlyingPrice(...)
}

export function handleDefault(event: Default): void {}

export function handleSettled(event: Settled): void {}

export function handleExpired(event: Expired): void {}

export function handleDisputed(event: Disputed): void {}

export function handleEmergencyShutdownTransition(
  event: EmergencyShutdownTransition
): void {}

export function handleTokensCreated(event: TokensCreated): void {}

export function handleTokensRedeemed(event: TokensRedeemed): void {}

export function handleDeposited(event: Deposited): void {}

export function handleWithdrawal(event: Withdrawal): void {}

export function handleTransfer(event: Transfer): void {}

export function handleApproval(event: Approval): void {}
