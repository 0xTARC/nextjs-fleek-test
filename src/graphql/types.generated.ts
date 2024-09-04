export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: string; output: string; }
  BigInt: { input: string; output: string; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
}

/**  Account of a Uniswap or Panoptic user.  */
export interface Account {
  __typename?: 'Account';
  /**  TokenIds owned by this account  */
  accountBalances: Array<AccountBalance>;
  /**  Account address  */
  id: Scalars['ID']['output'];
  /**  Subaccounts for PanopticPools where this Account has options activity  */
  panopticPoolAccount?: Maybe<Array<PanopticPoolAccount>>;
}


/**  Account of a Uniswap or Panoptic user.  */
export interface AccountAccountBalancesArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountBalance_Filter>;
}


/**  Account of a Uniswap or Panoptic user.  */
export interface AccountPanopticPoolAccountArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPoolAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PanopticPoolAccount_Filter>;
}

/**  The AccountBalance entity represents how many of a specific TokenId an Account holds  */
export interface AccountBalance {
  __typename?: 'AccountBalance';
  /**  Closed timestamp  */
  closedTimestamp?: Maybe<Scalars['BigInt']['output']>;
  /**  Creation block number  */
  createdBlockNumber: Scalars['BigInt']['output'];
  /**  Creation timestamp  */
  createdTimestamp: Scalars['BigInt']['output'];
  /**  For open positions, IDs will have the structure: 'Sender address' + '#' + 'tokenId'. The sender is to distinguish NFPM/SFPM positions from PanopticPool positions. For closed and force exercised positions, the structure will be 'Sender address' + '#' + 'tokenId' + '#' + 'txn hash of close event' + '#' + log index of close event'. For liquidated positions, the ID will be the same as for other closed positions but with an additional counter for the index of the liquidated position ('#' + 'index of liquidated position').  */
  id: Scalars['ID']['output'];
  /**  Open state of this Position. Will be 0 if closed, 1 if open, and 2 if there is another closed copy of this account balance and this instance is just a placeholder waiting to get overwritten. */
  isOpen: Scalars['Int']['output'];
  /**  The Legs and associated liquidity amounts of this AccountBalance's TokenId  */
  legLiquidities: Array<LegLiquidities>;
  /**  Creator of this AccountToken balance (e.g. NFPM Account, SFPM Account, PanopticPool)  */
  owner: Account;
  /**  The associated PanopticPoolAccount IF the TokenId exists within a PanopticPool. Null if the tokenId exists outside of a PanopticPool, like an LP position created through direct interaction with the SFPM / NFPM.  */
  panopticPoolAccount?: Maybe<PanopticPoolAccount>;
  /**  Position size expressed in terms of the asset  */
  positionSize: Scalars['BigInt']['output'];
  /**  Initiator of this txn (account responsible)  */
  sender: Account;
  /**  Amount of TokenId held by this Account  */
  tokenCount: Scalars['BigInt']['output'];
  /**  The ERC1155 TokenId held by this Account  */
  tokenId: TokenId;
  /**  ID of the event that closed account balance  */
  txnClosed?: Maybe<Event>;
  /**  ID of the event that created account balance  */
  txnOpened: Event;
}


/**  The AccountBalance entity represents how many of a specific TokenId an Account holds  */
export interface AccountBalanceLegLiquiditiesArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegLiquidities_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LegLiquidities_Filter>;
}

export interface AccountBalance_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AccountBalance_Filter>>>;
  closedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  closedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  closedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  closedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  closedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  closedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  closedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  closedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  isOpen?: InputMaybe<Scalars['Int']['input']>;
  isOpen_gt?: InputMaybe<Scalars['Int']['input']>;
  isOpen_gte?: InputMaybe<Scalars['Int']['input']>;
  isOpen_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isOpen_lt?: InputMaybe<Scalars['Int']['input']>;
  isOpen_lte?: InputMaybe<Scalars['Int']['input']>;
  isOpen_not?: InputMaybe<Scalars['Int']['input']>;
  isOpen_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  legLiquidities?: InputMaybe<Array<Scalars['String']['input']>>;
  legLiquidities_?: InputMaybe<LegLiquidities_Filter>;
  legLiquidities_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  legLiquidities_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  legLiquidities_not?: InputMaybe<Array<Scalars['String']['input']>>;
  legLiquidities_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  legLiquidities_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AccountBalance_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_?: InputMaybe<PanopticPoolAccount_Filter>;
  panopticPoolAccount_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPoolAccount_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_not?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPoolAccount_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPoolAccount_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionSize?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_?: InputMaybe<Account_Filter>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenCount?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_?: InputMaybe<TokenId_Filter>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnClosed?: InputMaybe<Scalars['String']['input']>;
  txnClosed_?: InputMaybe<Event_Filter>;
  txnClosed_contains?: InputMaybe<Scalars['String']['input']>;
  txnClosed_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txnClosed_ends_with?: InputMaybe<Scalars['String']['input']>;
  txnClosed_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnClosed_gt?: InputMaybe<Scalars['String']['input']>;
  txnClosed_gte?: InputMaybe<Scalars['String']['input']>;
  txnClosed_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txnClosed_lt?: InputMaybe<Scalars['String']['input']>;
  txnClosed_lte?: InputMaybe<Scalars['String']['input']>;
  txnClosed_not?: InputMaybe<Scalars['String']['input']>;
  txnClosed_not_contains?: InputMaybe<Scalars['String']['input']>;
  txnClosed_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txnClosed_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txnClosed_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnClosed_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txnClosed_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txnClosed_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnClosed_starts_with?: InputMaybe<Scalars['String']['input']>;
  txnClosed_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened?: InputMaybe<Scalars['String']['input']>;
  txnOpened_?: InputMaybe<Event_Filter>;
  txnOpened_contains?: InputMaybe<Scalars['String']['input']>;
  txnOpened_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_ends_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_gt?: InputMaybe<Scalars['String']['input']>;
  txnOpened_gte?: InputMaybe<Scalars['String']['input']>;
  txnOpened_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txnOpened_lt?: InputMaybe<Scalars['String']['input']>;
  txnOpened_lte?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_contains?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txnOpened_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_starts_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum AccountBalance_OrderBy {
  ClosedTimestamp = 'closedTimestamp',
  CreatedBlockNumber = 'createdBlockNumber',
  CreatedTimestamp = 'createdTimestamp',
  Id = 'id',
  IsOpen = 'isOpen',
  LegLiquidities = 'legLiquidities',
  Owner = 'owner',
  OwnerId = 'owner__id',
  PanopticPoolAccount = 'panopticPoolAccount',
  PanopticPoolAccountCollateral0Assets = 'panopticPoolAccount__collateral0Assets',
  PanopticPoolAccountCollateral0Shares = 'panopticPoolAccount__collateral0Shares',
  PanopticPoolAccountCollateral1Assets = 'panopticPoolAccount__collateral1Assets',
  PanopticPoolAccountCollateral1Shares = 'panopticPoolAccount__collateral1Shares',
  PanopticPoolAccountCommissions0 = 'panopticPoolAccount__commissions0',
  PanopticPoolAccountCommissions1 = 'panopticPoolAccount__commissions1',
  PanopticPoolAccountCommissionsSinceLastTransfer0 = 'panopticPoolAccount__commissionsSinceLastTransfer0',
  PanopticPoolAccountCommissionsSinceLastTransfer1 = 'panopticPoolAccount__commissionsSinceLastTransfer1',
  PanopticPoolAccountId = 'panopticPoolAccount__id',
  PanopticPoolAccountIsLiquidated = 'panopticPoolAccount__isLiquidated',
  PanopticPoolAccountSharePriceAtLastTransfer0 = 'panopticPoolAccount__sharePriceAtLastTransfer0',
  PanopticPoolAccountSharePriceAtLastTransfer1 = 'panopticPoolAccount__sharePriceAtLastTransfer1',
  PositionSize = 'positionSize',
  Sender = 'sender',
  SenderId = 'sender__id',
  TokenCount = 'tokenCount',
  TokenId = 'tokenId',
  TokenIdId = 'tokenId__id',
  TokenIdIdHexString = 'tokenId__idHexString',
  TokenIdTokenCount = 'tokenId__tokenCount',
  TxnClosed = 'txnClosed',
  TxnClosedBlockNumber = 'txnClosed__blockNumber',
  TxnClosedEventType = 'txnClosed__eventType',
  TxnClosedFrom = 'txnClosed__from',
  TxnClosedGasPrice = 'txnClosed__gasPrice',
  TxnClosedGasUsed = 'txnClosed__gasUsed',
  TxnClosedHash = 'txnClosed__hash',
  TxnClosedId = 'txnClosed__id',
  TxnClosedLogIndex = 'txnClosed__logIndex',
  TxnClosedTimestamp = 'txnClosed__timestamp',
  TxnClosedTo = 'txnClosed__to',
  TxnOpened = 'txnOpened',
  TxnOpenedBlockNumber = 'txnOpened__blockNumber',
  TxnOpenedEventType = 'txnOpened__eventType',
  TxnOpenedFrom = 'txnOpened__from',
  TxnOpenedGasPrice = 'txnOpened__gasPrice',
  TxnOpenedGasUsed = 'txnOpened__gasUsed',
  TxnOpenedHash = 'txnOpened__hash',
  TxnOpenedId = 'txnOpened__id',
  TxnOpenedLogIndex = 'txnOpened__logIndex',
  TxnOpenedTimestamp = 'txnOpened__timestamp',
  TxnOpenedTo = 'txnOpened__to'
}

/**  Liquidation of a distressed PanopticPoolAccount. All of the distressed account's positions in a specific PanopticPool get closed and the liquidator receives a bonus.  */
export interface AccountLiquidated extends Event {
  __typename?: 'AccountLiquidated';
  blockNumber: Scalars['BigInt']['output'];
  /**  LeftRight encoding for the the bonus paid for token 0 (right slot) and 1 (left slot) from the Panoptic Pool to the liquidator. See liquidationBonus0 and liquidationBonus1 for the unpacked token values.  */
  bonusAmounts: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**  Address of the distressed/liquidated account  */
  liquidatee: Account;
  /**  The amount of bonus paid for token0 for this liquidation.  */
  liquidationBonus0: Scalars['BigInt']['output'];
  /**  The amount of bonus paid for token1 for this liquidation.  */
  liquidationBonus1: Scalars['BigInt']['output'];
  /**  The summed liquidation bonus in USD.  */
  liquidationBonusUSD: Scalars['BigDecimal']['output'];
  /**  Address that liquidates the distressed account  */
  liquidator: Account;
  logIndex: Scalars['BigInt']['output'];
  /**  List of OptionBurn events resulting from this Liquidation  */
  optionBurns?: Maybe<Array<OptionBurn>>;
  /**  The PanopticPool this liquidation happened in (from event.address)  */
  panopticPool: PanopticPool;
  pool: Pool;
  /**  Tick when the position was liquidated  */
  tickAt: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
}


/**  Liquidation of a distressed PanopticPoolAccount. All of the distressed account's positions in a specific PanopticPool get closed and the liquidator receives a bonus.  */
export interface AccountLiquidatedOptionBurnsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OptionBurn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OptionBurn_Filter>;
}

export interface AccountLiquidated_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AccountLiquidated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bonusAmounts?: InputMaybe<Scalars['BigInt']['input']>;
  bonusAmounts_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bonusAmounts_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bonusAmounts_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bonusAmounts_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bonusAmounts_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bonusAmounts_not?: InputMaybe<Scalars['BigInt']['input']>;
  bonusAmounts_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidatee?: InputMaybe<Scalars['String']['input']>;
  liquidatee_?: InputMaybe<Account_Filter>;
  liquidatee_contains?: InputMaybe<Scalars['String']['input']>;
  liquidatee_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidatee_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidatee_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidatee_gt?: InputMaybe<Scalars['String']['input']>;
  liquidatee_gte?: InputMaybe<Scalars['String']['input']>;
  liquidatee_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidatee_lt?: InputMaybe<Scalars['String']['input']>;
  liquidatee_lte?: InputMaybe<Scalars['String']['input']>;
  liquidatee_not?: InputMaybe<Scalars['String']['input']>;
  liquidatee_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidatee_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidatee_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidatee_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidatee_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidatee_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidatee_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidatee_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidatee_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidationBonus0?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidationBonus0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus0_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidationBonus1?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidationBonus1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus1_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationBonus1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidationBonusUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationBonusUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationBonusUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationBonusUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidationBonusUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationBonusUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationBonusUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationBonusUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidator?: InputMaybe<Scalars['String']['input']>;
  liquidator_?: InputMaybe<Account_Filter>;
  liquidator_contains?: InputMaybe<Scalars['String']['input']>;
  liquidator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidator_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidator_gt?: InputMaybe<Scalars['String']['input']>;
  liquidator_gte?: InputMaybe<Scalars['String']['input']>;
  liquidator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidator_lt?: InputMaybe<Scalars['String']['input']>;
  liquidator_lte?: InputMaybe<Scalars['String']['input']>;
  liquidator_not?: InputMaybe<Scalars['String']['input']>;
  liquidator_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidator_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  optionBurns_?: InputMaybe<OptionBurn_Filter>;
  or?: InputMaybe<Array<InputMaybe<AccountLiquidated_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickAt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickAt_lt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_lte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum AccountLiquidated_OrderBy {
  BlockNumber = 'blockNumber',
  BonusAmounts = 'bonusAmounts',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  Liquidatee = 'liquidatee',
  LiquidateeId = 'liquidatee__id',
  LiquidationBonus0 = 'liquidationBonus0',
  LiquidationBonus1 = 'liquidationBonus1',
  LiquidationBonusUsd = 'liquidationBonusUSD',
  Liquidator = 'liquidator',
  LiquidatorId = 'liquidator__id',
  LogIndex = 'logIndex',
  OptionBurns = 'optionBurns',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  TickAt = 'tickAt',
  Timestamp = 'timestamp',
  To = 'to'
}

export interface Account_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accountBalances_?: InputMaybe<AccountBalance_Filter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  panopticPoolAccount_?: InputMaybe<PanopticPoolAccount_Filter>;
}

export enum Account_OrderBy {
  AccountBalances = 'accountBalances',
  Id = 'id',
  PanopticPoolAccount = 'panopticPoolAccount'
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export interface BlockChangedFilter {
  number_gte: Scalars['Int']['input'];
}

export interface Block_Height {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
}

/**  Keeps track of ETH/USD price using a configured Uniswap pool.  */
export interface Bundle {
  __typename?: 'Bundle';
  /**  Price of ETH in USD.  */
  ethPriceUSD: Scalars['BigDecimal']['output'];
  /**  The ID of the Bundle singleton is always 1.  */
  id: Scalars['ID']['output'];
}

export interface Bundle_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bundle_Filter>>>;
  ethPriceUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ethPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Bundle_Filter>>>;
}

export enum Bundle_OrderBy {
  EthPriceUsd = 'ethPriceUSD',
  Id = 'id'
}

/**  Uniswap liquidity burn  */
export interface Burn extends Event {
  __typename?: 'Burn';
  /**  The amount of liquidity to remove  */
  amount: Scalars['BigInt']['output'];
  /**  The amount of token 0 withdrawn  */
  amount0: Scalars['BigDecimal']['output'];
  /**  The amount of token 1 withdrawn  */
  amount1: Scalars['BigDecimal']['output'];
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  The owner of the position for which liquidity is removed  */
  owner: Account;
  pool: Pool;
  /**  The lower tick of the position  */
  tickLower: Scalars['Int']['output'];
  /**  The upper tick of the position  */
  tickUpper: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /**  Allow indexing by tokens  */
  token0: Token;
  /**  Allow indexing by tokens  */
  token1: Token;
}

export interface Burn_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Burn_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Burn_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickLower_lt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_lte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickUpper_lt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum Burn_OrderBy {
  Amount = 'amount',
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  Timestamp = 'timestamp',
  To = 'to',
  Token0 = 'token0',
  Token0Decimals = 'token0__decimals',
  Token0DerivedEth = 'token0__derivedETH',
  Token0Id = 'token0__id',
  Token0Name = 'token0__name',
  Token0Symbol = 'token0__symbol',
  Token0TotalSupply = 'token0__totalSupply',
  Token0TxCount = 'token0__txCount',
  Token1 = 'token1',
  Token1Decimals = 'token1__decimals',
  Token1DerivedEth = 'token1__derivedETH',
  Token1Id = 'token1__id',
  Token1Name = 'token1__name',
  Token1Symbol = 'token1__symbol',
  Token1TotalSupply = 'token1__totalSupply',
  Token1TxCount = 'token1__txCount'
}

/**  A chunk of liquidity. Used to track liquidity available in Uniswap, as well as liquidity removed from Uniswap for use in PanopticPools.  */
export interface Chunk {
  __typename?: 'Chunk';
  /**  ID is a concatenated string of: owner + '#' + manager + '#' + poolAddress + '#' + tokenType + '#' + lowerTick + '#' + upperTick  */
  id: Scalars['ID']['output'];
  /**  Legs created on this chunk of liquidity  */
  legs: Array<Leg>;
  /**  Total short positions in chunk  */
  longCounts: Scalars['BigInt']['output'];
  /**  Long liquidity in chunk  */
  longLiquidity: Scalars['BigInt']['output'];
  /**  Mint.sender / Burn.owner on Uniswap pool event  */
  manager: Account;
  /**  Net liquidity in chunk  */
  netLiquidity: Scalars['BigInt']['output'];
  /**  TokenizedPositionMinted.caller if mint routes through SFPM. Otherwise, same as manager (will be a PanopticPool address for option mints/burns/rolls).  */
  owner: Account;
  /**  If owned by a PanopticPool, PanopticPool that owns this chunk  */
  panopticPool?: Maybe<PanopticPool>;
  /**  Pool where this chunk exists  */
  pool: Pool;
  /**  Total long positions in chunk  */
  shortCounts: Scalars['BigInt']['output'];
  /**  Short liquidity in chunk  */
  shortLiquidity: Scalars['BigInt']['output'];
  /**  Avg. of tickLower & tickUpper  */
  strike: Scalars['BigInt']['output'];
  /**  Lower tick of the position  */
  tickLower: Scalars['BigInt']['output'];
  /**  Upper tick of the position  */
  tickUpper: Scalars['BigInt']['output'];
  /**  Which token is moved when deployed (0 -> token0, 1 -> token1). When minted through Uniswap's NFPM, tokenType is always 1 (for put).  */
  tokenType: Scalars['BigInt']['output'];
  /**  Total liquidity in chunk  */
  totalLiquidity: Scalars['BigInt']['output'];
  /**  (tickUpper - tickLower) / pool.tickSpacing  */
  width: Scalars['BigInt']['output'];
}


