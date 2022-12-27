import { TokenAccountBalancePair } from "@solana/web3.js";
import { Connection, PublicKey } from "@solana/web3.js";

export async function checkChallenge1(nftMint: string) : Promise<boolean>{
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

export async function checkChallenge2(nftMint: string) : Promise<boolean>{
    const mint = new PublicKey(nftMint);
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const taPairs = (await connection.getTokenLargestAccounts(mint)).value;
    const onlyHolder = taPairs.filter((tokenHolder: TokenAccountBalancePair) => tokenHolder.uiAmount);
    const ta = onlyHolder[0].address;
    
    return ta.toBase58().startsWith("TA");
}

export async function checkChallenge3(nftMint: string) : Promise<boolean>{
    const programId = new PublicKey("CHA3BXaaQFCMu2RfrXvA1ajMjpvuzkC95EJyVrra8KN2");
    const hackerMint = new PublicKey(nftMint);
    const [pda, bump] = PublicKey.findProgramAddressSync([Buffer.from("CHALLENGE3"), hackerMint.toBytes()], programId);

    const connection = new Connection("https://api.mainnet-beta.solana.com");

    const accointInfo = await connection.getAccountInfo(pda);
    if (!accointInfo) {
        return false;
    }
    const storedPK = new PublicKey(accointInfo.data.subarray(0,32));
    const storedSavedFlat = accointInfo.data.readUInt8(32);

    return storedPK.equals(hackerMint);
}

// const myMint = "DevJEGV6h3eEzNM7RTDc2TzPyxz19E8AhjQwHYsB7MfP";
// checkChallenge3(myMint);