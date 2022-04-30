import '../styles/globals.css';
import { chain, createClient, defaultChains, Provider } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Get environment variables
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
    const rpcUrl = chain.rpcUrls.infura
      ? `${chain.rpcUrls.infura}/${infuraId}`
      : chain.rpcUrls.default;
    return [
      new InjectedConnector(),
      new CoinbaseWalletConnector({
        options: {
          appName: 'create-web3-frontend',
          chainId: chain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        options: {
          qrcode: true,
          rpc: {
            [chain.id]: rpcUrl,
          },
        },
      }),
    ];
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider client={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
