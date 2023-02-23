import { TokenAccountBalancePair } from "@solana/web3.js";
import { Connection, PublicKey } from "@solana/web3.js";

export async function check(challenge: number, mint: string) : Promise<boolean>{
    switch(challenge){
        case 1: 
            return await checkChallenge1(mint);
        case 2: 
            return await checkChallenge2(mint);
        case 3: 
        return await checkChallengePDA(mint, "CHA3BXaaQFCMu2RfrXvA1ajMjpvuzkC95EJyVrra8KN2", "CHALLENGE3");
        case 4: 
        return await checkChallengePDA(mint, "CHA3BXaaQFCMu2RfrXvA1ajMjpvuzkC95EJyVrra8KN2", "CHALLENGE4");
        case 5: 
        return await checkChallengePDA(mint, "Hackr2xnDLpRLBynQcDK6AAsU1NoPjdrfbVNNkZ8xSFe", "CHALLENGE5");
        case 7: 
        return await checkChallengePDA(mint, "AnChyn46WBUX6VE2EgkQd2XMqBdKAKmGw3znPNzYHjf7", "CHALLENGE7", 8);
        default:
        return await checkChallengePDA(mint, "CHA3BXaaQFCMu2RfrXvA1ajMjpvuzkC95EJyVrra8KN2", "CHALLENGE"+challenge);
    }
}

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

export async function checkChallengePDA(nftMint: string, program: string, prefix: string, offset = 0) : Promise<boolean>{
    const programId = new PublicKey(program);
    const hackerMint = new PublicKey(nftMint);
    const [pda, bump] = PublicKey.findProgramAddressSync([Buffer.from(prefix), hackerMint.toBytes()], programId);

    const connection = new Connection("https://api.mainnet-beta.solana.com");

    const accointInfo = await connection.getAccountInfo(pda);
    if (!accointInfo) {
        return false;
    }
    const storedPK = new PublicKey(accointInfo.data.subarray(offset+0,offset+32));
    const storedSaved = accointInfo.data.readUInt8(offset+32);

    return storedPK.equals(hackerMint);
}


// const myMint = "DevJEGV6h3eEzNM7RTDc2TzPyxz19E8AhjQwHYsB7MfP";
// checkChallenge3(myMint);