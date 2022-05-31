import type { NextPage } from 'next';
import type { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: NextPage = () => {
  return (
    <div className='py-6 justify-center text-center'>
      <div className='flex justify-center'>
        <ConnectButton />
      </div>

      <h1 className='text-4xl font-bold mt-6'>🚀 create-web3-frontend</h1>
      <InfoSection />
    </div>
  );
};

const InfoSection: FC = () => {
  return (
    <div className='mt-10'>
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
