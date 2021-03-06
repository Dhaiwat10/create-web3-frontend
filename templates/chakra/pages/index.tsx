import {
  Container,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <Container paddingY='10'>
      <ConnectButton />

      {/* Feel free to delete this Info section before getting started */}
      <Info />
    </Container>
  );
}

// Feel free to delete this before getting started
const Info = () => {
  return (
    <>
      <Heading mt='10'>gm βοΈ</Heading>

      <UnorderedList mt='4'>
        <ListItem>
          <Link isExternal={true} href='https://nextjs.org/'>
            πΌ Next.js
          </Link>
        </ListItem>
        <ListItem>
          <Link isExternal={true} href='https://chakra-ui.com/'>
            βΈοΈ Chakra UI
          </Link>
        </ListItem>
        <ListItem>
          <Link isExternal={true} href='https://rainbowkit.com'>
            π Rainbowkit
          </Link>
        </ListItem>
        <ListItem>
          <Link isExternal={true} href='https://wagmi.sh'>
            β€οΈβπ₯ wagmi
          </Link>
        </ListItem>
        <ListItem>
          <Link isExternal={true} href='https://www.ankr.com/protocol/'>
            βοΈ Ankr RPC
          </Link>
        </ListItem>
      </UnorderedList>
    </>
  );
};
