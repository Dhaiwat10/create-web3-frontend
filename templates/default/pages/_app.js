import '../styles/globals.css';
import { Connector, Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { providers } from 'ethers';

// Get environment variables
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: 'create-web3-frontend',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
const isChainSupported = (chainId) => chains.some((x) => x.id === chainId);

const provider = ({ chainId }) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      infuraId,
    }
  );
const webSocketProvider = ({ chainId }) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined;

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
