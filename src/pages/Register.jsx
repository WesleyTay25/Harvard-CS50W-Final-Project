import Form from "../components/Form"
import Footer from "../components/Footer"

function Register(){
    return (
        <>
        <Form route="/api/user/register/" method="register" />
        <Footer />
        </>
    )
}

export default Register