/**  A chunk of liquidity. Used to track liquidity available in Uniswap, as well as liquidity removed from Uniswap for use in PanopticPools.  */
export interface ChunkLegsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Leg_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Leg_Filter>;
}

export interface Chunk_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Chunk_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  legs_?: InputMaybe<Leg_Filter>;
  longCounts?: InputMaybe<Scalars['BigInt']['input']>;
  longCounts_gt?: InputMaybe<Scalars['BigInt']['input']>;
  longCounts_gte?: InputMaybe<Scalars['BigInt']['input']>;
  longCounts_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  longCounts_lt?: InputMaybe<Scalars['BigInt']['input']>;
  longCounts_lte?: InputMaybe<Scalars['BigInt']['input']>;
  longCounts_not?: InputMaybe<Scalars['BigInt']['input']>;
  longCounts_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  longLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  longLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  longLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  longLiquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  longLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  longLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  longLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  longLiquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  manager?: InputMaybe<Scalars['String']['input']>;
  manager_?: InputMaybe<Account_Filter>;
  manager_contains?: InputMaybe<Scalars['String']['input']>;
  manager_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_ends_with?: InputMaybe<Scalars['String']['input']>;
  manager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_gt?: InputMaybe<Scalars['String']['input']>;
  manager_gte?: InputMaybe<Scalars['String']['input']>;
  manager_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manager_lt?: InputMaybe<Scalars['String']['input']>;
  manager_lte?: InputMaybe<Scalars['String']['input']>;
  manager_not?: InputMaybe<Scalars['String']['input']>;
  manager_not_contains?: InputMaybe<Scalars['String']['input']>;
  manager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  manager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manager_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  manager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_starts_with?: InputMaybe<Scalars['String']['input']>;
  manager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  netLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  netLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  netLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  netLiquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  netLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  netLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  netLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  netLiquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Chunk_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  shortCounts?: InputMaybe<Scalars['BigInt']['input']>;
  shortCounts_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shortCounts_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shortCounts_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shortCounts_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shortCounts_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shortCounts_not?: InputMaybe<Scalars['BigInt']['input']>;
  shortCounts_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shortLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  shortLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shortLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shortLiquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shortLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shortLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shortLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  shortLiquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strike?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strike_lt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_lte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLower?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickUpper_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenType?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  width?: InputMaybe<Scalars['BigInt']['input']>;
  width_gt?: InputMaybe<Scalars['BigInt']['input']>;
  width_gte?: InputMaybe<Scalars['BigInt']['input']>;
  width_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  width_lt?: InputMaybe<Scalars['BigInt']['input']>;
  width_lte?: InputMaybe<Scalars['BigInt']['input']>;
  width_not?: InputMaybe<Scalars['BigInt']['input']>;
  width_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum Chunk_OrderBy {
  Id = 'id',
  Legs = 'legs',
  LongCounts = 'longCounts',
  LongLiquidity = 'longLiquidity',
  Manager = 'manager',
  ManagerId = 'manager__id',
  NetLiquidity = 'netLiquidity',
  Owner = 'owner',
  OwnerId = 'owner__id',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  ShortCounts = 'shortCounts',
  ShortLiquidity = 'shortLiquidity',
  Strike = 'strike',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  TokenType = 'tokenType',
  TotalLiquidity = 'totalLiquidity',
  Width = 'width'
}

/**  Contains the collateralization metrics of a certain token in a certain PanopticPool (derived from the CollateralTracker.sol contract).  */
export interface Collateral {
  __typename?: 'Collateral';
  /**  Snapshots of CollateralDayData  */
  collateralDayData: Array<CollateralDayData>;
  /**  Address of CollateralTracker for pool  */
  id: Scalars['ID']['output'];
  /**  Tokens moved from Panoptic Pool to AMM  */
  inAMM: Scalars['BigInt']['output'];
  /**  Index of 0 or 1, indicating if this is collateralTracker0 or collateralTracker1 in its parent PanopticPool  */
  index: Scalars['BigInt']['output'];
  /**  The PanopticPool being collateralized  */
  panopticPool: PanopticPool;
  /**  Assets accounted to be held by the Panoptic Pool. Ignores donations, pending fee payouts, and other untracked balance changes.  */
  poolAssets: Scalars['BigInt']['output'];
  /**  Pool utilization represents how many funds are in the AMM pool, times 10,000, over the total assets controlled by the Panoptic pool.  */
  poolUtilization: Scalars['BigInt']['output'];
  /**
   * Share price immediately before calling liquidate() used for calculating protocol loss. Starts as 0 and
   * gets updated when a _mint() call is being handled during a liquidation (nonzero share transfer from 0 address -> liquidator).
   * Gets reset when handling a Deposit() event (which is the only other time transfer from 0 address -> liquidator would happen)
   * or after being used by the AccountLiquidated() event handler.
   *
   */
  preLiquidationSharePrice: Scalars['BigDecimal']['output'];
  /**  Share price before most recent transfer event. Useful for calculating commissions.  */
  previousSharePrice: Scalars['BigDecimal']['output'];
  /**  Address of underlying token  */
  token: Token;
  /**  Total assets managed by this Collateral vault. Should be equal to `poolAssets + inAMM`.  */
  totalAssets: Scalars['BigInt']['output'];
  /**  Total shares supply (receipts to claim assets)  */
  totalShares: Scalars['BigInt']['output'];
}


/**  Contains the collateralization metrics of a certain token in a certain PanopticPool (derived from the CollateralTracker.sol contract).  */
export interface CollateralCollateralDayDataArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CollateralDayData_Filter>;
}

/**  Data accumulated and condensed into day stats for each collateral. If no Collateral events are emitted on a given day, there will be a missing CollateralDayData for that day.  */
export interface CollateralDayData {
  __typename?: 'CollateralDayData';
  /**  Pointer to Collateral  */
  collateral: Collateral;
  /**  Timestamp rounded to current day by dividing by 86400  */
  date: Scalars['Int']['output'];
  /**  Timestamp rounded to current day combined with collateral id  */
  id: Scalars['ID']['output'];
  /**  Share price (assets/shares)  */
  sharePrice: Scalars['BigDecimal']['output'];
  /**  Assets  */
  totalAssets: Scalars['BigInt']['output'];
  /**  Shares  */
  totalShares: Scalars['BigInt']['output'];
}

export interface CollateralDayData_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CollateralDayData_Filter>>>;
  collateral?: InputMaybe<Scalars['String']['input']>;
  collateral_?: InputMaybe<Collateral_Filter>;
  collateral_contains?: InputMaybe<Scalars['String']['input']>;
  collateral_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_gt?: InputMaybe<Scalars['String']['input']>;
  collateral_gte?: InputMaybe<Scalars['String']['input']>;
  collateral_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral_lt?: InputMaybe<Scalars['String']['input']>;
  collateral_lte?: InputMaybe<Scalars['String']['input']>;
  collateral_not?: InputMaybe<Scalars['String']['input']>;
  collateral_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateral_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CollateralDayData_Filter>>>;
  sharePrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  sharePrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalAssets?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalShares?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum CollateralDayData_OrderBy {
  Collateral = 'collateral',
  CollateralId = 'collateral__id',
  CollateralInAmm = 'collateral__inAMM',
  CollateralIndex = 'collateral__index',
  CollateralPoolAssets = 'collateral__poolAssets',
  CollateralPoolUtilization = 'collateral__poolUtilization',
  CollateralPreLiquidationSharePrice = 'collateral__preLiquidationSharePrice',
  CollateralPreviousSharePrice = 'collateral__previousSharePrice',
  CollateralTotalAssets = 'collateral__totalAssets',
  CollateralTotalShares = 'collateral__totalShares',
  Date = 'date',
  Id = 'id',
  SharePrice = 'sharePrice',
  TotalAssets = 'totalAssets',
  TotalShares = 'totalShares'
}

/**  Collateral deposit (PLP liquidity deposit)  */
export interface CollateralDeposit extends Event {
  __typename?: 'CollateralDeposit';
  /**  The amount of assets deposited by `sender` in exchange for `shares`  */
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  /**  The collateral entity that received the deposit.  */
  collateral: Collateral;
  ethPriceUSDAtDeposit: Scalars['BigDecimal']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  The address of the recipient of the newly minted shares  */
  owner: Account;
  pool: Pool;
  /**  The address of the caller (and depositor)  */
  sender: Account;
  /**  Shares the amount of shares minted to `owner`  */
  shares: Scalars['BigInt']['output'];
  tickAtDeposit?: Maybe<Scalars['BigInt']['output']>;
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  tokenDerivedEthAtDeposit: Scalars['BigDecimal']['output'];
}

export interface CollateralDeposit_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CollateralDeposit_Filter>>>;
  assets?: InputMaybe<Scalars['BigInt']['input']>;
  assets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  assets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  assets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  assets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  assets_not?: InputMaybe<Scalars['BigInt']['input']>;
  assets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral?: InputMaybe<Scalars['String']['input']>;
  collateral_?: InputMaybe<Collateral_Filter>;
  collateral_contains?: InputMaybe<Scalars['String']['input']>;
  collateral_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_gt?: InputMaybe<Scalars['String']['input']>;
  collateral_gte?: InputMaybe<Scalars['String']['input']>;
  collateral_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral_lt?: InputMaybe<Scalars['String']['input']>;
  collateral_lte?: InputMaybe<Scalars['String']['input']>;
  collateral_not?: InputMaybe<Scalars['String']['input']>;
  collateral_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateral_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ethPriceUSDAtDeposit?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtDeposit_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtDeposit_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtDeposit_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ethPriceUSDAtDeposit_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtDeposit_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtDeposit_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtDeposit_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CollateralDeposit_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_?: InputMaybe<Account_Filter>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickAtDeposit?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtDeposit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtDeposit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtDeposit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickAtDeposit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtDeposit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtDeposit_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtDeposit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenDerivedEthAtDeposit?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtDeposit_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtDeposit_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtDeposit_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokenDerivedEthAtDeposit_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtDeposit_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtDeposit_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtDeposit_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
}

export enum CollateralDeposit_OrderBy {
  Assets = 'assets',
  BlockNumber = 'blockNumber',
  Collateral = 'collateral',
  CollateralId = 'collateral__id',
  CollateralInAmm = 'collateral__inAMM',
  CollateralIndex = 'collateral__index',
  CollateralPoolAssets = 'collateral__poolAssets',
  CollateralPoolUtilization = 'collateral__poolUtilization',
  CollateralPreLiquidationSharePrice = 'collateral__preLiquidationSharePrice',
  CollateralPreviousSharePrice = 'collateral__previousSharePrice',
  CollateralTotalAssets = 'collateral__totalAssets',
  CollateralTotalShares = 'collateral__totalShares',
  EthPriceUsdAtDeposit = 'ethPriceUSDAtDeposit',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  Sender = 'sender',
  SenderId = 'sender__id',
  Shares = 'shares',
  TickAtDeposit = 'tickAtDeposit',
  Timestamp = 'timestamp',
  To = 'to',
  TokenDerivedEthAtDeposit = 'tokenDerivedEthAtDeposit'
}

/**  Collateral deposit (PLP liquidity withdrawal)  */
export interface CollateralWithdraw extends Event {
  __typename?: 'CollateralWithdraw';
  /**  The amount of assets withdrawn to `receiver`  */
  assets: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  /**  The collateral entity that was withdrawn from.  */
  collateral: Collateral;
  ethPriceUSDAtWithdraw: Scalars['BigDecimal']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  The address of the owner of the shares being burned  */
  owner: Account;
  pool: Pool;
  /**  The address of the recipient of the withdrawn assets  */
  receiver: Account;
  /**  The address of the caller  */
  sender: Account;
  /**  The amount of shares burned by `owner` in exchange for `assets`  */
  shares: Scalars['BigInt']['output'];
  tickAtWithdraw?: Maybe<Scalars['BigInt']['output']>;
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  tokenDerivedEthAtWithdraw: Scalars['BigDecimal']['output'];
}

export interface CollateralWithdraw_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CollateralWithdraw_Filter>>>;
  assets?: InputMaybe<Scalars['BigInt']['input']>;
  assets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  assets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  assets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  assets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  assets_not?: InputMaybe<Scalars['BigInt']['input']>;
  assets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral?: InputMaybe<Scalars['String']['input']>;
  collateral_?: InputMaybe<Collateral_Filter>;
  collateral_contains?: InputMaybe<Scalars['String']['input']>;
  collateral_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_gt?: InputMaybe<Scalars['String']['input']>;
  collateral_gte?: InputMaybe<Scalars['String']['input']>;
  collateral_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral_lt?: InputMaybe<Scalars['String']['input']>;
  collateral_lte?: InputMaybe<Scalars['String']['input']>;
  collateral_not?: InputMaybe<Scalars['String']['input']>;
  collateral_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateral_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ethPriceUSDAtWithdraw?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtWithdraw_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtWithdraw_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtWithdraw_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ethPriceUSDAtWithdraw_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtWithdraw_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtWithdraw_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPriceUSDAtWithdraw_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CollateralWithdraw_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  receiver_?: InputMaybe<Account_Filter>;
  receiver_contains?: InputMaybe<Scalars['String']['input']>;
  receiver_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  receiver_ends_with?: InputMaybe<Scalars['String']['input']>;
  receiver_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  receiver_gt?: InputMaybe<Scalars['String']['input']>;
  receiver_gte?: InputMaybe<Scalars['String']['input']>;
  receiver_in?: InputMaybe<Array<Scalars['String']['input']>>;
  receiver_lt?: InputMaybe<Scalars['String']['input']>;
  receiver_lte?: InputMaybe<Scalars['String']['input']>;
  receiver_not?: InputMaybe<Scalars['String']['input']>;
  receiver_not_contains?: InputMaybe<Scalars['String']['input']>;
  receiver_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  receiver_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  receiver_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  receiver_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  receiver_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  receiver_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  receiver_starts_with?: InputMaybe<Scalars['String']['input']>;
  receiver_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_?: InputMaybe<Account_Filter>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickAtWithdraw?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtWithdraw_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtWithdraw_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtWithdraw_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickAtWithdraw_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtWithdraw_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtWithdraw_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickAtWithdraw_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenDerivedEthAtWithdraw?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtWithdraw_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtWithdraw_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtWithdraw_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokenDerivedEthAtWithdraw_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtWithdraw_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtWithdraw_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenDerivedEthAtWithdraw_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
}

export enum CollateralWithdraw_OrderBy {
  Assets = 'assets',
  BlockNumber = 'blockNumber',
  Collateral = 'collateral',
  CollateralId = 'collateral__id',
  CollateralInAmm = 'collateral__inAMM',
  CollateralIndex = 'collateral__index',
  CollateralPoolAssets = 'collateral__poolAssets',
  CollateralPoolUtilization = 'collateral__poolUtilization',
  CollateralPreLiquidationSharePrice = 'collateral__preLiquidationSharePrice',
  CollateralPreviousSharePrice = 'collateral__previousSharePrice',
  CollateralTotalAssets = 'collateral__totalAssets',
  CollateralTotalShares = 'collateral__totalShares',
  EthPriceUsdAtWithdraw = 'ethPriceUSDAtWithdraw',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  Receiver = 'receiver',
  ReceiverId = 'receiver__id',
  Sender = 'sender',
  SenderId = 'sender__id',
  Shares = 'shares',
  TickAtWithdraw = 'tickAtWithdraw',
  Timestamp = 'timestamp',
  To = 'to',
  TokenDerivedEthAtWithdraw = 'tokenDerivedEthAtWithdraw'
}

export interface Collateral_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Collateral_Filter>>>;
  collateralDayData_?: InputMaybe<CollateralDayData_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  inAMM?: InputMaybe<Scalars['BigInt']['input']>;
  inAMM_gt?: InputMaybe<Scalars['BigInt']['input']>;
  inAMM_gte?: InputMaybe<Scalars['BigInt']['input']>;
  inAMM_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  inAMM_lt?: InputMaybe<Scalars['BigInt']['input']>;
  inAMM_lte?: InputMaybe<Scalars['BigInt']['input']>;
  inAMM_not?: InputMaybe<Scalars['BigInt']['input']>;
  inAMM_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  index?: InputMaybe<Scalars['BigInt']['input']>;
  index_gt?: InputMaybe<Scalars['BigInt']['input']>;
  index_gte?: InputMaybe<Scalars['BigInt']['input']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  index_lt?: InputMaybe<Scalars['BigInt']['input']>;
  index_lte?: InputMaybe<Scalars['BigInt']['input']>;
  index_not?: InputMaybe<Scalars['BigInt']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Collateral_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolAssets?: InputMaybe<Scalars['BigInt']['input']>;
  poolAssets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolAssets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolAssets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolAssets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolAssets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolAssets_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolAssets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  preLiquidationSharePrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  preLiquidationSharePrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  preLiquidationSharePrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  preLiquidationSharePrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  preLiquidationSharePrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  preLiquidationSharePrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  preLiquidationSharePrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  preLiquidationSharePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  previousSharePrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  previousSharePrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  previousSharePrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  previousSharePrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  previousSharePrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  previousSharePrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  previousSharePrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  previousSharePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalAssets?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAssets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalAssets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalShares?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum Collateral_OrderBy {
  CollateralDayData = 'collateralDayData',
  Id = 'id',
  InAmm = 'inAMM',
  Index = 'index',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  PoolAssets = 'poolAssets',
  PoolUtilization = 'poolUtilization',
  PreLiquidationSharePrice = 'preLiquidationSharePrice',
  PreviousSharePrice = 'previousSharePrice',
  Token = 'token',
  TokenDecimals = 'token__decimals',
  TokenDerivedEth = 'token__derivedETH',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  TokenTotalSupply = 'token__totalSupply',
  TokenTxCount = 'token__txCount',
  TotalAssets = 'totalAssets',
  TotalShares = 'totalShares'
}

