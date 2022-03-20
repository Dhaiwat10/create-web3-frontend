import { useConnect, useAccount } from 'wagmi';

const Home = () => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const { connected } = data;

  if (connected) {
    return (
      <div className='py-24 text-center'>
        <p className='text-2xl font-bold'>
          Welcome {accountData?.ens?.name || accountData?.address}
        </p>
        <button className='mx-auto mt-10 rounded bg-slate-200 p-2' onClick={disconnect}>
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
        {data.connectors.map((x) => (
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

      {error && (
        <p className='text-red-500'>{error?.message ?? 'Failed to connect'}</p>
      )}
    </div>
  );
};

export default Home;
