import type { NextPage } from 'next';
import type { FC } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';

const Home: NextPage = () => {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (account) {
    return (
      <div className='py-24 text-center'>
        <div>
          {ensName ? `${ensName} (${account.address})` : account.address}
        </div>
        <div>Connected to {account?.connector?.name}</div>
        <button
          className='rounded bg-slate-200 p-2'
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className='py-24 text-center'>
      <h1 className='text-2xl font-bold'>Welcome to create-web3-frontend</h1>
      <p className='mt-10'>Connect your wallet:</p>
      <div className='mt-5 flex justify-center gap-6'>
        {connectors.map((connector) => {
          return (
            <button
              className='rounded bg-slate-200 p-2'
              key={connector.id}
              onClick={() => connect(connector)}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isConnecting &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
          );
        })}
      </div>

      {error && <div>{error.message}</div>}

      <InfoSection />
    </div>
  );
};

const InfoSection: FC = () => {
  return (
    <div className='mt-10'>
      <hr className='my-4' />
      <h2 className='text-xl font-bold'>If you need help</h2>
      <div className='flex flex-col gap-2 mt-2'>
        <a
          href='https://wagmi.sh'
          target='_blank'
          className='underline text-gray-600'
        >
          Link to wagmi docs
        </a>
        <a
          href='https://github.com/dhaiwat10/create-web3-frontend'
          target='_blank'
          className='underline text-gray-600'
        >
          Open an issue on Github
        </a>
        <a
          href='https://twitter.com/dhaiwat10'
          target='_blank'
          className='underline text-gray-600'
        >
          DM me on Twitter
        </a>
      </div>
    </div>
  );
};

export default Home;
