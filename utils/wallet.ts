import { ethers } from "ethers";

export const addAccountChangeEvent = () => {
    console.log('adding accountsChanged Event')
    window.ethereum.on('accountsChanged', function (accounts) {
        // TODO: DO SOMETHING WITH THIS
        console.log('accounts has changed', accounts)
    })
}

export const connectToBSC = async () => {
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
}

export const sendTransaction = async (address_to = '0x89D618eF51c3e27548E9A1AA6908FA0A2d21acAB') => {
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    const txRequest = [{
        to: address_to,
        from: accounts[0],
        value: ethers.utils.parseUnits("0.0036", 'ether').toHexString()
    }]

    try {
        const tx = await ethereum.request({
            method: 'eth_sendTransaction',
            params: txRequest
        })
        return tx
    } catch (error) {
        return error
    }


}

export const isConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);

    if (accounts.length === 0) {
        return false
    }
    return true
}