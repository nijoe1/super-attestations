export function walletClientToSigner(walletClient: any) {
    const ethersWalletClient = {
      getAddress: async (): Promise<`0x${string}`> => {
        return (await walletClient?.account.address) ?? "";
      },
      signMessage: async (message: string): Promise<string> => {
        const signature = await walletClient?.signMessage({ message });
        return signature ?? "";
      },
    };

    const { signMessage, ...rest } = walletClient ?? {};

    return {
      ...ethersWalletClient,
      ...{ ...rest },
    };
  }