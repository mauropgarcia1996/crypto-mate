import LoginWithMetamaskButton from "../components/common/LoginWithMetamaskButton"

const LoginPanel = () => {
    return (
        <div style={styles.container}>
            <LoginWithMetamaskButton />
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBlock: "1rem"
    }
}

export default LoginPanel