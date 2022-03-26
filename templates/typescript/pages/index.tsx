import { NextPage } from 'next';
import { FC } from 'react';
import { useConnect, useAccount } from 'wagmi';

const Home: NextPage = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const { connected } = connectData;
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  if (connected) {
    return (
      <div className='py-24 text-center'>
        <p className='text-2xl font-bold'>
          Welcome {accountData?.ens?.name || accountData?.address}
        </p>
        <button
          className='mx-auto mt-10 rounded bg-slate-200 p-2'
          onClick={disconnect}
        >
          Disconnect
        </button>
        <InfoSection />
      </div>
    );
  }

  return (
    <div className='py-24 text-center'>
      <h1 className='text-2xl font-bold'>Welcome to create-web3-frontend</h1>
      <p className='mt-10'>Connect your wallet:</p>
      <div className='mt-5 flex justify-center gap-6'>
        {/* connectData.connectors contains the list of available 'connectors' like Metamask, WalletConnect, etc */}
        {connectData.connectors.map((x) => (
          <button
            className='rounded bg-slate-200 p-2'
            key={x.id}
            onClick={() => connect(x)}
          >
            {x.name}
            {!x.ready && ' (unsupported)'}
          </button>
        ))}
      </div>

      {connectError && (
        <p className='text-red-500'>
          {connectError?.message ?? 'Failed to connect'}
        </p>
      )}

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
      </div>
    </div>
  );
};

export default Home;