/**  Uniswap collect  */
export interface Collect extends Event {
  __typename?: 'Collect';
  /**  The amount of token0 fees collected  */
  amount0: Scalars['BigDecimal']['output'];
  /**  The amount of token1 fees collected  */
  amount1: Scalars['BigDecimal']['output'];
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  The owner of the position for which fees are collected  */
  owner: Account;
  pool: Pool;
  /**  The address that received the output of the collect  */
  recipient: Account;
  /**  The lower tick of the position  */
  tickLower: Scalars['Int']['output'];
  /**  The upper tick of the position  */
  tickUpper: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
}

export interface Collect_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Collect_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Collect_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  recipient_?: InputMaybe<Account_Filter>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickLower_lt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_lte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickUpper_lt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum Collect_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  Recipient = 'recipient',
  RecipientId = 'recipient__id',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  Timestamp = 'timestamp',
  To = 'to'
}

/**  A generic entity for the many events that get emitted throughout the Panoptic protocol.  */
export interface Event {
  /**  Block txn was included in  */
  blockNumber: Scalars['BigInt']['output'];
  /**  Type of event. The Graph doesn't allow filtering by __typename meta so it's explicitly required here  */
  eventType: EventType;
  /**  Sender of transaction  */
  from: Scalars['String']['output'];
  /**  Gas price during txn execution  */
  gasPrice: Scalars['BigInt']['output'];
  /**  Gas used during txn execution  */
  gasUsed: Scalars['BigInt']['output'];
  /**  Txn hash of the transaction emitting this event  */
  hash: Scalars['String']['output'];
  /**  Txn hash + '#' + log index  */
  id: Scalars['ID']['output'];
  /**  Event log index  */
  logIndex: Scalars['BigInt']['output'];
  /**  Uniswap Pool the event happened within, or the underlying Uniswap Pool for a PanopticPool event. Needed to show all transactions within a pool from a certain account because The Graph doesn't have the ability to add custom filters.  */
  pool: Pool;
  /**  Timestamp txn was confirmed  */
  timestamp: Scalars['BigInt']['output'];
  /**  Receiver of transaction  */
  to: Scalars['String']['output'];
}

export enum EventType {
  /**  Liquidation of a distressed PanopticPoolAccount. All of the distressed account's positions in a specific PanopticPool get closed and the liquidator receives a bonus.  */
  AccountLiquidated = 'AccountLiquidated',
  /**  Uniswap liquidity burn  */
  Burn = 'Burn',
  /**  Uniswap collect  */
  Collect = 'Collect',
  /**  Collateral deposit (PLP liquidity deposit)  */
  Deposit = 'Deposit',
  /**  Force the exercise of a single position. Exercisor will have to pay a fee to the force exercisee.  */
  ForcedExercised = 'ForcedExercised',
  /**  Uniswap liquidity mint  */
  Mint = 'Mint',
  /**  Panoption burn / position close  */
  OptionBurn = 'OptionBurn',
  /**  Panoption mint / position open  */
  OptionMint = 'OptionMint',
  OptionRoll = 'OptionRoll',
  /**  Emitted when premium is settled independent of a mint/burn (e.g. during `settleLongPremium`) */
  PremiumSettled = 'PremiumSettled',
  /**  SFPM tokenized position burn  */
  TokenizedPositionBurnt = 'TokenizedPositionBurnt',
  /**  SFPM tokenized position mint  */
  TokenizedPositionMinted = 'TokenizedPositionMinted',
  /**  SFPM tokenized position roll  */
  TokenizedPositionRolled = 'TokenizedPositionRolled',
  /**  Collateral deposit (PLP liquidity withdrawal)  */
  Withdraw = 'Withdraw'
}

export interface Event_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum Event_OrderBy {
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  Timestamp = 'timestamp',
  To = 'to'
}

/**  Uniswap Factory (deployer of Pools).  */
export interface Factory {
  __typename?: 'Factory';
  /**  Factory address  */
  id: Scalars['ID']['output'];
  /**  Used to track if regenesis backfill has completed for Optimism. */
  opBackfilled?: Maybe<Scalars['Boolean']['output']>;
  /**  Current owner of the factory  */
  owner: Scalars['ID']['output'];
  /**  Amount of pools created  */
  poolCount: Scalars['BigInt']['output'];
}

export interface Factory_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  opBackfilled?: InputMaybe<Scalars['Boolean']['input']>;
  opBackfilled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  opBackfilled_not?: InputMaybe<Scalars['Boolean']['input']>;
  opBackfilled_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
  owner?: InputMaybe<Scalars['ID']['input']>;
  owner_gt?: InputMaybe<Scalars['ID']['input']>;
  owner_gte?: InputMaybe<Scalars['ID']['input']>;
  owner_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  owner_lt?: InputMaybe<Scalars['ID']['input']>;
  owner_lte?: InputMaybe<Scalars['ID']['input']>;
  owner_not?: InputMaybe<Scalars['ID']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  poolCount?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum Factory_OrderBy {
  Id = 'id',
  OpBackfilled = 'opBackfilled',
  Owner = 'owner',
  PoolCount = 'poolCount'
}

/**  Force the exercise of a single position. Exercisor will have to pay a fee to the force exercisee.  */
export interface ForcedExercise extends Event {
  __typename?: 'ForcedExercise';
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  /**  LeftRight encoding for the cost paid by the exercisor to force the exercise of the token. The token0 fee is in the right slot, and token1 fee is in the left slot.  */
  exerciseFee: Scalars['BigInt']['output'];
  /**  The cost paid by the exercisor to force the exercise for token0 (represented as a negative value, fee debited)  */
  exerciseFee0: Scalars['BigInt']['output'];
  /**  The cost paid by the exercisor to force the exercise for token1 (represented as a negative value, fee debited)  */
  exerciseFee1: Scalars['BigInt']['output'];
  /**  The summed cost in USD paid by the exercisor for this force exercise  */
  exerciseFeeUSD: Scalars['BigDecimal']['output'];
  /**  Address of the account that forces the exercise of the position  */
  exercisor: Account;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  OptionBurn event for the exercised position  */
  optionBurn?: Maybe<OptionBurn>;
  /**  The PanopticPool this forced exercise happened in (from event.address)  */
  panopticPool: PanopticPool;
  pool: Pool;
  /**  Tick when the position was exercised  */
  tickAt: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /**  TokenId of the exercised position  */
  tokenId: Scalars['BigInt']['output'];
  /**  Address of the owner of the liquidated position  */
  user: Account;
}

export interface ForcedExercise_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ForcedExercise_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  exerciseFee?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee0?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exerciseFee0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee0_not?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exerciseFee1?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exerciseFee1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee1_not?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exerciseFeeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  exerciseFeeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  exerciseFeeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  exerciseFeeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  exerciseFeeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  exerciseFeeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  exerciseFeeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  exerciseFeeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  exerciseFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exerciseFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  exerciseFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exercisor?: InputMaybe<Scalars['String']['input']>;
  exercisor_?: InputMaybe<Account_Filter>;
  exercisor_contains?: InputMaybe<Scalars['String']['input']>;
  exercisor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  exercisor_ends_with?: InputMaybe<Scalars['String']['input']>;
  exercisor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  exercisor_gt?: InputMaybe<Scalars['String']['input']>;
  exercisor_gte?: InputMaybe<Scalars['String']['input']>;
  exercisor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  exercisor_lt?: InputMaybe<Scalars['String']['input']>;
  exercisor_lte?: InputMaybe<Scalars['String']['input']>;
  exercisor_not?: InputMaybe<Scalars['String']['input']>;
  exercisor_not_contains?: InputMaybe<Scalars['String']['input']>;
  exercisor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  exercisor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  exercisor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  exercisor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  exercisor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  exercisor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  exercisor_starts_with?: InputMaybe<Scalars['String']['input']>;
  exercisor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  optionBurn_?: InputMaybe<OptionBurn_Filter>;
  or?: InputMaybe<Array<InputMaybe<ForcedExercise_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickAt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickAt_lt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_lte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<Account_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum ForcedExercise_OrderBy {
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  ExerciseFee = 'exerciseFee',
  ExerciseFee0 = 'exerciseFee0',
  ExerciseFee1 = 'exerciseFee1',
  ExerciseFeeUsd = 'exerciseFeeUSD',
  Exercisor = 'exercisor',
  ExercisorId = 'exercisor__id',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  OptionBurn = 'optionBurn',
  OptionBurnBlockNumber = 'optionBurn__blockNumber',
  OptionBurnEventType = 'optionBurn__eventType',
  OptionBurnFrom = 'optionBurn__from',
  OptionBurnGasPrice = 'optionBurn__gasPrice',
  OptionBurnGasUsed = 'optionBurn__gasUsed',
  OptionBurnHash = 'optionBurn__hash',
  OptionBurnId = 'optionBurn__id',
  OptionBurnLogIndex = 'optionBurn__logIndex',
  OptionBurnPositionSize = 'optionBurn__positionSize',
  OptionBurnPremia = 'optionBurn__premia',
  OptionBurnPremium0 = 'optionBurn__premium0',
  OptionBurnPremium1 = 'optionBurn__premium1',
  OptionBurnTickAt = 'optionBurn__tickAt',
  OptionBurnTimestamp = 'optionBurn__timestamp',
  OptionBurnTo = 'optionBurn__to',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  TickAt = 'tickAt',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  User = 'user',
  UserId = 'user__id'
}

/**  A leg of a TokenId, representing a single option.  */
export interface Leg {
  __typename?: 'Leg';
  /**  Asset of 0 token0, 1 for token1  */
  asset: Scalars['BigInt']['output'];
  /**  Chunk data  */
  chunk: Chunk;
  /**
   * Id is the tuple (asset, optionRatio, isLong, tokenType, riskPartner, strike, width) from LSB to MSB, in BigInt form, cast to a string
   * See TokenId entity for more details, or the source here: https://github.com/panoptic-labs/Panoptic/blob/b33788f414d3101448309212dd66654e63c6a31d/contracts/libraries/TokenId.sol#L29
   *
   */
  id: Scalars['ID']['output'];
  /**  Hex stringified leg ID  */
  idHexString: Scalars['String']['output'];
  /**  Index of the leg in the tokenId  */
  index: Scalars['Int']['output'];
  /**  Is it a long leg?  */
  isLong: Scalars['BigInt']['output'];
  /**  How many of this Leg exist  */
  legCount: Scalars['BigInt']['output'];
  /**  Number of contracts per leg  */
  optionRatio: Scalars['BigInt']['output'];
  /**  Pool position is within  */
  pool: Pool;
  /**  Risk partner  */
  riskPartner: Scalars['BigInt']['output'];
  /**  Strike  */
  strike: Scalars['BigInt']['output'];
  /**  TokenIds which this leg exists in  */
  tokenIds: Array<TokenId>;
  /**  Token type  */
  tokenType: Scalars['BigInt']['output'];
  /**  Width  */
  width: Scalars['BigInt']['output'];
}


/**  A leg of a TokenId, representing a single option.  */
export interface LegTokenIdsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenId_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TokenId_Filter>;
}

/**  Currently only for Panoptic TokenIds (not synthetic tokenIds created from uniswap positions), stores the liquidity underlying each instance of a leg. While multiple legs may exist with the same ID, each instance of a leg controls a fixed amount of liquidity when active. Can also think of these as the 'operators' of a given chunk. Don't directly own the liquidity (like PanopticPool) or manage it (like SFPM), but the account that owns this Leg has the right to instruct the manager on how to manage the underlying liquidity. The 'operator' wasn't added to Chunk IDs to avoid fragmentation of the entities - we would quickly reach the 1000 query limit otherwise. Maybe this will be removed in favor of a simple 'operator' field in Chunk in the future.  */
export interface LegLiquidities {
  __typename?: 'LegLiquidities';
  chunk: Chunk;
  /**  leg id + '#' + txnHash + '#' + logIndex  */
  id: Scalars['ID']['output'];
  leg: Leg;
  liquidity: Scalars['BigInt']['output'];
}

export interface LegLiquidities_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LegLiquidities_Filter>>>;
  chunk?: InputMaybe<Scalars['String']['input']>;
  chunk_?: InputMaybe<Chunk_Filter>;
  chunk_contains?: InputMaybe<Scalars['String']['input']>;
  chunk_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_ends_with?: InputMaybe<Scalars['String']['input']>;
  chunk_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_gt?: InputMaybe<Scalars['String']['input']>;
  chunk_gte?: InputMaybe<Scalars['String']['input']>;
  chunk_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chunk_lt?: InputMaybe<Scalars['String']['input']>;
  chunk_lte?: InputMaybe<Scalars['String']['input']>;
  chunk_not?: InputMaybe<Scalars['String']['input']>;
  chunk_not_contains?: InputMaybe<Scalars['String']['input']>;
  chunk_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  chunk_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chunk_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  chunk_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_starts_with?: InputMaybe<Scalars['String']['input']>;
  chunk_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  leg?: InputMaybe<Scalars['String']['input']>;
  leg_?: InputMaybe<Leg_Filter>;
  leg_contains?: InputMaybe<Scalars['String']['input']>;
  leg_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leg_ends_with?: InputMaybe<Scalars['String']['input']>;
  leg_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leg_gt?: InputMaybe<Scalars['String']['input']>;
  leg_gte?: InputMaybe<Scalars['String']['input']>;
  leg_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leg_lt?: InputMaybe<Scalars['String']['input']>;
  leg_lte?: InputMaybe<Scalars['String']['input']>;
  leg_not?: InputMaybe<Scalars['String']['input']>;
  leg_not_contains?: InputMaybe<Scalars['String']['input']>;
  leg_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leg_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leg_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leg_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leg_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leg_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leg_starts_with?: InputMaybe<Scalars['String']['input']>;
  leg_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<LegLiquidities_Filter>>>;
}

export enum LegLiquidities_OrderBy {
  Chunk = 'chunk',
  ChunkId = 'chunk__id',
  ChunkLongCounts = 'chunk__longCounts',
  ChunkLongLiquidity = 'chunk__longLiquidity',
  ChunkNetLiquidity = 'chunk__netLiquidity',
  ChunkShortCounts = 'chunk__shortCounts',
  ChunkShortLiquidity = 'chunk__shortLiquidity',
  ChunkStrike = 'chunk__strike',
  ChunkTickLower = 'chunk__tickLower',
  ChunkTickUpper = 'chunk__tickUpper',
  ChunkTokenType = 'chunk__tokenType',
  ChunkTotalLiquidity = 'chunk__totalLiquidity',
  ChunkWidth = 'chunk__width',
  Id = 'id',
  Leg = 'leg',
  LegAsset = 'leg__asset',
  LegId = 'leg__id',
  LegIdHexString = 'leg__idHexString',
  LegIndex = 'leg__index',
  LegIsLong = 'leg__isLong',
  LegLegCount = 'leg__legCount',
  LegOptionRatio = 'leg__optionRatio',
  LegRiskPartner = 'leg__riskPartner',
  LegStrike = 'leg__strike',
  LegTokenType = 'leg__tokenType',
  LegWidth = 'leg__width',
  Liquidity = 'liquidity'
}

export interface Leg_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Leg_Filter>>>;
  asset?: InputMaybe<Scalars['BigInt']['input']>;
  asset_gt?: InputMaybe<Scalars['BigInt']['input']>;
  asset_gte?: InputMaybe<Scalars['BigInt']['input']>;
  asset_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  asset_lt?: InputMaybe<Scalars['BigInt']['input']>;
  asset_lte?: InputMaybe<Scalars['BigInt']['input']>;
  asset_not?: InputMaybe<Scalars['BigInt']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chunk?: InputMaybe<Scalars['String']['input']>;
  chunk_?: InputMaybe<Chunk_Filter>;
  chunk_contains?: InputMaybe<Scalars['String']['input']>;
  chunk_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_ends_with?: InputMaybe<Scalars['String']['input']>;
  chunk_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_gt?: InputMaybe<Scalars['String']['input']>;
  chunk_gte?: InputMaybe<Scalars['String']['input']>;
  chunk_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chunk_lt?: InputMaybe<Scalars['String']['input']>;
  chunk_lte?: InputMaybe<Scalars['String']['input']>;
  chunk_not?: InputMaybe<Scalars['String']['input']>;
  chunk_not_contains?: InputMaybe<Scalars['String']['input']>;
  chunk_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  chunk_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chunk_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  chunk_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chunk_starts_with?: InputMaybe<Scalars['String']['input']>;
  chunk_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  idHexString?: InputMaybe<Scalars['String']['input']>;
  idHexString_contains?: InputMaybe<Scalars['String']['input']>;
  idHexString_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_ends_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_gt?: InputMaybe<Scalars['String']['input']>;
  idHexString_gte?: InputMaybe<Scalars['String']['input']>;
  idHexString_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idHexString_lt?: InputMaybe<Scalars['String']['input']>;
  idHexString_lte?: InputMaybe<Scalars['String']['input']>;
  idHexString_not?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_contains?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idHexString_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_starts_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  index?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isLong?: InputMaybe<Scalars['BigInt']['input']>;
  isLong_gt?: InputMaybe<Scalars['BigInt']['input']>;
  isLong_gte?: InputMaybe<Scalars['BigInt']['input']>;
  isLong_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  isLong_lt?: InputMaybe<Scalars['BigInt']['input']>;
  isLong_lte?: InputMaybe<Scalars['BigInt']['input']>;
  isLong_not?: InputMaybe<Scalars['BigInt']['input']>;
  isLong_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  legCount?: InputMaybe<Scalars['BigInt']['input']>;
  legCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  legCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  legCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  legCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  legCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  legCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  legCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  optionRatio?: InputMaybe<Scalars['BigInt']['input']>;
  optionRatio_gt?: InputMaybe<Scalars['BigInt']['input']>;
  optionRatio_gte?: InputMaybe<Scalars['BigInt']['input']>;
  optionRatio_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  optionRatio_lt?: InputMaybe<Scalars['BigInt']['input']>;
  optionRatio_lte?: InputMaybe<Scalars['BigInt']['input']>;
  optionRatio_not?: InputMaybe<Scalars['BigInt']['input']>;
  optionRatio_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Leg_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  riskPartner?: InputMaybe<Scalars['BigInt']['input']>;
  riskPartner_gt?: InputMaybe<Scalars['BigInt']['input']>;
  riskPartner_gte?: InputMaybe<Scalars['BigInt']['input']>;
  riskPartner_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  riskPartner_lt?: InputMaybe<Scalars['BigInt']['input']>;
  riskPartner_lte?: InputMaybe<Scalars['BigInt']['input']>;
  riskPartner_not?: InputMaybe<Scalars['BigInt']['input']>;
  riskPartner_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strike?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strike_lt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_lte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenIds_?: InputMaybe<TokenId_Filter>;
  tokenType?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  width?: InputMaybe<Scalars['BigInt']['input']>;
  width_gt?: InputMaybe<Scalars['BigInt']['input']>;
  width_gte?: InputMaybe<Scalars['BigInt']['input']>;
  width_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  width_lt?: InputMaybe<Scalars['BigInt']['input']>;
  width_lte?: InputMaybe<Scalars['BigInt']['input']>;
  width_not?: InputMaybe<Scalars['BigInt']['input']>;
  width_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum Leg_OrderBy {
  Asset = 'asset',
  Chunk = 'chunk',
  ChunkId = 'chunk__id',
  ChunkLongCounts = 'chunk__longCounts',
  ChunkLongLiquidity = 'chunk__longLiquidity',
  ChunkNetLiquidity = 'chunk__netLiquidity',
  ChunkShortCounts = 'chunk__shortCounts',
  ChunkShortLiquidity = 'chunk__shortLiquidity',
  ChunkStrike = 'chunk__strike',
  ChunkTickLower = 'chunk__tickLower',
  ChunkTickUpper = 'chunk__tickUpper',
  ChunkTokenType = 'chunk__tokenType',
  ChunkTotalLiquidity = 'chunk__totalLiquidity',
  ChunkWidth = 'chunk__width',
  Id = 'id',
  IdHexString = 'idHexString',
  Index = 'index',
  IsLong = 'isLong',
  LegCount = 'legCount',
  OptionRatio = 'optionRatio',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  RiskPartner = 'riskPartner',
  Strike = 'strike',
  TokenIds = 'tokenIds',
  TokenType = 'tokenType',
  Width = 'width'
}

