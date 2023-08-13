import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'
import contractArtifact from '../../../artifacts/contracts/Faucet.sol/Faucet.json'
import { useContractRead, useEnsName, useConnect, useDisconnect } from 'wagmi'
import { parseEther } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'


//address: '0x6538B04BD0EBc08e9a40b3178ceb04b9a80AE491',
//abi: contractArtifact.abi,
//functionName: 'requestTokens',


export default function RequestTokens() {
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()


    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0x8700f1aeaD6f9d10314993A10d6DD0047d4517d8',
        abi: contractArtifact.abi,
        //functionName: 'donateTofaucet',
        functionName: 'requestTokens',
        args: [address]
    })


    if (isConnected) {
        return (
            <div>
                <button className='btn btn-secondary' onClick={() => disconnect()}>Disconnect</button>
                - Connected to {ensName ?? address}
                <div>
                    <button className='btn btn-primary' onClick={() => write({
                    })}>Request Token</button>
                    {isLoading && <div>Check Wallet</div>}
                    {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                </div >
            </div>

        )
    }
    return <button className='btn btn-warning' onClick={() => connect()}>Connect Wallet</button>
}