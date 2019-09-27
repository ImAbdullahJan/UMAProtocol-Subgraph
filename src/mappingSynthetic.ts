import { BigInt, Address, log } from "@graphprotocol/graph-ts"
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
import { 
  SyntheticTokenMint, 
  NetAssetValueUpdated, 
  SyntheticContractSettled, 
  SyntheticContractExpired, 
  SyntheticTokensRedeemed, 
  MarginCurrencyDeposited,
  MarginCurrencyWithdrawn
} from "../generated/schema"

// function getSyntheticContractInstance (address: Address):
// SyntheticContract {
//   return SyntheticContract.bind(address)
// }

export function handleNavUpdated(event: NavUpdated): void {

  log.warning('Update Net Asset Value(NAV): {}', [event.address.toHex()])
  let entity = new NetAssetValueUpdated(event.address.toHex())

  // let syntheticContract = SyntheticContract.bind(event.address)
  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.newNav = event.params.newNav
  entity.newTokenPrice = event.params.newTokenPrice

  entity.save()

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

export function handleSettled(event: Settled): void {

  log.warning('Update Net Asset Value(NAV): {}', [event.address.toHex()])
  let entity = new SyntheticContractSettled(event.address.toHex())

  // let syntheticContract = SyntheticContract.bind(event.address)
  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.settleTime = event.params.settleTime
  entity.finalNav = event.params.finalNav

  entity.save()


}

export function handleExpired(event: Expired): void {

  log.warning('Update Net Asset Value(NAV): {}', [event.address.toHex()])
  let entity = new SyntheticContractExpired(event.address.toHex())

  // let syntheticContract = SyntheticContract.bind(event.address)
  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.expiryTime = event.params.expiryTime

  entity.save()

}

export function handleDisputed(event: Disputed): void {}

export function handleEmergencyShutdownTransition(
  event: EmergencyShutdownTransition
): void {}

export function handleTokensCreated(event: TokensCreated): void {

  
  log.warning('Mint Synthetic Token: {}', [event.address.toHex()])
  let entity = new SyntheticTokenMint(event.address.toHex())

  let syntheticContract = SyntheticContract.bind(event.address)
  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.tokensCreated = event.params.numTokensCreated
  entity.creator = event.transaction.from
  entity.timestamp = event.block.timestamp

  // Entities can be written to the store with `.save()`
  // let syntheticContract = getSyntheticContractInstance(event.address)
  entity.name = syntheticContract.name()
  entity.tokenBalance = syntheticContract.totalSupply()

  entity.save()



}

export function handleTokensRedeemed(event: TokensRedeemed): void {
  
  log.warning('Update Net Asset Value(NAV): {}', [event.address.toHex()])
  let entity = new SyntheticTokensRedeemed(event.address.toHex())

  // let syntheticContract = SyntheticContract.bind(event.address)
  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.numTokensRedeemed = event.params.numTokensRedeemed

  entity.save()

}

export function handleDeposited(event: Deposited): void {

  log.warning('Update Net Asset Value(NAV): {}', [event.address.toHex()])
  let entity = new MarginCurrencyDeposited(event.address.toHex())

  // let syntheticContract = SyntheticContract.bind(event.address)
  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.amount = event.params.amount

  entity.save()


}

export function handleWithdrawal(event: Withdrawal): void {

  log.warning('Update Net Asset Value(NAV): {}', [event.address.toHex()])
  let entity = new MarginCurrencyWithdrawn(event.address.toHex())

  // let syntheticContract = SyntheticContract.bind(event.address)
  // Entity fields can be set based on event parameters
  entity.symbol = event.params.symbol
  entity.amount = event.params.amount

  entity.save()
}

export function handleTransfer(event: Transfer): void {}

export function handleApproval(event: Approval): void {}
