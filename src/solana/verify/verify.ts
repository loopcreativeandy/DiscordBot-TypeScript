import { TokenAccountBalancePair } from "@solana/web3.js";
import { Connection, PublicKey } from "@solana/web3.js";

export async function verify(userID: string) : Promise<boolean>{
    const programId = new PublicKey("DVPyjRxvx7ABzpnFCrvdDB2kLd1FDQBkRzfrLpHtnNvk");
    
    const uidbuff = Buffer.alloc(8);
    uidbuff.writeBigUInt64LE(BigInt(userID));
    const [userAccountPDA, _bump] = PublicKey.findProgramAddressSync([Buffer.from("discord"), uidbuff], programId);

    const connection = new Connection("https://api.devnet.solana.com");

    const accointInfo = await connection.getAccountInfo(userAccountPDA);
    if (!accointInfo) {
        return false;
    }
    const storedState = accointInfo.data.readUInt8(8);

    return storedState==1;
}

