import { ethers } from "ethers";

export const connectToBSC = async () => {
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}

export const sendTransaction = async (address_to = '0x89D618eF51c3e27548E9A1AA6908FA0A2d21acAB', amount) => {
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    const txRequest = [{
        to: address_to,
        from: accounts[0],
        value: ethers.utils.parseUnits(sanitizeAndGetValue(amount), 'ether').toHexString()
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

const sanitizeAndGetValue = (amount) => {
    const mateValue = 0.0036;
    const sanitizedAmount = Math.trunc(parseInt(amount))
    const finalAmount = sanitizedAmount * mateValue;

    return finalAmount.toString()
}

export const getAproxUSDMateValue = (amount) => {
    const sanitizedAmount = Math.trunc(parseInt(amount))
    return sanitizedAmount * 1.3
}

export const isConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);

    if (accounts.length === 0) {
        return null
    }
    return accounts
}