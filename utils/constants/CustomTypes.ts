export enum UserEligibility {
  PENDING = "PENDING",
  ELIGIBLE = "ELIGIBLE",
  NOT_ELIGIBLE = "NOT_ELIGIBLE",
}

export enum ClaimStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIlED",
  NOT_STARTED = "NOT_STARTED",
}

export enum AirdropStatusMessage {
  MAP_CARDANO = 'Eligible To Map Cardano Wallet',
  REGISTER_OPEN = 'Registration Open',
  REGISTER_COMPLETE = 'Registration Complete',
  CLAIM = 'Claim Open',
  WALLET_ACCOUNT_ERROR = 'Wallet Account Error'
}