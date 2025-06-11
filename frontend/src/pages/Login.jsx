import Form from "../components/Form"
import Footer from "../components/Footer"


function Login(){
    return (
        <>
        <Form route="/api/token/" method="login" />
        <Footer />
        </>
    )
}

export default Login