/**  Uniswap liquidity mint  */
export interface Mint extends Event {
  __typename?: 'Mint';
  /**  Amount of liquidity minted  */
  amount: Scalars['BigInt']['output'];
  /**  Amount of token 0 minted  */
  amount0: Scalars['BigDecimal']['output'];
  /**  Amount of token 1 minted  */
  amount1: Scalars['BigDecimal']['output'];
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  Owner of position where liquidity minted to  */
  owner: Account;
  pool: Pool;
  /**  The address that minted the liquidity  */
  sender: Account;
  /**  Lower tick of the position  */
  tickLower: Scalars['Int']['output'];
  /**  Upper tick of the position  */
  tickUpper: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /**  Allow indexing by tokens  */
  token0: Token;
  /**  Allow indexing by tokens  */
  token1: Token;
}

export interface Mint_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount0?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Mint_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Mint_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_?: InputMaybe<Account_Filter>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickLower_lt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_lte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickUpper_lt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum Mint_OrderBy {
  Amount = 'amount',
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  Sender = 'sender',
  SenderId = 'sender__id',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  Timestamp = 'timestamp',
  To = 'to',
  Token0 = 'token0',
  Token0Decimals = 'token0__decimals',
  Token0DerivedEth = 'token0__derivedETH',
  Token0Id = 'token0__id',
  Token0Name = 'token0__name',
  Token0Symbol = 'token0__symbol',
  Token0TotalSupply = 'token0__totalSupply',
  Token0TxCount = 'token0__txCount',
  Token1 = 'token1',
  Token1Decimals = 'token1__decimals',
  Token1DerivedEth = 'token1__derivedETH',
  Token1Id = 'token1__id',
  Token1Name = 'token1__name',
  Token1Symbol = 'token1__symbol',
  Token1TotalSupply = 'token1__totalSupply',
  Token1TxCount = 'token1__txCount'
}

/**  Panoption burn / position close  */
export interface OptionBurn extends Event {
  __typename?: 'OptionBurn';
  /**  If this optionBurn was due to a PanopticPoolAccount being liquidated, this will be the ID of the related AccountLiquidated event.  */
  accountLiquidated?: Maybe<AccountLiquidated>;
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  /**  If this optionBurn was due to a position being exercised, this will be the ID of the related ForceExercise event.  */
  forcedExercise?: Maybe<ForcedExercise>;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  PanopticPool mint is within (from event.address)  */
  panopticPool: PanopticPool;
  pool: Pool;
  /**  The number of contracts burnt, expressed in terms of the asset  */
  positionSize: Scalars['BigInt']['output'];
  /**  The amount of premia collected  */
  premia: Scalars['BigInt']['output'];
  /**  Premium collected for token0  */
  premium0: Scalars['BigInt']['output'];
  /**  Premium collected for token1  */
  premium1: Scalars['BigInt']['output'];
  /**  User that burnt the option  */
  recipient: Account;
  /**  Tick at which the option was burned  */
  tickAt: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /**  TokenId of the burnt option  */
  tokenId: TokenId;
  /**  ID of the corresponding OptionMint  */
  txnOpened: OptionMint;
}

export interface OptionBurn_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accountLiquidated?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_?: InputMaybe<AccountLiquidated_Filter>;
  accountLiquidated_contains?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_ends_with?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_gt?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_gte?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accountLiquidated_lt?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_lte?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_not?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_not_contains?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accountLiquidated_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_starts_with?: InputMaybe<Scalars['String']['input']>;
  accountLiquidated_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<OptionBurn_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  forcedExercise?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_?: InputMaybe<ForcedExercise_Filter>;
  forcedExercise_contains?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_ends_with?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_gt?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_gte?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_in?: InputMaybe<Array<Scalars['String']['input']>>;
  forcedExercise_lt?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_lte?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_not?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_not_contains?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  forcedExercise_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_starts_with?: InputMaybe<Scalars['String']['input']>;
  forcedExercise_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<OptionBurn_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionSize?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premia?: InputMaybe<Scalars['BigInt']['input']>;
  premia_gt?: InputMaybe<Scalars['BigInt']['input']>;
  premia_gte?: InputMaybe<Scalars['BigInt']['input']>;
  premia_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premia_lt?: InputMaybe<Scalars['BigInt']['input']>;
  premia_lte?: InputMaybe<Scalars['BigInt']['input']>;
  premia_not?: InputMaybe<Scalars['BigInt']['input']>;
  premia_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium0?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_not?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium1?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_not?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  recipient_?: InputMaybe<Account_Filter>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickAt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickAt_lt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_lte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_?: InputMaybe<TokenId_Filter>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened?: InputMaybe<Scalars['String']['input']>;
  txnOpened_?: InputMaybe<OptionMint_Filter>;
  txnOpened_contains?: InputMaybe<Scalars['String']['input']>;
  txnOpened_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_ends_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_gt?: InputMaybe<Scalars['String']['input']>;
  txnOpened_gte?: InputMaybe<Scalars['String']['input']>;
  txnOpened_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txnOpened_lt?: InputMaybe<Scalars['String']['input']>;
  txnOpened_lte?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_contains?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txnOpened_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txnOpened_starts_with?: InputMaybe<Scalars['String']['input']>;
  txnOpened_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum OptionBurn_OrderBy {
  AccountLiquidated = 'accountLiquidated',
  AccountLiquidatedBlockNumber = 'accountLiquidated__blockNumber',
  AccountLiquidatedBonusAmounts = 'accountLiquidated__bonusAmounts',
  AccountLiquidatedEventType = 'accountLiquidated__eventType',
  AccountLiquidatedFrom = 'accountLiquidated__from',
  AccountLiquidatedGasPrice = 'accountLiquidated__gasPrice',
  AccountLiquidatedGasUsed = 'accountLiquidated__gasUsed',
  AccountLiquidatedHash = 'accountLiquidated__hash',
  AccountLiquidatedId = 'accountLiquidated__id',
  AccountLiquidatedLiquidationBonus0 = 'accountLiquidated__liquidationBonus0',
  AccountLiquidatedLiquidationBonus1 = 'accountLiquidated__liquidationBonus1',
  AccountLiquidatedLiquidationBonusUsd = 'accountLiquidated__liquidationBonusUSD',
  AccountLiquidatedLogIndex = 'accountLiquidated__logIndex',
  AccountLiquidatedTickAt = 'accountLiquidated__tickAt',
  AccountLiquidatedTimestamp = 'accountLiquidated__timestamp',
  AccountLiquidatedTo = 'accountLiquidated__to',
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  ForcedExercise = 'forcedExercise',
  ForcedExerciseBlockNumber = 'forcedExercise__blockNumber',
  ForcedExerciseEventType = 'forcedExercise__eventType',
  ForcedExerciseExerciseFee = 'forcedExercise__exerciseFee',
  ForcedExerciseExerciseFee0 = 'forcedExercise__exerciseFee0',
  ForcedExerciseExerciseFee1 = 'forcedExercise__exerciseFee1',
  ForcedExerciseExerciseFeeUsd = 'forcedExercise__exerciseFeeUSD',
  ForcedExerciseFrom = 'forcedExercise__from',
  ForcedExerciseGasPrice = 'forcedExercise__gasPrice',
  ForcedExerciseGasUsed = 'forcedExercise__gasUsed',
  ForcedExerciseHash = 'forcedExercise__hash',
  ForcedExerciseId = 'forcedExercise__id',
  ForcedExerciseLogIndex = 'forcedExercise__logIndex',
  ForcedExerciseTickAt = 'forcedExercise__tickAt',
  ForcedExerciseTimestamp = 'forcedExercise__timestamp',
  ForcedExerciseTo = 'forcedExercise__to',
  ForcedExerciseTokenId = 'forcedExercise__tokenId',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  PositionSize = 'positionSize',
  Premia = 'premia',
  Premium0 = 'premium0',
  Premium1 = 'premium1',
  Recipient = 'recipient',
  RecipientId = 'recipient__id',
  TickAt = 'tickAt',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  TokenIdId = 'tokenId__id',
  TokenIdIdHexString = 'tokenId__idHexString',
  TokenIdTokenCount = 'tokenId__tokenCount',
  TxnOpened = 'txnOpened',
  TxnOpenedBlockNumber = 'txnOpened__blockNumber',
  TxnOpenedCommissions0 = 'txnOpened__commissions0',
  TxnOpenedCommissions1 = 'txnOpened__commissions1',
  TxnOpenedEventType = 'txnOpened__eventType',
  TxnOpenedFrom = 'txnOpened__from',
  TxnOpenedGasPrice = 'txnOpened__gasPrice',
  TxnOpenedGasUsed = 'txnOpened__gasUsed',
  TxnOpenedHash = 'txnOpened__hash',
  TxnOpenedId = 'txnOpened__id',
  TxnOpenedLogIndex = 'txnOpened__logIndex',
  TxnOpenedPoolUtilization0 = 'txnOpened__poolUtilization0',
  TxnOpenedPoolUtilization1 = 'txnOpened__poolUtilization1',
  TxnOpenedPoolUtilizations = 'txnOpened__poolUtilizations',
  TxnOpenedPositionSize = 'txnOpened__positionSize',
  TxnOpenedTickAt = 'txnOpened__tickAt',
  TxnOpenedTimestamp = 'txnOpened__timestamp',
  TxnOpenedTo = 'txnOpened__to'
}

/**  Panoption mint / position open  */
export interface OptionMint extends Event {
  __typename?: 'OptionMint';
  blockNumber: Scalars['BigInt']['output'];
  /**  Token0 commissions paid to mint this option  */
  commissions0: Scalars['BigDecimal']['output'];
  /**  Token1 commissions paid to mint this option  */
  commissions1: Scalars['BigDecimal']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  PanopticPool mint is within (from event.address)  */
  panopticPool: PanopticPool;
  pool: Pool;
  /**  Pool utilization token0  */
  poolUtilization0: Scalars['BigInt']['output'];
  /**  Pool utilization token1  */
  poolUtilization1: Scalars['BigInt']['output'];
  /**  Packing of the pool utilization (how much funds are in the Panoptic pool versus the AMM pool) at the time of minting. Right 64bits for token0 and left 64bits for token1, defined as (inAMM / totalBalance) * 10_000  */
  poolUtilizations: Scalars['BigInt']['output'];
  /**  The number of contracts minted, expressed in terms of the asset  */
  positionSize: Scalars['BigInt']['output'];
  /**  User that minted the option  */
  recipient: Account;
  /**  Tick at which the option was minted  */
  tickAt: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /**  TokenId of the created option  */
  tokenId: TokenId;
}

export interface OptionMint_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OptionMint_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commissions0?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<OptionMint_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  poolUtilization0?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization1?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilizations?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilizations_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionSize?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  recipient_?: InputMaybe<Account_Filter>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickAt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_gte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickAt_lt?: InputMaybe<Scalars['Int']['input']>;
  tickAt_lte?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not?: InputMaybe<Scalars['Int']['input']>;
  tickAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_?: InputMaybe<TokenId_Filter>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum OptionMint_OrderBy {
  BlockNumber = 'blockNumber',
  Commissions0 = 'commissions0',
  Commissions1 = 'commissions1',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  Pool = 'pool',
  PoolUtilization0 = 'poolUtilization0',
  PoolUtilization1 = 'poolUtilization1',
  PoolUtilizations = 'poolUtilizations',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  PositionSize = 'positionSize',
  Recipient = 'recipient',
  RecipientId = 'recipient__id',
  TickAt = 'tickAt',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  TokenIdId = 'tokenId__id',
  TokenIdIdHexString = 'tokenId__idHexString',
  TokenIdTokenCount = 'tokenId__tokenCount'
}

export interface OptionRoll extends Event {
  __typename?: 'OptionRoll';
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  TokenId of the minted option  */
  newTokenId: Scalars['BigInt']['output'];
  /**  TokenId of the burnt option  */
  oldTokenId: Scalars['BigInt']['output'];
  /**  PanopticPool roll is within (from event.address)  */
  panopticPool: PanopticPool;
  pool: Pool;
  /**  Pool utilization token0  */
  poolUtilization0: Scalars['BigInt']['output'];
  /**  Pool utilization token1  */
  poolUtilization1: Scalars['BigInt']['output'];
  /**  Packing of the pool utilization (how much funds are in the Panoptic pool versus the AMM pool) at the time of minting. Right 64bits for token0 and left 64bits for token1, defined as (inAMM / totalBalance) * 10_000  */
  poolUtilizations: Scalars['BigInt']['output'];
  /**  The number of contracts burnt, expressed in terms of the asset  */
  positionSize: Scalars['BigInt']['output'];
  /**  LeftRight packing for the amount of premia collected for token0 and token1  */
  premia: Scalars['BigInt']['output'];
  /**  Premium collected for token0  */
  premium0: Scalars['BigInt']['output'];
  /**  Premium collected for token1  */
  premium1: Scalars['BigInt']['output'];
  /**  User that burnt the option  */
  recipient: Account;
  /**  Tick at which the option was rolled  */
  tickAtRoll: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
}

