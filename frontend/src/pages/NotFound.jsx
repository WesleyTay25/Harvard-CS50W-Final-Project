import Footer from "../components/Footer"

function NotFound(){
    return (
        <div>
        <div className="min-h-screen bg-[#171717] flex flex-col text-white flex justify-center items-center pb-[30px]">
            <div className="bg-[#189c47] rounded w-40 flex flex-col justify-center">
            <h1 className="font-bold flex justify-center">Error 404 Not Found</h1>
            <p className="flex justify-center">Page does not exist!</p>
            </div>
            </div>
            <Footer />
    </div>
    )
    
}

export default NotFound