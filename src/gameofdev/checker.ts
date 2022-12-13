import { TokenAccountBalancePair } from "@solana/web3.js";
import { Connection, PublicKey } from "@solana/web3.js";

export async function checkChallenge2(nftMint: string) : Promise<boolean>{
    const mint = new PublicKey(nftMint);
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const taPairs = (await connection.getTokenLargestAccounts(mint)).value;
    const onlyHolder = taPairs.filter((tokenHolder: TokenAccountBalancePair) => tokenHolder.uiAmount);
    const ta = onlyHolder[0].address;
    //console.log(NFTTokenAccount.toBase58());
    
    const tokenAccountInfo = await connection.getAccountInfo(ta);
    const owner = new PublicKey(tokenAccountInfo!.data.slice(32, 64));

    // console.log(owner.toBase58());
    return owner.toBase58().startsWith("SH");
}

// const myMint = new PublicKey("DevJEGV6h3eEzNM7RTDc2TzPyxz19E8AhjQwHYsB7MfP");
// checkChallenge2(myMint);