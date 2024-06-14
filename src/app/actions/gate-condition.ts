import { getContract } from "thirdweb";
import { base, zora } from "thirdweb/chains";
import { client } from "../consts/client";
import { balanceOf as balanceOfERC721 } from "thirdweb/extensions/erc721";
import { balanceOf as balanceOfERC20 } from "thirdweb/extensions/erc20";
import axios from 'axios'; // Use axios

// Define the response type for GraphQL
type GraphQLResponse = {
  data: {
    TokenBalances: {
      TokenBalance: {
        owner: {
          addresses: string[];
          domains: { name: string; isPrimary: boolean }[];
          socials: {
            dappName: string;
            profileName: string;
            userAssociatedAddresses: string[];
          }[];
          xmtp: { isXMTPEnabled: boolean }[];
        };
      }[];
    };
  };
  errors?: any[];
};

// Airstack API key and URL
const API_KEY = process.env.NEXT_PUBLIC_AIRSTACK_API as string;
const API_URL = "https://api.airstack.xyz/gql";

export async function hasAccess(address: string): Promise<boolean> {
  console.log(`Checking access for address: ${address}`);
  const hasAccess = await hasSomeErc1155TokensAirstack(address);
  console.log(`Access granted: ${hasAccess}`);
  return hasAccess;
  // Uncomment to use other access checks
  // return await example_hasSomeErc721Tokens(address);
  // return await example_hasSomeErc20Tokens(address);
}

// Airstack check for ERC1155 tokens
async function hasSomeErc1155TokensAirstack(address: string): Promise<boolean> {
  console.log(`Checking ERC1155 tokens for address: ${address} using Airstack`);

  const specificTokenAddress = "0xc45D05a4a77351DE33504fB535a07A5B6aB7d5fc"; // Adjust if necessary
  const query = `
  query MyQuery {
    TokenBalances(
      input: {
        filter: {
          tokenAddress: { _eq: "${specificTokenAddress}" }
          owner: { _eq: "${address}" }
        }
        blockchain: base
      }
    ) {
      TokenBalance {
        owner {
          addresses
          domains {
            name
            isPrimary
          }
          socials {
            dappName
            profileName
            userAssociatedAddresses
          }
          xmtp {
            isXMTPEnabled
          }
        }
      }
    }
  }
  `;

  try {
    const response = await axios.post(API_URL, { query }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    const result: GraphQLResponse = response.data as GraphQLResponse;

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return false;
    } else {
      const data = result.data;
      const tokenBalances = data.TokenBalances.TokenBalance;

      console.log("API Response:", JSON.stringify(data, null, 2));

      const found = tokenBalances && tokenBalances.length > 0;
      console.log(`Token balance for address ${specificTokenAddress} and owner ${address} ${found ? 'found' : 'not found'}.`);

      return found;
    }
  } catch (error) {
    console.error("Error fetching data from Airstack:", error);
    return false;
  }
}

// Original ERC1155 check method (commented out)
/*
async function hasSomeErc1155Tokens(address: string) {
  console.log(`Checking ERC1155 tokens for address: ${address}`);

  const erc1155Contract = getContract({
    address: "0x73985af95e2864a62dda9a9504aad29527611716",
    chain: zora,
    client,
  });

  console.log(`ERC1155 contract details:`, {
    address: erc1155Contract.address,
    chain: erc1155Contract.chain,
    client: erc1155Contract.client,
  });

  try {
    console.log(`Calling getOwnedNFTs with address: ${address}`);
    const nfts = await getOwnedNFTs({
      contract: erc1155Contract,
      start: 0,
      count: 10,
      address,
    });

    console.log(`Owned NFTs:`, nfts);

    const ownsNFTs = nfts.length > 0;
    console.log(`ERC1155 ownership status for address ${address}: ${ownsNFTs}`);
    return ownsNFTs;
  } catch (error: any) {
    console.error(`Error checking ERC1155 tokens for address ${address}: ${error.message}`);
    console.error(`Error details:`, error);

    if (error.data && error.data.reason) {
      console.error(`Revert reason: ${error.data.reason}`);
    }

    console.error(`Error code: ${error.code}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Error data:`, error.data);
    console.error(`Error stack:`, error.stack);

    return false;
  }
}
*/

async function example_hasSomeErc721Tokens(address: string) {
  console.log(`Checking ERC721 tokens for address: ${address}`);

  const requiredQuantity = 1n;

  const erc721Contract = getContract({
    address: "0xff63fC310D47ef80961056AC8Df0B3f1a9e3eF58",
    chain: base,
    client,
  });

  console.log(`ERC721 contract details:`, erc721Contract);

  try {
    const ownedBalance = await balanceOfERC721({
      contract: erc721Contract,
      owner: address,
    });

    console.log(`Owned ERC721 token balance for address ${address}:`, ownedBalance);

    return ownedBalance >= requiredQuantity;
  } catch (error) {
    console.error(`Error checking ERC721 tokens for address ${address}:`, error);
    return false;
  }
}

async function example_hasSomeErc20Tokens(address: string) {
  console.log(`Checking ERC20 tokens for address: ${address}`);

  const requiredQuantity = 10n; // 10 erc20 tokens

  const erc20Contract = getContract({
    address: "0xff63fC310D47ef80961056AC8Df0B3f1a9e3eF58",
    chain: base,
    client,
  });

  console.log(`ERC20 contract details:`, erc20Contract);

  try {
    const ownedBalance = await balanceOfERC20({
      contract: erc20Contract,
      address,
    });

    console.log(`Owned ERC20 token balance for address ${address}:`, ownedBalance);

    return ownedBalance >= requiredQuantity;
  } catch (error) {
    console.error(`Error checking ERC20 tokens for address ${address}:`, error);
    return false;
  }
}