export interface OptionRoll_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OptionRoll_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newTokenId?: InputMaybe<Scalars['BigInt']['input']>;
  newTokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newTokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newTokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newTokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newTokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newTokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  newTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldTokenId?: InputMaybe<Scalars['BigInt']['input']>;
  oldTokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  oldTokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  oldTokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldTokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  oldTokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  oldTokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  oldTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<OptionRoll_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  poolUtilization0?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization1?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilization1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilization1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilizations?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolUtilizations_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolUtilizations_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionSize?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premia?: InputMaybe<Scalars['BigInt']['input']>;
  premia_gt?: InputMaybe<Scalars['BigInt']['input']>;
  premia_gte?: InputMaybe<Scalars['BigInt']['input']>;
  premia_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premia_lt?: InputMaybe<Scalars['BigInt']['input']>;
  premia_lte?: InputMaybe<Scalars['BigInt']['input']>;
  premia_not?: InputMaybe<Scalars['BigInt']['input']>;
  premia_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium0?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_not?: InputMaybe<Scalars['BigInt']['input']>;
  premium0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium1?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  premium1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_not?: InputMaybe<Scalars['BigInt']['input']>;
  premium1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  recipient_?: InputMaybe<Account_Filter>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tickAtRoll?: InputMaybe<Scalars['Int']['input']>;
  tickAtRoll_gt?: InputMaybe<Scalars['Int']['input']>;
  tickAtRoll_gte?: InputMaybe<Scalars['Int']['input']>;
  tickAtRoll_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tickAtRoll_lt?: InputMaybe<Scalars['Int']['input']>;
  tickAtRoll_lte?: InputMaybe<Scalars['Int']['input']>;
  tickAtRoll_not?: InputMaybe<Scalars['Int']['input']>;
  tickAtRoll_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum OptionRoll_OrderBy {
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  NewTokenId = 'newTokenId',
  OldTokenId = 'oldTokenId',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  Pool = 'pool',
  PoolUtilization0 = 'poolUtilization0',
  PoolUtilization1 = 'poolUtilization1',
  PoolUtilizations = 'poolUtilizations',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  PositionSize = 'positionSize',
  Premia = 'premia',
  Premium0 = 'premium0',
  Premium1 = 'premium1',
  Recipient = 'recipient',
  RecipientId = 'recipient__id',
  TickAtRoll = 'tickAtRoll',
  Timestamp = 'timestamp',
  To = 'to'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

/**  Panoptic Factory (deployer of PanopticPools).  */
export interface PanopticFactory {
  __typename?: 'PanopticFactory';
  /**  Factory address  */
  id: Scalars['ID']['output'];
  /**  Current owner of the factory  */
  owner: Scalars['ID']['output'];
  /**  Amount of pools created  */
  poolCount: Scalars['BigInt']['output'];
}

export interface PanopticFactory_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PanopticFactory_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PanopticFactory_Filter>>>;
  owner?: InputMaybe<Scalars['ID']['input']>;
  owner_gt?: InputMaybe<Scalars['ID']['input']>;
  owner_gte?: InputMaybe<Scalars['ID']['input']>;
  owner_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  owner_lt?: InputMaybe<Scalars['ID']['input']>;
  owner_lte?: InputMaybe<Scalars['ID']['input']>;
  owner_not?: InputMaybe<Scalars['ID']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  poolCount?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum PanopticFactory_OrderBy {
  Id = 'id',
  Owner = 'owner',
  PoolCount = 'poolCount'
}

/**  A pool deployed on top of an existing Uniswap Pool to facilitate perpetual options trading.  */
export interface PanopticPool {
  __typename?: 'PanopticPool';
  /**  Token0 moved for OptionBurns.  */
  burnVolume0: Scalars['BigDecimal']['output'];
  /**  Token0 moved for OptionBurns in USD.  */
  burnVolume0USD: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionBurns.  */
  burnVolume1: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionBurns in USD.  */
  burnVolume1USD: Scalars['BigDecimal']['output'];
  /**  Link to all chunks of liquidity managed by this PanopticPool.  */
  chunks: Array<Chunk>;
  /**  Vault for token 0 collateral  */
  collateral0: Collateral;
  /**  Vault for token 1 collateral  */
  collateral1: Collateral;
  /**  All time commissions earned from Collateral0. Commissions increase with every OptionMint and collateral deposit. They may decrease in case of protocol loss, which gets realized as part of a liquidation.  */
  commissions0: Scalars['BigDecimal']['output'];
  /**  All time token0 commissions converted to USD (calculated using token0's derivedETH and the bundle.ethPriceUSD values).  */
  commissions0USD: Scalars['BigDecimal']['output'];
  /**  All time commissions earned from Collateral1.  */
  commissions1: Scalars['BigDecimal']['output'];
  /**  All time token1 commissions converted to USD.  */
  commissions1USD: Scalars['BigDecimal']['output'];
  /**  All time commissions for both tokens converted to USD.  */
  commissionsUSD: Scalars['BigDecimal']['output'];
  /**  Fee amount  */
  feeTier: Scalars['BigInt']['output'];
  /**  Pool address  */
  id: Scalars['ID']['output'];
  /**  Token0 moved for OptionMints.  */
  mintVolume0: Scalars['BigDecimal']['output'];
  /**  Token0 moved for OptionMints in USD.  */
  mintVolume0USD: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionMints.  */
  mintVolume1: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionMints in USD.  */
  mintVolume1USD: Scalars['BigDecimal']['output'];
  /**  Link to all PanopticPoolAccounts for this PanopticPool.  */
  panopticPoolAccounts: Array<PanopticPoolAccount>;
  /**  All time protocol loss in token0. Protocol loss is the value of shares added to the supply in the event of liquidation of bad debt.  */
  protocolLoss0: Scalars['BigDecimal']['output'];
  /**  All time protocol loss in token0 converted to USD (calculated using token0's derivedETH and the bundle.ethPriceUSD values).  */
  protocolLoss0USD: Scalars['BigDecimal']['output'];
  /**  All time protocol loss in token1. */
  protocolLoss1: Scalars['BigDecimal']['output'];
  /**  All time protocol loss in token1 converted to USD.  */
  protocolLoss1USD: Scalars['BigDecimal']['output'];
  /**  All time protocol loss in both tokens converted to USD.  */
  protocolLossUSD: Scalars['BigDecimal']['output'];
  /**  Token0  */
  token0: Token;
  /**  Token1  */
  token1: Token;
  /**  Sum of OptionMint and OptionBurn token0 volume.  */
  totalVolume0: Scalars['BigDecimal']['output'];
  /**  Sum of OptionMint and OptionBurn token0 volume in USD.  */
  totalVolume0USD: Scalars['BigDecimal']['output'];
  /**  Sum of OptionMint and OptionBurn token1 volume in USD.  */
  totalVolume1: Scalars['BigDecimal']['output'];
  /**  Sum of OptionMint and OptionBurn token1 volume in USD.  */
  totalVolume1USD: Scalars['BigDecimal']['output'];
  /**  Total transaction count  */
  txCount: Scalars['BigInt']['output'];
  /**  Underlying pool  */
  underlyingPool: Pool;
}


/**  A pool deployed on top of an existing Uniswap Pool to facilitate perpetual options trading.  */
export interface PanopticPoolChunksArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Chunk_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Chunk_Filter>;
}


/**  A pool deployed on top of an existing Uniswap Pool to facilitate perpetual options trading.  */
export interface PanopticPoolPanopticPoolAccountsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPoolAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PanopticPoolAccount_Filter>;
}

/**  Tracks Panoption & PLP activity (collateral withdrawals and deposits) for a given Account & PanopticPool the Account has interacted with.  */
export interface PanopticPoolAccount {
  __typename?: 'PanopticPoolAccount';
  /**  Account address  */
  account: Account;
  /**  TokenId balances that this PanopticPoolAccount is responsible for  */
  accountBalances: Array<AccountBalance>;
  /**  Collateral contract for Token0  */
  collateral0: Collateral;
  /**  Number of Collateral0 assets this PanopticPoolAccount controls  */
  collateral0Assets: Scalars['BigInt']['output'];
  /**  Number of Collateral0 shares this PanopticPoolAccount controls  */
  collateral0Shares: Scalars['BigInt']['output'];
  /**  Collateral contract for Token1  */
  collateral1: Collateral;
  /**  Number of Collateral1 assets this PanopticPoolAccount controls  */
  collateral1Assets: Scalars['BigInt']['output'];
  /**  Number of Collateral1 shares this PanopticPoolAccount controls  */
  collateral1Shares: Scalars['BigInt']['output'];
  /**  All time commissions paid to PLPs in Collateral0. Commissions increase with every OptionMint and collateral deposit.  */
  commissions0: Scalars['BigDecimal']['output'];
  /**  All time commissions paid to PLPs in Collateral1.  */
  commissions1: Scalars['BigDecimal']['output'];
  /**  Commissions earned in token0 since this account's last share transfer event (shares get transferred when depositing or withdrawing collateral, burning or minting an option, or directly sending share tokens).  */
  commissionsSinceLastTransfer0: Scalars['BigDecimal']['output'];
  /**  Same as `commissionsSinceLastTransfer`, but in token1.  */
  commissionsSinceLastTransfer1: Scalars['BigDecimal']['output'];
  /**  Address of account + '#' + address of panoptic pool  */
  id: Scalars['ID']['output'];
  /**  Whether or not the user has been liquidated for this pool & not opened new positions (1 if true)  */
  isLiquidated: Scalars['Int']['output'];
  /**  Panoptic pool address  */
  panopticPool: PanopticPool;
  /**  Collateral0 share price at time of last transfer (an internal bookeeping mechanism to keep track of total commissions this account has earned as a PLP).  */
  sharePriceAtLastTransfer0: Scalars['BigDecimal']['output'];
  /**  See sharePriceAtLastTransfer0.  */
  sharePriceAtLastTransfer1: Scalars['BigDecimal']['output'];
}


/**  Tracks Panoption & PLP activity (collateral withdrawals and deposits) for a given Account & PanopticPool the Account has interacted with.  */
export interface PanopticPoolAccountAccountBalancesArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountBalance_Filter>;
}

export interface PanopticPoolAccount_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountBalances_?: InputMaybe<AccountBalance_Filter>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<PanopticPoolAccount_Filter>>>;
  collateral0?: InputMaybe<Scalars['String']['input']>;
  collateral0Assets?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Assets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Assets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Assets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral0Assets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Assets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Assets_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Assets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral0Shares?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Shares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Shares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Shares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral0Shares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Shares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Shares_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateral0Shares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral0_?: InputMaybe<Collateral_Filter>;
  collateral0_contains?: InputMaybe<Scalars['String']['input']>;
  collateral0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_gt?: InputMaybe<Scalars['String']['input']>;
  collateral0_gte?: InputMaybe<Scalars['String']['input']>;
  collateral0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral0_lt?: InputMaybe<Scalars['String']['input']>;
  collateral0_lte?: InputMaybe<Scalars['String']['input']>;
  collateral0_not?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1?: InputMaybe<Scalars['String']['input']>;
  collateral1Assets?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Assets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Assets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Assets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral1Assets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Assets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Assets_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Assets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral1Shares?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Shares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Shares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Shares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral1Shares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Shares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Shares_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateral1Shares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateral1_?: InputMaybe<Collateral_Filter>;
  collateral1_contains?: InputMaybe<Scalars['String']['input']>;
  collateral1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_gt?: InputMaybe<Scalars['String']['input']>;
  collateral1_gte?: InputMaybe<Scalars['String']['input']>;
  collateral1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral1_lt?: InputMaybe<Scalars['String']['input']>;
  collateral1_lte?: InputMaybe<Scalars['String']['input']>;
  collateral1_not?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commissions0?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsSinceLastTransfer0?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsSinceLastTransfer0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsSinceLastTransfer1?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsSinceLastTransfer1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsSinceLastTransfer1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  isLiquidated?: InputMaybe<Scalars['Int']['input']>;
  isLiquidated_gt?: InputMaybe<Scalars['Int']['input']>;
  isLiquidated_gte?: InputMaybe<Scalars['Int']['input']>;
  isLiquidated_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isLiquidated_lt?: InputMaybe<Scalars['Int']['input']>;
  isLiquidated_lte?: InputMaybe<Scalars['Int']['input']>;
  isLiquidated_not?: InputMaybe<Scalars['Int']['input']>;
  isLiquidated_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PanopticPoolAccount_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sharePriceAtLastTransfer0?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  sharePriceAtLastTransfer0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  sharePriceAtLastTransfer1?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  sharePriceAtLastTransfer1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  sharePriceAtLastTransfer1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
}

export enum PanopticPoolAccount_OrderBy {
  Account = 'account',
  AccountBalances = 'accountBalances',
  AccountId = 'account__id',
  Collateral0 = 'collateral0',
  Collateral0Assets = 'collateral0Assets',
  Collateral0Shares = 'collateral0Shares',
  Collateral0Id = 'collateral0__id',
  Collateral0InAmm = 'collateral0__inAMM',
  Collateral0Index = 'collateral0__index',
  Collateral0PoolAssets = 'collateral0__poolAssets',
  Collateral0PoolUtilization = 'collateral0__poolUtilization',
  Collateral0PreLiquidationSharePrice = 'collateral0__preLiquidationSharePrice',
  Collateral0PreviousSharePrice = 'collateral0__previousSharePrice',
  Collateral0TotalAssets = 'collateral0__totalAssets',
  Collateral0TotalShares = 'collateral0__totalShares',
  Collateral1 = 'collateral1',
  Collateral1Assets = 'collateral1Assets',
  Collateral1Shares = 'collateral1Shares',
  Collateral1Id = 'collateral1__id',
  Collateral1InAmm = 'collateral1__inAMM',
  Collateral1Index = 'collateral1__index',
  Collateral1PoolAssets = 'collateral1__poolAssets',
  Collateral1PoolUtilization = 'collateral1__poolUtilization',
  Collateral1PreLiquidationSharePrice = 'collateral1__preLiquidationSharePrice',
  Collateral1PreviousSharePrice = 'collateral1__previousSharePrice',
  Collateral1TotalAssets = 'collateral1__totalAssets',
  Collateral1TotalShares = 'collateral1__totalShares',
  Commissions0 = 'commissions0',
  Commissions1 = 'commissions1',
  CommissionsSinceLastTransfer0 = 'commissionsSinceLastTransfer0',
  CommissionsSinceLastTransfer1 = 'commissionsSinceLastTransfer1',
  Id = 'id',
  IsLiquidated = 'isLiquidated',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  SharePriceAtLastTransfer0 = 'sharePriceAtLastTransfer0',
  SharePriceAtLastTransfer1 = 'sharePriceAtLastTransfer1'
}

/**  Data accumulated and condensed into day stats for each PanopticPool. If no PanopticPool events are emitted on a given day, there will be a missing PanopticPoolDayData for that day. Updated at the end of every Panoptic Pool event handler to guarantee the inclusion of volume updates from SFPM event handling (because SFPM events get emitted and handled before the option events).  */
export interface PanopticPoolDayData {
  __typename?: 'PanopticPoolDayData';
  /**  Token0 moved for OptionBurns.  */
  burnVolume0: Scalars['BigDecimal']['output'];
  /**  Token0 moved for OptionBurns in USD.  */
  burnVolume0USD: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionBurns.  */
  burnVolume1: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionBurns in USD.  */
  burnVolume1USD: Scalars['BigDecimal']['output'];
  /**  All time commissions earned from Collateral0. Commissions increase with every OptionMint and collateral deposit. They may decrease in case of protocol loss, which gets realized as part of a liquidation.  */
  commissions0: Scalars['BigDecimal']['output'];
  /**  All time token0 commissions converted to USD (calculated using token0's derivedETH and the bundle.ethPriceUSD values).  */
  commissions0USD: Scalars['BigDecimal']['output'];
  /**  All time commissions earned from Collateral1.  */
  commissions1: Scalars['BigDecimal']['output'];
  /**  All time token1 commissions converted to USD.  */
  commissions1USD: Scalars['BigDecimal']['output'];
  /**  All time commissions for both tokens converted to USD.  */
  commissionsUSD: Scalars['BigDecimal']['output'];
  /**  Timestamp rounded to current day by dividing by 86400  */
  date: Scalars['Int']['output'];
  /**  Timestamp rounded to current day combined with panoptic pool id  */
  id: Scalars['ID']['output'];
  /**  Token0 moved for OptionMints.  */
  mintVolume0: Scalars['BigDecimal']['output'];
  /**  Token0 moved for OptionMints in USD.  */
  mintVolume0USD: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionMints.  */
  mintVolume1: Scalars['BigDecimal']['output'];
  /**  Token1 moved for OptionMints in USD.  */
  mintVolume1USD: Scalars['BigDecimal']['output'];
  /**  Pointer to Panoptic Pool  */
  panopticPool: PanopticPool;
  /**  Sum of OptionMint and OptionBurn token0 volume.  */
  totalVolume0: Scalars['BigDecimal']['output'];
  /**  Sum of OptionMint and OptionBurn token0 volume in USD.  */
  totalVolume0USD: Scalars['BigDecimal']['output'];
  /**  Sum of OptionMint and OptionBurn token1 volume in USD.  */
  totalVolume1: Scalars['BigDecimal']['output'];
  /**  Sum of OptionMint and OptionBurn token1 volume in USD.  */
  totalVolume1USD: Scalars['BigDecimal']['output'];
}

export interface PanopticPoolDayData_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PanopticPoolDayData_Filter>>>;
  burnVolume0?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mintVolume0?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PanopticPoolDayData_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalVolume0?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
}

export enum PanopticPoolDayData_OrderBy {
  BurnVolume0 = 'burnVolume0',
  BurnVolume0Usd = 'burnVolume0USD',
  BurnVolume1 = 'burnVolume1',
  BurnVolume1Usd = 'burnVolume1USD',
  Commissions0 = 'commissions0',
  Commissions0Usd = 'commissions0USD',
  Commissions1 = 'commissions1',
  Commissions1Usd = 'commissions1USD',
  CommissionsUsd = 'commissionsUSD',
  Date = 'date',
  Id = 'id',
  MintVolume0 = 'mintVolume0',
  MintVolume0Usd = 'mintVolume0USD',
  MintVolume1 = 'mintVolume1',
  MintVolume1Usd = 'mintVolume1USD',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  TotalVolume0 = 'totalVolume0',
  TotalVolume0Usd = 'totalVolume0USD',
  TotalVolume1 = 'totalVolume1',
  TotalVolume1Usd = 'totalVolume1USD'
}

