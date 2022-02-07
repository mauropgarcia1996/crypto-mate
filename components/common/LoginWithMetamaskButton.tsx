import { Button } from '@nextui-org/react';
import { connectToBSC } from '../../utils/wallet';

const LoginWithMetamaskButton = () => {
    return <Button onClick={connectToBSC}>Login with MetaMask</Button>;
};

export default LoginWithMetamaskButton;
