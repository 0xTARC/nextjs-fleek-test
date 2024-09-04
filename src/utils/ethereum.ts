export const GAS_MARGIN_MULTIPLIER = 125n

/* eslint-disable @typescript-eslint/no-explicit-any */
// Takes in config returned from wagmi's useSimulate function, returns config with gas margin
export const addGasMarginToPrepareContractWriteConfig = (
  // TODO: type this better. can probably use `infer` to do it
  config: any,
  gasMarginMultiplier: bigint = GAS_MARGIN_MULTIPLIER,
): any => {
  if (!config?.request?.gas) {
    return config
  } else {
    return {
      ...config,
      request: {
        ...config.request,
        gas: (config.request.gas * gasMarginMultiplier) / 100n,
      },
    }
  }
}