export interface PanopticPool_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PanopticPool_Filter>>>;
  burnVolume0?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  burnVolume1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  burnVolume1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  chunks_?: InputMaybe<Chunk_Filter>;
  collateral0?: InputMaybe<Scalars['String']['input']>;
  collateral0_?: InputMaybe<Collateral_Filter>;
  collateral0_contains?: InputMaybe<Scalars['String']['input']>;
  collateral0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_gt?: InputMaybe<Scalars['String']['input']>;
  collateral0_gte?: InputMaybe<Scalars['String']['input']>;
  collateral0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral0_lt?: InputMaybe<Scalars['String']['input']>;
  collateral0_lte?: InputMaybe<Scalars['String']['input']>;
  collateral0_not?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral0_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1?: InputMaybe<Scalars['String']['input']>;
  collateral1_?: InputMaybe<Collateral_Filter>;
  collateral1_contains?: InputMaybe<Scalars['String']['input']>;
  collateral1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_gt?: InputMaybe<Scalars['String']['input']>;
  collateral1_gte?: InputMaybe<Scalars['String']['input']>;
  collateral1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral1_lt?: InputMaybe<Scalars['String']['input']>;
  collateral1_lte?: InputMaybe<Scalars['String']['input']>;
  collateral1_not?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateral1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateral1_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateral1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commissions0?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissions1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissions1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  commissionsUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  commissionsUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feeTier?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeTier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mintVolume0?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  mintVolume1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  mintVolume1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PanopticPool_Filter>>>;
  panopticPoolAccounts_?: InputMaybe<PanopticPoolAccount_Filter>;
  protocolLoss0?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLoss0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLoss0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLoss0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLoss1?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLoss1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLoss1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLoss1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLoss1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLossUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLossUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLossUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLossUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolLossUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLossUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLossUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolLossUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalVolume0?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume0USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1USD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1USD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolume1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolume1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  underlyingPool?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_?: InputMaybe<Pool_Filter>;
  underlyingPool_contains?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_gt?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_gte?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  underlyingPool_lt?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_lte?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_not?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  underlyingPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  underlyingPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum PanopticPool_OrderBy {
  BurnVolume0 = 'burnVolume0',
  BurnVolume0Usd = 'burnVolume0USD',
  BurnVolume1 = 'burnVolume1',
  BurnVolume1Usd = 'burnVolume1USD',
  Chunks = 'chunks',
  Collateral0 = 'collateral0',
  Collateral0Id = 'collateral0__id',
  Collateral0InAmm = 'collateral0__inAMM',
  Collateral0Index = 'collateral0__index',
  Collateral0PoolAssets = 'collateral0__poolAssets',
  Collateral0PoolUtilization = 'collateral0__poolUtilization',
  Collateral0PreLiquidationSharePrice = 'collateral0__preLiquidationSharePrice',
  Collateral0PreviousSharePrice = 'collateral0__previousSharePrice',
  Collateral0TotalAssets = 'collateral0__totalAssets',
  Collateral0TotalShares = 'collateral0__totalShares',
  Collateral1 = 'collateral1',
  Collateral1Id = 'collateral1__id',
  Collateral1InAmm = 'collateral1__inAMM',
  Collateral1Index = 'collateral1__index',
  Collateral1PoolAssets = 'collateral1__poolAssets',
  Collateral1PoolUtilization = 'collateral1__poolUtilization',
  Collateral1PreLiquidationSharePrice = 'collateral1__preLiquidationSharePrice',
  Collateral1PreviousSharePrice = 'collateral1__previousSharePrice',
  Collateral1TotalAssets = 'collateral1__totalAssets',
  Collateral1TotalShares = 'collateral1__totalShares',
  Commissions0 = 'commissions0',
  Commissions0Usd = 'commissions0USD',
  Commissions1 = 'commissions1',
  Commissions1Usd = 'commissions1USD',
  CommissionsUsd = 'commissionsUSD',
  FeeTier = 'feeTier',
  Id = 'id',
  MintVolume0 = 'mintVolume0',
  MintVolume0Usd = 'mintVolume0USD',
  MintVolume1 = 'mintVolume1',
  MintVolume1Usd = 'mintVolume1USD',
  PanopticPoolAccounts = 'panopticPoolAccounts',
  ProtocolLoss0 = 'protocolLoss0',
  ProtocolLoss0Usd = 'protocolLoss0USD',
  ProtocolLoss1 = 'protocolLoss1',
  ProtocolLoss1Usd = 'protocolLoss1USD',
  ProtocolLossUsd = 'protocolLossUSD',
  Token0 = 'token0',
  Token0Decimals = 'token0__decimals',
  Token0DerivedEth = 'token0__derivedETH',
  Token0Id = 'token0__id',
  Token0Name = 'token0__name',
  Token0Symbol = 'token0__symbol',
  Token0TotalSupply = 'token0__totalSupply',
  Token0TxCount = 'token0__txCount',
  Token1 = 'token1',
  Token1Decimals = 'token1__decimals',
  Token1DerivedEth = 'token1__derivedETH',
  Token1Id = 'token1__id',
  Token1Name = 'token1__name',
  Token1Symbol = 'token1__symbol',
  Token1TotalSupply = 'token1__totalSupply',
  Token1TxCount = 'token1__txCount',
  TotalVolume0 = 'totalVolume0',
  TotalVolume0Usd = 'totalVolume0USD',
  TotalVolume1 = 'totalVolume1',
  TotalVolume1Usd = 'totalVolume1USD',
  TxCount = 'txCount',
  UnderlyingPool = 'underlyingPool',
  UnderlyingPoolFeeTier = 'underlyingPool__feeTier',
  UnderlyingPoolId = 'underlyingPool__id',
  UnderlyingPoolLiquidity = 'underlyingPool__liquidity',
  UnderlyingPoolPoolId = 'underlyingPool__poolId',
  UnderlyingPoolSqrtPrice = 'underlyingPool__sqrtPrice',
  UnderlyingPoolTick = 'underlyingPool__tick',
  UnderlyingPoolTickLastUpdateBlockNumber = 'underlyingPool__tickLastUpdateBlockNumber',
  UnderlyingPoolTickLastUpdateTimestamp = 'underlyingPool__tickLastUpdateTimestamp',
  UnderlyingPoolTickSpacing = 'underlyingPool__tickSpacing',
  UnderlyingPoolToken0Price = 'underlyingPool__token0Price',
  UnderlyingPoolToken1Price = 'underlyingPool__token1Price',
  UnderlyingPoolTotalValueLockedEth = 'underlyingPool__totalValueLockedETH',
  UnderlyingPoolTotalValueLockedToken0 = 'underlyingPool__totalValueLockedToken0',
  UnderlyingPoolTotalValueLockedToken1 = 'underlyingPool__totalValueLockedToken1',
  UnderlyingPoolTotalValueLockedUsd = 'underlyingPool__totalValueLockedUSD',
  UnderlyingPoolTxCount = 'underlyingPool__txCount'
}

/**  Underlying pool (e.g. Uniswap V3 Pool)  */
export interface Pool {
  __typename?: 'Pool';
  /**  Fee amount  */
  feeTier: Scalars['BigInt']['output'];
  /**  Pool address  */
  id: Scalars['ID']['output'];
  /**  In range liquidity  */
  liquidity: Scalars['BigInt']['output'];
  /**  Associated PanopticPool. Null if not created yet  */
  panopticPool?: Maybe<PanopticPool>;
  /**  Snapshots of PoolDayData  */
  poolDayData: Array<PoolDayData>;
  /**  Snapshots of PoolHourData  */
  poolHourData: Array<PoolHourData>;
  /**  Panoptic identifier of uniswap pool  */
  poolId?: Maybe<Scalars['String']['output']>;
  /**  Current price tracker  */
  sqrtPrice: Scalars['BigInt']['output'];
  /**  Current tick. May be null if pool has not been initialized.  */
  tick?: Maybe<Scalars['BigInt']['output']>;
  /**  Block number of the last time this tick was updated  */
  tickLastUpdateBlockNumber: Scalars['BigInt']['output'];
  /**  Timestamp of the last time this tick was updated  */
  tickLastUpdateTimestamp: Scalars['BigInt']['output'];
  /**  Min space between ticks  */
  tickSpacing: Scalars['BigInt']['output'];
  /**  Token0  */
  token0: Token;
  /**  token0 per token1  */
  token0Price: Scalars['BigDecimal']['output'];
  /**  Token1  */
  token1: Token;
  /**  Token1 per token0  */
  token1Price: Scalars['BigDecimal']['output'];
  /**  Tvl derived ETH (necessary for tvlUSD using uni's implementation)  */
  totalValueLockedETH: Scalars['BigDecimal']['output'];
  /**  Total token 0 across all ticks  */
  totalValueLockedToken0: Scalars['BigDecimal']['output'];
  /**  Total token 1 across all ticks  */
  totalValueLockedToken1: Scalars['BigDecimal']['output'];
  /**  Tvl USD  */
  totalValueLockedUSD: Scalars['BigDecimal']['output'];
  /**  Total transaction count  */
  txCount: Scalars['BigInt']['output'];
}


/**  Underlying pool (e.g. Uniswap V3 Pool)  */
export interface PoolPoolDayDataArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PoolDayData_Filter>;
}


/**  Underlying pool (e.g. Uniswap V3 Pool)  */
export interface PoolPoolHourDataArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PoolHourData_Filter>;
}

/**  Data accumulated and condensed into day stats for each pool. If no Pool events are emitted on a given day, there will be a missing PoolDayData for that day.  */
export interface PoolDayData {
  __typename?: 'PoolDayData';
  /**  Close price of token0  */
  close: Scalars['BigDecimal']['output'];
  /**  Timestamp rounded to current day by dividing by 86400  */
  date: Scalars['Int']['output'];
  /**  Fees in USD  */
  feesUSD: Scalars['BigDecimal']['output'];
  /**  High price of token0  */
  high: Scalars['BigDecimal']['output'];
  /**  Timestamp rounded to current day combined with pool id  */
  id: Scalars['ID']['output'];
  /**  In range liquidity at end of period  */
  liquidity: Scalars['BigInt']['output'];
  /**  Low price of token0  */
  low: Scalars['BigDecimal']['output'];
  /**  Opening price of token0  */
  open: Scalars['BigDecimal']['output'];
  /**  Pointer to Pool  */
  pool: Pool;
  /**  Price of token0 - derived from sqrtPrice  */
  token0Price: Scalars['BigDecimal']['output'];
  /**  Price of token1 - derived from sqrtPrice  */
  token1Price: Scalars['BigDecimal']['output'];
  /**  Number of transactions during period  */
  txCount: Scalars['BigInt']['output'];
  /**  Volume in token0  */
  volumeToken0: Scalars['BigDecimal']['output'];
  /**  Volume in token1  */
  volumeToken1: Scalars['BigDecimal']['output'];
  /**  Volume in USD  */
  volumeUSD: Scalars['BigDecimal']['output'];
}

export interface PoolDayData_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolDayData_Filter>>>;
  close?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  feesUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  feesUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  low?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PoolDayData_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
}

export enum PoolDayData_OrderBy {
  Close = 'close',
  Date = 'date',
  FeesUsd = 'feesUSD',
  High = 'high',
  Id = 'id',
  Liquidity = 'liquidity',
  Low = 'low',
  Open = 'open',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  Token0Price = 'token0Price',
  Token1Price = 'token1Price',
  TxCount = 'txCount',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export interface PoolHourData {
  __typename?: 'PoolHourData';
  /**  Close price of token0  */
  close: Scalars['BigDecimal']['output'];
  /**  High price of token0  */
  high: Scalars['BigDecimal']['output'];
  /**  Format: pool address + #  + timestamp  */
  id: Scalars['ID']['output'];
  /**  In range liquidity at end of period  */
  liquidity: Scalars['BigInt']['output'];
  /**  Low price of token0  */
  low: Scalars['BigDecimal']['output'];
  /**  Opening price of token0  */
  open: Scalars['BigDecimal']['output'];
  /**  Unix timestamp for start of hour  */
  periodStartUnix: Scalars['Int']['output'];
  /**  Pointer to pool  */
  pool: Pool;
  /**  Price of token0 - derived from sqrtPrice  */
  token0Price: Scalars['BigDecimal']['output'];
  /**  Price of token1 - derived from sqrtPrice  */
  token1Price: Scalars['BigDecimal']['output'];
  /**  Number of transactions during period  */
  txCount: Scalars['BigInt']['output'];
  /**  Volume in token0  */
  volumeToken0: Scalars['BigDecimal']['output'];
  /**  Volume in token1  */
  volumeToken1: Scalars['BigDecimal']['output'];
  /**  Volume in USD  */
  volumeUSD: Scalars['BigDecimal']['output'];
}

export interface PoolHourData_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolHourData_Filter>>>;
  close?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  low?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PoolHourData_Filter>>>;
  periodStartUnix?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_gte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodStartUnix_lt?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_lte?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_not?: InputMaybe<Scalars['Int']['input']>;
  periodStartUnix_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
}

export enum PoolHourData_OrderBy {
  Close = 'close',
  High = 'high',
  Id = 'id',
  Liquidity = 'liquidity',
  Low = 'low',
  Open = 'open',
  PeriodStartUnix = 'periodStartUnix',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  Token0Price = 'token0Price',
  Token1Price = 'token1Price',
  TxCount = 'txCount',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export interface Pool_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  feeTier?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeTier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeTier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolDayData_?: InputMaybe<PoolDayData_Filter>;
  poolHourData_?: InputMaybe<PoolHourData_Filter>;
  poolId?: InputMaybe<Scalars['String']['input']>;
  poolId_contains?: InputMaybe<Scalars['String']['input']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolId_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolId_gt?: InputMaybe<Scalars['String']['input']>;
  poolId_gte?: InputMaybe<Scalars['String']['input']>;
  poolId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolId_lt?: InputMaybe<Scalars['String']['input']>;
  poolId_lte?: InputMaybe<Scalars['String']['input']>;
  poolId_not?: InputMaybe<Scalars['String']['input']>;
  poolId_not_contains?: InputMaybe<Scalars['String']['input']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolId_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  sqrtPrice?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sqrtPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLastUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLastUpdateTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickLastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickLastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickSpacing?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickSpacing_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_not?: InputMaybe<Scalars['BigInt']['input']>;
  tickSpacing_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tick_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tick_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tick_not?: InputMaybe<Scalars['BigInt']['input']>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalValueLockedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum Pool_OrderBy {
  FeeTier = 'feeTier',
  Id = 'id',
  Liquidity = 'liquidity',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  PoolDayData = 'poolDayData',
  PoolHourData = 'poolHourData',
  PoolId = 'poolId',
  SqrtPrice = 'sqrtPrice',
  Tick = 'tick',
  TickLastUpdateBlockNumber = 'tickLastUpdateBlockNumber',
  TickLastUpdateTimestamp = 'tickLastUpdateTimestamp',
  TickSpacing = 'tickSpacing',
  Token0 = 'token0',
  Token0Price = 'token0Price',
  Token0Decimals = 'token0__decimals',
  Token0DerivedEth = 'token0__derivedETH',
  Token0Id = 'token0__id',
  Token0Name = 'token0__name',
  Token0Symbol = 'token0__symbol',
  Token0TotalSupply = 'token0__totalSupply',
  Token0TxCount = 'token0__txCount',
  Token1 = 'token1',
  Token1Price = 'token1Price',
  Token1Decimals = 'token1__decimals',
  Token1DerivedEth = 'token1__derivedETH',
  Token1Id = 'token1__id',
  Token1Name = 'token1__name',
  Token1Symbol = 'token1__symbol',
  Token1TotalSupply = 'token1__totalSupply',
  Token1TxCount = 'token1__txCount',
  TotalValueLockedEth = 'totalValueLockedETH',
  TotalValueLockedToken0 = 'totalValueLockedToken0',
  TotalValueLockedToken1 = 'totalValueLockedToken1',
  TotalValueLockedUsd = 'totalValueLockedUSD',
  TxCount = 'txCount'
}

/**  Emitted when premium is settled independent of a mint/burn (e.g. during `settleLongPremium`) */
export interface PremiumSettled extends Event {
  __typename?: 'PremiumSettled';
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /** PanopticPool mint is within (from event.address) */
  panopticPool: PanopticPool;
  pool: Pool;
  /** Amount settled for token0 */
  settledAmount0: Scalars['BigInt']['output'];
  /** Amount settled for token1 */
  settledAmount1: Scalars['BigInt']['output'];
  /** LeftRight encoding for the amount of premium settled for token0 (right slot) and token1 (left slot) */
  settledAmounts: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /** TokenId of the settled position */
  tokenId: TokenId;
  /** Address of the owner of the settled position */
  user: Account;
}

export interface PremiumSettled_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PremiumSettled_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PremiumSettled_Filter>>>;
  panopticPool?: InputMaybe<Scalars['String']['input']>;
  panopticPool_?: InputMaybe<PanopticPool_Filter>;
  panopticPool_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_gte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_lt?: InputMaybe<Scalars['String']['input']>;
  panopticPool_lte?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  panopticPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  panopticPool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  settledAmount0?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settledAmount0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount0_not?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settledAmount1?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settledAmount1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount1_not?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmount1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settledAmounts?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmounts_gt?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmounts_gte?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmounts_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settledAmounts_lt?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmounts_lte?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmounts_not?: InputMaybe<Scalars['BigInt']['input']>;
  settledAmounts_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_?: InputMaybe<TokenId_Filter>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<Account_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum PremiumSettled_OrderBy {
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  PanopticPool = 'panopticPool',
  PanopticPoolBurnVolume0 = 'panopticPool__burnVolume0',
  PanopticPoolBurnVolume0Usd = 'panopticPool__burnVolume0USD',
  PanopticPoolBurnVolume1 = 'panopticPool__burnVolume1',
  PanopticPoolBurnVolume1Usd = 'panopticPool__burnVolume1USD',
  PanopticPoolCommissions0 = 'panopticPool__commissions0',
  PanopticPoolCommissions0Usd = 'panopticPool__commissions0USD',
  PanopticPoolCommissions1 = 'panopticPool__commissions1',
  PanopticPoolCommissions1Usd = 'panopticPool__commissions1USD',
  PanopticPoolCommissionsUsd = 'panopticPool__commissionsUSD',
  PanopticPoolFeeTier = 'panopticPool__feeTier',
  PanopticPoolId = 'panopticPool__id',
  PanopticPoolMintVolume0 = 'panopticPool__mintVolume0',
  PanopticPoolMintVolume0Usd = 'panopticPool__mintVolume0USD',
  PanopticPoolMintVolume1 = 'panopticPool__mintVolume1',
  PanopticPoolMintVolume1Usd = 'panopticPool__mintVolume1USD',
  PanopticPoolProtocolLoss0 = 'panopticPool__protocolLoss0',
  PanopticPoolProtocolLoss0Usd = 'panopticPool__protocolLoss0USD',
  PanopticPoolProtocolLoss1 = 'panopticPool__protocolLoss1',
  PanopticPoolProtocolLoss1Usd = 'panopticPool__protocolLoss1USD',
  PanopticPoolProtocolLossUsd = 'panopticPool__protocolLossUSD',
  PanopticPoolTotalVolume0 = 'panopticPool__totalVolume0',
  PanopticPoolTotalVolume0Usd = 'panopticPool__totalVolume0USD',
  PanopticPoolTotalVolume1 = 'panopticPool__totalVolume1',
  PanopticPoolTotalVolume1Usd = 'panopticPool__totalVolume1USD',
  PanopticPoolTxCount = 'panopticPool__txCount',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  SettledAmount0 = 'settledAmount0',
  SettledAmount1 = 'settledAmount1',
  SettledAmounts = 'settledAmounts',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  TokenIdId = 'tokenId__id',
  TokenIdIdHexString = 'tokenId__idHexString',
  TokenIdTokenCount = 'tokenId__tokenCount',
  User = 'user',
  UserId = 'user__id'
}

export interface Query {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountBalance?: Maybe<AccountBalance>;
  accountBalances: Array<AccountBalance>;
  accountLiquidated?: Maybe<AccountLiquidated>;
  accountLiquidateds: Array<AccountLiquidated>;
  accounts: Array<Account>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  chunk?: Maybe<Chunk>;
  chunks: Array<Chunk>;
  collateral?: Maybe<Collateral>;
  collateralDayData?: Maybe<CollateralDayData>;
  collateralDayDatas: Array<CollateralDayData>;
  collateralDeposit?: Maybe<CollateralDeposit>;
  collateralDeposits: Array<CollateralDeposit>;
  collateralWithdraw?: Maybe<CollateralWithdraw>;
  collateralWithdraws: Array<CollateralWithdraw>;
  collaterals: Array<Collateral>;
  collect?: Maybe<Collect>;
  collects: Array<Collect>;
  event?: Maybe<Event>;
  events: Array<Event>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  forcedExercise?: Maybe<ForcedExercise>;
  forcedExercises: Array<ForcedExercise>;
  leg?: Maybe<Leg>;
  legLiquidities?: Maybe<LegLiquidities>;
  legLiquidities_collection: Array<LegLiquidities>;
  legs: Array<Leg>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  optionBurn?: Maybe<OptionBurn>;
  optionBurns: Array<OptionBurn>;
  optionMint?: Maybe<OptionMint>;
  optionMints: Array<OptionMint>;
  optionRoll?: Maybe<OptionRoll>;
  optionRolls: Array<OptionRoll>;
  panopticFactories: Array<PanopticFactory>;
  panopticFactory?: Maybe<PanopticFactory>;
  panopticPool?: Maybe<PanopticPool>;
  panopticPoolAccount?: Maybe<PanopticPoolAccount>;
  panopticPoolAccounts: Array<PanopticPoolAccount>;
  panopticPoolDayData?: Maybe<PanopticPoolDayData>;
  panopticPoolDayDatas: Array<PanopticPoolDayData>;
  panopticPools: Array<PanopticPool>;
  pool?: Maybe<Pool>;
  poolDayData?: Maybe<PoolDayData>;
  poolDayDatas: Array<PoolDayData>;
  poolHourData?: Maybe<PoolHourData>;
  poolHourDatas: Array<PoolHourData>;
  pools: Array<Pool>;
  premiumSettled?: Maybe<PremiumSettled>;
  premiumSettleds: Array<PremiumSettled>;
  token?: Maybe<Token>;
  tokenId?: Maybe<TokenId>;
  tokenIds: Array<TokenId>;
  tokenizedPositionBurnt?: Maybe<TokenizedPositionBurnt>;
  tokenizedPositionBurnts: Array<TokenizedPositionBurnt>;
  tokenizedPositionMinted?: Maybe<TokenizedPositionMinted>;
  tokenizedPositionMinteds: Array<TokenizedPositionMinted>;
  tokenizedPositionRolled?: Maybe<TokenizedPositionRolled>;
  tokenizedPositionRolleds: Array<TokenizedPositionRolled>;
  tokens: Array<Token>;
}


export interface Query_MetaArgs {
  block?: InputMaybe<Block_Height>;
}


export interface QueryAccountArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryAccountBalanceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryAccountBalancesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountBalance_Filter>;
}


export interface QueryAccountLiquidatedArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryAccountLiquidatedsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountLiquidated_Filter>;
}


export interface QueryAccountsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
}


export interface QueryBundleArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryBundlesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bundle_Filter>;
}


export interface QueryBurnArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryBurnsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
}


export interface QueryChunkArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryChunksArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Chunk_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Chunk_Filter>;
}


export interface QueryCollateralArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryCollateralDayDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryCollateralDayDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralDayData_Filter>;
}


export interface QueryCollateralDepositArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryCollateralDepositsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralDeposit_Filter>;
}


export interface QueryCollateralWithdrawArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryCollateralWithdrawsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralWithdraw_Filter>;
}


export interface QueryCollateralsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collateral_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collateral_Filter>;
}


export interface QueryCollectArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryCollectsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collect_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collect_Filter>;
}


export interface QueryEventArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryEventsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
}


export interface QueryFactoriesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
}


export interface QueryFactoryArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryForcedExerciseArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryForcedExercisesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ForcedExercise_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ForcedExercise_Filter>;
}


export interface QueryLegArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryLegLiquiditiesArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryLegLiquidities_CollectionArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegLiquidities_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LegLiquidities_Filter>;
}


export interface QueryLegsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Leg_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Leg_Filter>;
}


export interface QueryMintArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryMintsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
}


export interface QueryOptionBurnArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryOptionBurnsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OptionBurn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OptionBurn_Filter>;
}


export interface QueryOptionMintArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryOptionMintsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OptionMint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OptionMint_Filter>;
}


export interface QueryOptionRollArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryOptionRollsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OptionRoll_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OptionRoll_Filter>;
}


export interface QueryPanopticFactoriesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticFactory_Filter>;
}


export interface QueryPanopticFactoryArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPanopticPoolArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPanopticPoolAccountArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPanopticPoolAccountsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPoolAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticPoolAccount_Filter>;
}


export interface QueryPanopticPoolDayDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPanopticPoolDayDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticPoolDayData_Filter>;
}


export interface QueryPanopticPoolsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticPool_Filter>;
}


export interface QueryPoolArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPoolDayDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPoolDayDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolDayData_Filter>;
}


export interface QueryPoolHourDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPoolHourDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHourData_Filter>;
}


export interface QueryPoolsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
}


export interface QueryPremiumSettledArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryPremiumSettledsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PremiumSettled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PremiumSettled_Filter>;
}


export interface QueryTokenArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryTokenIdArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryTokenIdsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenId_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenId_Filter>;
}


export interface QueryTokenizedPositionBurntArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryTokenizedPositionBurntsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenizedPositionBurnt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenizedPositionBurnt_Filter>;
}


export interface QueryTokenizedPositionMintedArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryTokenizedPositionMintedsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenizedPositionMinted_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenizedPositionMinted_Filter>;
}


export interface QueryTokenizedPositionRolledArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface QueryTokenizedPositionRolledsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenizedPositionRolled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenizedPositionRolled_Filter>;
}


export interface QueryTokensArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
}

export interface Subscription {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountBalance?: Maybe<AccountBalance>;
  accountBalances: Array<AccountBalance>;
  accountLiquidated?: Maybe<AccountLiquidated>;
  accountLiquidateds: Array<AccountLiquidated>;
  accounts: Array<Account>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  chunk?: Maybe<Chunk>;
  chunks: Array<Chunk>;
  collateral?: Maybe<Collateral>;
  collateralDayData?: Maybe<CollateralDayData>;
  collateralDayDatas: Array<CollateralDayData>;
  collateralDeposit?: Maybe<CollateralDeposit>;
  collateralDeposits: Array<CollateralDeposit>;
  collateralWithdraw?: Maybe<CollateralWithdraw>;
  collateralWithdraws: Array<CollateralWithdraw>;
  collaterals: Array<Collateral>;
  collect?: Maybe<Collect>;
  collects: Array<Collect>;
  event?: Maybe<Event>;
  events: Array<Event>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  forcedExercise?: Maybe<ForcedExercise>;
  forcedExercises: Array<ForcedExercise>;
  leg?: Maybe<Leg>;
  legLiquidities?: Maybe<LegLiquidities>;
  legLiquidities_collection: Array<LegLiquidities>;
  legs: Array<Leg>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  optionBurn?: Maybe<OptionBurn>;
  optionBurns: Array<OptionBurn>;
  optionMint?: Maybe<OptionMint>;
  optionMints: Array<OptionMint>;
  optionRoll?: Maybe<OptionRoll>;
  optionRolls: Array<OptionRoll>;
  panopticFactories: Array<PanopticFactory>;
  panopticFactory?: Maybe<PanopticFactory>;
  panopticPool?: Maybe<PanopticPool>;
  panopticPoolAccount?: Maybe<PanopticPoolAccount>;
  panopticPoolAccounts: Array<PanopticPoolAccount>;
  panopticPoolDayData?: Maybe<PanopticPoolDayData>;
  panopticPoolDayDatas: Array<PanopticPoolDayData>;
  panopticPools: Array<PanopticPool>;
  pool?: Maybe<Pool>;
  poolDayData?: Maybe<PoolDayData>;
  poolDayDatas: Array<PoolDayData>;
  poolHourData?: Maybe<PoolHourData>;
  poolHourDatas: Array<PoolHourData>;
  pools: Array<Pool>;
  premiumSettled?: Maybe<PremiumSettled>;
  premiumSettleds: Array<PremiumSettled>;
  token?: Maybe<Token>;
  tokenId?: Maybe<TokenId>;
  tokenIds: Array<TokenId>;
  tokenizedPositionBurnt?: Maybe<TokenizedPositionBurnt>;
  tokenizedPositionBurnts: Array<TokenizedPositionBurnt>;
  tokenizedPositionMinted?: Maybe<TokenizedPositionMinted>;
  tokenizedPositionMinteds: Array<TokenizedPositionMinted>;
  tokenizedPositionRolled?: Maybe<TokenizedPositionRolled>;
  tokenizedPositionRolleds: Array<TokenizedPositionRolled>;
  tokens: Array<Token>;
}


export interface Subscription_MetaArgs {
  block?: InputMaybe<Block_Height>;
}


export interface SubscriptionAccountArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionAccountBalanceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionAccountBalancesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountBalance_Filter>;
}


export interface SubscriptionAccountLiquidatedArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionAccountLiquidatedsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountLiquidated_Filter>;
}


export interface SubscriptionAccountsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
}


export interface SubscriptionBundleArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionBundlesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bundle_Filter>;
}


export interface SubscriptionBurnArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionBurnsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
}


export interface SubscriptionChunkArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionChunksArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Chunk_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Chunk_Filter>;
}


export interface SubscriptionCollateralArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionCollateralDayDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionCollateralDayDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralDayData_Filter>;
}


export interface SubscriptionCollateralDepositArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionCollateralDepositsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralDeposit_Filter>;
}


export interface SubscriptionCollateralWithdrawArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionCollateralWithdrawsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralWithdraw_Filter>;
}


export interface SubscriptionCollateralsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collateral_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collateral_Filter>;
}


export interface SubscriptionCollectArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionCollectsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collect_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collect_Filter>;
}


export interface SubscriptionEventArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionEventsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
}


export interface SubscriptionFactoriesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
}


export interface SubscriptionFactoryArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionForcedExerciseArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionForcedExercisesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ForcedExercise_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ForcedExercise_Filter>;
}


export interface SubscriptionLegArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionLegLiquiditiesArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionLegLiquidities_CollectionArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegLiquidities_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LegLiquidities_Filter>;
}


export interface SubscriptionLegsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Leg_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Leg_Filter>;
}


export interface SubscriptionMintArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionMintsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
}


export interface SubscriptionOptionBurnArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionOptionBurnsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OptionBurn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OptionBurn_Filter>;
}


export interface SubscriptionOptionMintArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionOptionMintsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OptionMint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OptionMint_Filter>;
}


export interface SubscriptionOptionRollArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionOptionRollsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OptionRoll_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OptionRoll_Filter>;
}


export interface SubscriptionPanopticFactoriesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticFactory_Filter>;
}


export interface SubscriptionPanopticFactoryArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPanopticPoolArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPanopticPoolAccountArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPanopticPoolAccountsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPoolAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticPoolAccount_Filter>;
}


export interface SubscriptionPanopticPoolDayDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPanopticPoolDayDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticPoolDayData_Filter>;
}


export interface SubscriptionPanopticPoolsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PanopticPool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PanopticPool_Filter>;
}


export interface SubscriptionPoolArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPoolDayDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPoolDayDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolDayData_Filter>;
}


export interface SubscriptionPoolHourDataArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPoolHourDatasArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHourData_Filter>;
}


export interface SubscriptionPoolsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
}


export interface SubscriptionPremiumSettledArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionPremiumSettledsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PremiumSettled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PremiumSettled_Filter>;
}


export interface SubscriptionTokenArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionTokenIdArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionTokenIdsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenId_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenId_Filter>;
}


export interface SubscriptionTokenizedPositionBurntArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionTokenizedPositionBurntsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenizedPositionBurnt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenizedPositionBurnt_Filter>;
}


export interface SubscriptionTokenizedPositionMintedArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionTokenizedPositionMintedsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenizedPositionMinted_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenizedPositionMinted_Filter>;
}


export interface SubscriptionTokenizedPositionRolledArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
}


export interface SubscriptionTokenizedPositionRolledsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenizedPositionRolled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenizedPositionRolled_Filter>;
}


export interface SubscriptionTokensArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
}

export interface Token {
  __typename?: 'Token';
  /**  Token decimals  */
  decimals: Scalars['BigInt']['output'];
  /**  Derived price in ETH, used to provide human readable price  */
  derivedETH: Scalars['BigDecimal']['output'];
  /**  Token address  */
  id: Scalars['ID']['output'];
  /**  Token name  */
  name: Scalars['String']['output'];
  /**  Token symbol  */
  symbol: Scalars['String']['output'];
  /**  Token total supply  */
  totalSupply: Scalars['BigInt']['output'];
  /**  Number of transactions across all pools that include this token  */
  txCount: Scalars['BigInt']['output'];
  /**  Pools token is in that are white listed for USD pricing  */
  whitelistPools: Array<Pool>;
}


export interface TokenWhitelistPoolsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Pool_Filter>;
}

/**  An ERC-1155 ID representing a position.  */
export interface TokenId {
  __typename?: 'TokenId';
  /**  AccountBalances that own an instance of this TokenId */
  accountBalances: Array<AccountBalance>;
  /**
   * The ERC-1155 TokenId for this position. See the TokenId.sol for more information on its structure.
   *
   */
  id: Scalars['ID']['output'];
  /**  Hex stringified tokenId  */
  idHexString: Scalars['String']['output'];
  /**  Legs in this tokenId  */
  legs: Array<Leg>;
  /**  Pool position is within  */
  pool: Pool;
  /**  Also known as positionSize, the total net number of contracts for this tokenId, expressed in terms of the asset  */
  tokenCount: Scalars['BigInt']['output'];
}


/**  An ERC-1155 ID representing a position.  */
export interface TokenIdAccountBalancesArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountBalance_Filter>;
}


/**  An ERC-1155 ID representing a position.  */
export interface TokenIdLegsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Leg_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Leg_Filter>;
}

export interface TokenId_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accountBalances_?: InputMaybe<AccountBalance_Filter>;
  and?: InputMaybe<Array<InputMaybe<TokenId_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  idHexString?: InputMaybe<Scalars['String']['input']>;
  idHexString_contains?: InputMaybe<Scalars['String']['input']>;
  idHexString_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_ends_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_gt?: InputMaybe<Scalars['String']['input']>;
  idHexString_gte?: InputMaybe<Scalars['String']['input']>;
  idHexString_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idHexString_lt?: InputMaybe<Scalars['String']['input']>;
  idHexString_lte?: InputMaybe<Scalars['String']['input']>;
  idHexString_not?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_contains?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idHexString_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idHexString_starts_with?: InputMaybe<Scalars['String']['input']>;
  idHexString_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  legs?: InputMaybe<Array<Scalars['String']['input']>>;
  legs_?: InputMaybe<Leg_Filter>;
  legs_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  legs_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  legs_not?: InputMaybe<Array<Scalars['String']['input']>>;
  legs_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  legs_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TokenId_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenCount?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum TokenId_OrderBy {
  AccountBalances = 'accountBalances',
  Id = 'id',
  IdHexString = 'idHexString',
  Legs = 'legs',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  TokenCount = 'tokenCount'
}

export interface Token_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  derivedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  derivedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whitelistPools?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_?: InputMaybe<Pool_Filter>;
  whitelistPools_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_not?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  whitelistPools_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
}

export enum Token_OrderBy {
  Decimals = 'decimals',
  DerivedEth = 'derivedETH',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
  TxCount = 'txCount',
  WhitelistPools = 'whitelistPools'
}

/**  SFPM tokenized position burn  */
export interface TokenizedPositionBurnt extends Event {
  __typename?: 'TokenizedPositionBurnt';
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  pool: Pool;
  /**  The number of contracts burnt, expressed in terms of the asset  */
  positionSize: Scalars['BigInt']['output'];
  /**  User that burnt the position  */
  recipient: Account;
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /**  TokenId of the burnt option  */
  tokenId: TokenId;
}

export interface TokenizedPositionBurnt_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenizedPositionBurnt_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TokenizedPositionBurnt_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionSize?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  recipient_?: InputMaybe<Account_Filter>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_?: InputMaybe<TokenId_Filter>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum TokenizedPositionBurnt_OrderBy {
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  PositionSize = 'positionSize',
  Recipient = 'recipient',
  RecipientId = 'recipient__id',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  TokenIdId = 'tokenId__id',
  TokenIdIdHexString = 'tokenId__idHexString',
  TokenIdTokenCount = 'tokenId__tokenCount'
}

/**  SFPM tokenized position mint  */
export interface TokenizedPositionMinted extends Event {
  __typename?: 'TokenizedPositionMinted';
  blockNumber: Scalars['BigInt']['output'];
  /**  User that minted the position  */
  caller: Account;
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  pool: Pool;
  /**  The number of contracts minted, expressed in terms of the asset  */
  positionSize: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  /**  TokenId of the minted position  */
  tokenId: TokenId;
}

export interface TokenizedPositionMinted_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenizedPositionMinted_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  caller?: InputMaybe<Scalars['String']['input']>;
  caller_?: InputMaybe<Account_Filter>;
  caller_contains?: InputMaybe<Scalars['String']['input']>;
  caller_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  caller_ends_with?: InputMaybe<Scalars['String']['input']>;
  caller_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  caller_gt?: InputMaybe<Scalars['String']['input']>;
  caller_gte?: InputMaybe<Scalars['String']['input']>;
  caller_in?: InputMaybe<Array<Scalars['String']['input']>>;
  caller_lt?: InputMaybe<Scalars['String']['input']>;
  caller_lte?: InputMaybe<Scalars['String']['input']>;
  caller_not?: InputMaybe<Scalars['String']['input']>;
  caller_not_contains?: InputMaybe<Scalars['String']['input']>;
  caller_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  caller_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  caller_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  caller_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  caller_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  caller_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  caller_starts_with?: InputMaybe<Scalars['String']['input']>;
  caller_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TokenizedPositionMinted_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionSize?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_?: InputMaybe<TokenId_Filter>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum TokenizedPositionMinted_OrderBy {
  BlockNumber = 'blockNumber',
  Caller = 'caller',
  CallerId = 'caller__id',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  PositionSize = 'positionSize',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  TokenIdId = 'tokenId__id',
  TokenIdIdHexString = 'tokenId__idHexString',
  TokenIdTokenCount = 'tokenId__tokenCount'
}

/**  SFPM tokenized position roll  */
export interface TokenizedPositionRolled extends Event {
  __typename?: 'TokenizedPositionRolled';
  blockNumber: Scalars['BigInt']['output'];
  eventType: EventType;
  from: Scalars['String']['output'];
  gasPrice: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['BigInt']['output'];
  /**  TokenId of the newly minted position  */
  newTokenId: TokenId;
  /**  TokenId of the burnt position  */
  oldTokenId: TokenId;
  pool: Pool;
  /**  The number of contracts rolled, expressed in terms of the asset  */
  positionSize: Scalars['BigInt']['output'];
  /**  User that rolled the position  */
  recipient: Account;
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
}

export interface TokenizedPositionRolled_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenizedPositionRolled_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventType?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_not?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  logIndex?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newTokenId?: InputMaybe<Scalars['String']['input']>;
  newTokenId_?: InputMaybe<TokenId_Filter>;
  newTokenId_contains?: InputMaybe<Scalars['String']['input']>;
  newTokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newTokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  newTokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newTokenId_gt?: InputMaybe<Scalars['String']['input']>;
  newTokenId_gte?: InputMaybe<Scalars['String']['input']>;
  newTokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newTokenId_lt?: InputMaybe<Scalars['String']['input']>;
  newTokenId_lte?: InputMaybe<Scalars['String']['input']>;
  newTokenId_not?: InputMaybe<Scalars['String']['input']>;
  newTokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  newTokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newTokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newTokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newTokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newTokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newTokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newTokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  newTokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldTokenId?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_?: InputMaybe<TokenId_Filter>;
  oldTokenId_contains?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_gt?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_gte?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oldTokenId_lt?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_lte?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_not?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oldTokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  oldTokenId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TokenizedPositionRolled_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  positionSize?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  recipient_?: InputMaybe<Account_Filter>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with?: InputMaybe<Scalars['String']['input']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
}

export enum TokenizedPositionRolled_OrderBy {
  BlockNumber = 'blockNumber',
  EventType = 'eventType',
  From = 'from',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  NewTokenId = 'newTokenId',
  NewTokenIdId = 'newTokenId__id',
  NewTokenIdIdHexString = 'newTokenId__idHexString',
  NewTokenIdTokenCount = 'newTokenId__tokenCount',
  OldTokenId = 'oldTokenId',
  OldTokenIdId = 'oldTokenId__id',
  OldTokenIdIdHexString = 'oldTokenId__idHexString',
  OldTokenIdTokenCount = 'oldTokenId__tokenCount',
  Pool = 'pool',
  PoolFeeTier = 'pool__feeTier',
  PoolId = 'pool__id',
  PoolLiquidity = 'pool__liquidity',
  PoolPoolId = 'pool__poolId',
  PoolSqrtPrice = 'pool__sqrtPrice',
  PoolTick = 'pool__tick',
  PoolTickLastUpdateBlockNumber = 'pool__tickLastUpdateBlockNumber',
  PoolTickLastUpdateTimestamp = 'pool__tickLastUpdateTimestamp',
  PoolTickSpacing = 'pool__tickSpacing',
  PoolToken0Price = 'pool__token0Price',
  PoolToken1Price = 'pool__token1Price',
  PoolTotalValueLockedEth = 'pool__totalValueLockedETH',
  PoolTotalValueLockedToken0 = 'pool__totalValueLockedToken0',
  PoolTotalValueLockedToken1 = 'pool__totalValueLockedToken1',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  PoolTxCount = 'pool__txCount',
  PositionSize = 'positionSize',
  Recipient = 'recipient',
  RecipientId = 'recipient__id',
  Timestamp = 'timestamp',
  To = 'to'
}

export interface _Block_ {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type AccountBalanceFragment = { __typename?: 'AccountBalance', id: string, tokenCount: string, createdTimestamp: string, createdBlockNumber: string, owner: { __typename?: 'Account', id: string }, sender: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, idHexString: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPoolAccount?: { __typename?: 'PanopticPoolAccount', id: string, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', tick?: string | null } } } | null, txnOpened: { __typename?: 'AccountLiquidated', eventType: EventType } | { __typename?: 'Burn', eventType: EventType } | { __typename?: 'CollateralDeposit', eventType: EventType } | { __typename?: 'CollateralWithdraw', eventType: EventType } | { __typename?: 'Collect', eventType: EventType } | { __typename?: 'ForcedExercise', eventType: EventType } | { __typename?: 'Mint', eventType: EventType } | { __typename?: 'OptionBurn', eventType: EventType } | { __typename?: 'OptionMint', eventType: EventType, id: string, from: string, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } } | { __typename?: 'OptionRoll', eventType: EventType } | { __typename?: 'PremiumSettled', eventType: EventType } | { __typename?: 'TokenizedPositionBurnt', eventType: EventType } | { __typename?: 'TokenizedPositionMinted', eventType: EventType } | { __typename?: 'TokenizedPositionRolled', eventType: EventType }, txnClosed?: { __typename?: 'AccountLiquidated', eventType: EventType } | { __typename?: 'Burn', eventType: EventType } | { __typename?: 'CollateralDeposit', eventType: EventType } | { __typename?: 'CollateralWithdraw', eventType: EventType } | { __typename?: 'Collect', eventType: EventType } | { __typename?: 'ForcedExercise', eventType: EventType } | { __typename?: 'Mint', eventType: EventType } | { __typename?: 'OptionBurn', eventType: EventType, id: string, from: string, tickAt: number, premia: string, hash: string, blockNumber: string, timestamp: string, positionSize: string, premium0: string, premium1: string, recipient: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, name: string, symbol: string, derivedETH: string }, token1: { __typename?: 'Token', id: string, decimals: string, name: string, symbol: string, derivedETH: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, txnOpened: { __typename?: 'OptionMint', id: string, from: string, eventType: EventType, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } } } | { __typename?: 'OptionMint', eventType: EventType } | { __typename?: 'OptionRoll', eventType: EventType } | { __typename?: 'PremiumSettled', eventType: EventType } | { __typename?: 'TokenizedPositionBurnt', eventType: EventType } | { __typename?: 'TokenizedPositionMinted', eventType: EventType } | { __typename?: 'TokenizedPositionRolled', eventType: EventType } | null };

export type AccountFragment = { __typename?: 'Account', id: string, accountBalances: Array<{ __typename?: 'AccountBalance', id: string, tokenCount: string, createdTimestamp: string, createdBlockNumber: string, owner: { __typename?: 'Account', id: string }, sender: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, idHexString: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPoolAccount?: { __typename?: 'PanopticPoolAccount', id: string, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', tick?: string | null } } } | null, txnOpened: { __typename?: 'AccountLiquidated', eventType: EventType } | { __typename?: 'Burn', eventType: EventType } | { __typename?: 'CollateralDeposit', eventType: EventType } | { __typename?: 'CollateralWithdraw', eventType: EventType } | { __typename?: 'Collect', eventType: EventType } | { __typename?: 'ForcedExercise', eventType: EventType } | { __typename?: 'Mint', eventType: EventType } | { __typename?: 'OptionBurn', eventType: EventType } | { __typename?: 'OptionMint', eventType: EventType, id: string, from: string, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } } | { __typename?: 'OptionRoll', eventType: EventType } | { __typename?: 'PremiumSettled', eventType: EventType } | { __typename?: 'TokenizedPositionBurnt', eventType: EventType } | { __typename?: 'TokenizedPositionMinted', eventType: EventType } | { __typename?: 'TokenizedPositionRolled', eventType: EventType }, txnClosed?: { __typename?: 'AccountLiquidated', eventType: EventType } | { __typename?: 'Burn', eventType: EventType } | { __typename?: 'CollateralDeposit', eventType: EventType } | { __typename?: 'CollateralWithdraw', eventType: EventType } | { __typename?: 'Collect', eventType: EventType } | { __typename?: 'ForcedExercise', eventType: EventType } | { __typename?: 'Mint', eventType: EventType } | { __typename?: 'OptionBurn', eventType: EventType, id: string, from: string, tickAt: number, premia: string, hash: string, blockNumber: string, timestamp: string, positionSize: string, premium0: string, premium1: string, recipient: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, name: string, symbol: string, derivedETH: string }, token1: { __typename?: 'Token', id: string, decimals: string, name: string, symbol: string, derivedETH: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, txnOpened: { __typename?: 'OptionMint', id: string, from: string, eventType: EventType, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } } } | { __typename?: 'OptionMint', eventType: EventType } | { __typename?: 'OptionRoll', eventType: EventType } | { __typename?: 'PremiumSettled', eventType: EventType } | { __typename?: 'TokenizedPositionBurnt', eventType: EventType } | { __typename?: 'TokenizedPositionMinted', eventType: EventType } | { __typename?: 'TokenizedPositionRolled', eventType: EventType } | null }> };

export type ChunkFragment = { __typename?: 'Chunk', id: string, tickLower: string, tickUpper: string, strike: string, width: string, tokenType: string, netLiquidity: string, shortLiquidity: string, longLiquidity: string, shortCounts: string, longCounts: string, totalLiquidity: string, owner: { __typename?: 'Account', id: string }, manager: { __typename?: 'Account', id: string }, pool: { __typename?: 'Pool', id: string }, panopticPool?: { __typename?: 'PanopticPool', id: string } | null, legs: Array<{ __typename?: 'Leg', id: string }> };

export type CollateralFragment = { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, inAMM: string, index: string, token: { __typename?: 'Token', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string } };

export type OptionBurnFragment = { __typename?: 'OptionBurn', id: string, from: string, eventType: EventType, tickAt: number, premia: string, hash: string, blockNumber: string, timestamp: string, positionSize: string, premium0: string, premium1: string, recipient: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, name: string, symbol: string, derivedETH: string }, token1: { __typename?: 'Token', id: string, decimals: string, name: string, symbol: string, derivedETH: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, txnOpened: { __typename?: 'OptionMint', id: string, from: string, eventType: EventType, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } } };

export type OptionMintFragment = { __typename?: 'OptionMint', id: string, from: string, eventType: EventType, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } };

export type LegFragment = { __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string };

export type MetaFragment = { __typename?: '_Meta_', block: { __typename?: '_Block_', number: number } };

export type PanopticPoolAccountFragment = { __typename?: 'PanopticPoolAccount', id: string, collateral0Assets: string, collateral0Shares: string, collateral1Assets: string, collateral1Shares: string, account: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } };

export type PoolFragment = { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: string, derivedETH: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: string, derivedETH: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null };

export type PoolDayDataFragment = { __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string };

export type PoolHourDataFragment = { __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string };

export type PanopticPoolFragment = { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } };

export type GetCommissionsAtBlockQueryVariables = Exact<{
  account: Scalars['String']['input'];
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCommissionsAtBlockQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', id: string, collateral0Assets: string, collateral1Assets: string, panopticPool: { __typename?: 'PanopticPool', underlyingPool: { __typename?: 'Pool', id: string, token0: { __typename?: 'Token', name: string, derivedETH: string }, token1: { __typename?: 'Token', name: string, derivedETH: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, inAMM: string, index: string, token: { __typename?: 'Token', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string } }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, inAMM: string, index: string, token: { __typename?: 'Token', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string } } } }> };

export type GetCommissionsQueryVariables = Exact<{
  account: Scalars['String']['input'];
}>;


export type GetCommissionsQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', id: string, commissionsSinceLastTransfer0: string, commissionsSinceLastTransfer1: string, sharePriceAtLastTransfer0: string, sharePriceAtLastTransfer1: string, collateral0Shares: string, collateral1Shares: string, collateral0Assets: string, collateral1Assets: string, panopticPool: { __typename?: 'PanopticPool', underlyingPool: { __typename?: 'Pool', id: string, token0: { __typename?: 'Token', name: string, derivedETH: string }, token1: { __typename?: 'Token', name: string, derivedETH: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, inAMM: string, index: string, token: { __typename?: 'Token', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string } }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, inAMM: string, index: string, token: { __typename?: 'Token', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string } } } }> };

export type GetSamplePoolsWithCollateralDayDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSamplePoolsWithCollateralDayDataQuery = { __typename?: 'Query', panopticPools: Array<{ __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, token0: { __typename?: 'Token', id: string, decimals: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, symbol: string } }, collateral0: { __typename?: 'Collateral', totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } }> };

export type GetMarketDetailsQueryVariables = Exact<{
  market: Scalars['ID']['input'];
}>;


export type GetMarketDetailsQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null };

export type GetMarketDetailsFromBlockQueryVariables = Exact<{
  market: Scalars['ID']['input'];
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMarketDetailsFromBlockQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null };

export type GetMarketMintEventsQueryVariables = Exact<{
  market: Scalars['String']['input'];
  weekAgo?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetMarketMintEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'AccountLiquidated' } | { __typename?: 'Burn' } | { __typename?: 'CollateralDeposit' } | { __typename?: 'CollateralWithdraw' } | { __typename?: 'Collect' } | { __typename?: 'ForcedExercise' } | { __typename?: 'Mint' } | { __typename?: 'OptionBurn' } | { __typename?: 'OptionMint', id: string, from: string, eventType: EventType, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } } | { __typename?: 'OptionRoll' } | { __typename?: 'PremiumSettled' } | { __typename?: 'TokenizedPositionBurnt' } | { __typename?: 'TokenizedPositionMinted' } | { __typename?: 'TokenizedPositionRolled' }> };

export type GetMarketsMintEventsQueryVariables = Exact<{
  weekAgo?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetMarketsMintEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'AccountLiquidated' } | { __typename?: 'Burn' } | { __typename?: 'CollateralDeposit' } | { __typename?: 'CollateralWithdraw' } | { __typename?: 'Collect' } | { __typename?: 'ForcedExercise' } | { __typename?: 'Mint' } | { __typename?: 'OptionBurn' } | { __typename?: 'OptionMint', id: string, from: string, eventType: EventType, tickAt: number, hash: string, blockNumber: string, timestamp: string, positionSize: string, poolUtilizations: string, recipient: { __typename?: 'Account', id: string }, tokenId: { __typename?: 'TokenId', id: string, legs: Array<{ __typename?: 'Leg', id: string, index: number, optionRatio: string, asset: string, tokenType: string, isLong: string, riskPartner: string, strike: string, width: string }>, pool: { __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, token1: { __typename?: 'Token', id: string, decimals: string, derivedETH: string, name: string, symbol: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null } }, panopticPool: { __typename?: 'PanopticPool', id: string } } | { __typename?: 'OptionRoll' } | { __typename?: 'PremiumSettled' } | { __typename?: 'TokenizedPositionBurnt' } | { __typename?: 'TokenizedPositionMinted' } | { __typename?: 'TokenizedPositionRolled' }> };

export type GetTokenRelatedMarketsQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type GetTokenRelatedMarketsQuery = { __typename?: 'Query', panopticPools: Array<{ __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } }> };

export type GetMarketsBySelectedTokenAndFeeTierQueryVariables = Exact<{
  assetToken: Scalars['String']['input'];
  quoteToken: Scalars['String']['input'];
  feeTiers?: InputMaybe<Array<Scalars['BigInt']['input']> | Scalars['BigInt']['input']>;
}>;


export type GetMarketsBySelectedTokenAndFeeTierQuery = { __typename?: 'Query', pools: Array<{ __typename?: 'Pool', poolId?: string | null, sqrtPrice: string, tick?: string | null, tickSpacing: string, id: string, liquidity: string, token0Price: string, token1Price: string, feeTier: string, totalValueLockedToken0: string, totalValueLockedToken1: string, totalValueLockedUSD: string, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, token0: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: string, derivedETH: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: string, derivedETH: string }, panopticPool?: { __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } | null }> };

export type GetMarketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarketsQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPools: Array<{ __typename?: 'PanopticPool', id: string, txCount: string, commissions0: string, commissions1: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, tickSpacing: string, totalValueLockedUSD: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, poolDayData: Array<{ __typename?: 'PoolDayData', id: string, date: number, txCount: string, liquidity: string, token0Price: string, token1Price: string, volumeToken0: string, volumeToken1: string, volumeUSD: string, feesUSD: string, open: string, high: string, low: string, close: string }>, poolHourData: Array<{ __typename?: 'PoolHourData', id: string, open: string, close: string, high: string, low: string, txCount: string, periodStartUnix: number, token0Price: string, token1Price: string }> }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } }> };

export type GetVaultsWithDepositsFromAccountQueryVariables = Exact<{
  account: Scalars['String']['input'];
}>;


export type GetVaultsWithDepositsFromAccountQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', id: string, collateral0Assets: string, collateral0Shares: string, collateral1Assets: string, collateral1Shares: string, account: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } }> };

export type GetVaultsInfoFromNonDepositedPoolsQueryVariables = Exact<{
  panopticPoolIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetVaultsInfoFromNonDepositedPoolsQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', id: string, collateral0Assets: string, collateral0Shares: string, collateral1Assets: string, collateral1Shares: string, account: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } }> };

export type GetVaultsInfoFromAllPoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVaultsInfoFromAllPoolsQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', id: string, collateral0Assets: string, collateral0Shares: string, collateral1Assets: string, collateral1Shares: string, account: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } }> };

export type GetVaultsInfoFromPoolIdsQueryVariables = Exact<{
  panopticPoolIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetVaultsInfoFromPoolIdsQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', id: string, collateral0Assets: string, collateral0Shares: string, collateral1Assets: string, collateral1Shares: string, account: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } }> };

export type GetAllPoolsQueryVariables = Exact<{
  panopticPoolIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetAllPoolsQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null, panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', id: string, collateral0Assets: string, collateral0Shares: string, collateral1Assets: string, collateral1Shares: string, account: { __typename?: 'Account', id: string }, panopticPool: { __typename?: 'PanopticPool', id: string, underlyingPool: { __typename?: 'Pool', id: string, feeTier: string, token0: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string }, token1: { __typename?: 'Token', id: string, name: string, symbol: string, derivedETH: string, decimals: string } }, collateral0: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> }, collateral1: { __typename?: 'Collateral', id: string, totalAssets: string, totalShares: string, collateralDayData: Array<{ __typename?: 'CollateralDayData', id: string, sharePrice: string }> } } }> };

export type GetEthPriceUsdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEthPriceUsdQuery = { __typename?: 'Query', bundle?: { __typename?: 'Bundle', ethPriceUSD: string } | null };

export type GetPpaAccountCollateralInfoQueryVariables = Exact<{
  account: Scalars['String']['input'];
}>;


export type GetPpaAccountCollateralInfoQuery = { __typename?: 'Query', panopticPoolAccounts: Array<{ __typename?: 'PanopticPoolAccount', collateral0Assets: string, collateral0Shares: string, collateral1Assets: string, collateral1Shares: string }> };
