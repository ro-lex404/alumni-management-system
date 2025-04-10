import Navbar from "../components/Navbar";
import AlumniList from "../components/AlumniList";
import Footer from "../components/Footer";

function Dashboard(){
    return(
        <>
        <div className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex-grow bg-gray-100">
        <div className="px-4">
            <h1 className="text-3xl font-bold text-center mt-8">Alumni Portal</h1>
            {/* <AlumniForm /> */}
            <AlumniList />
        </div>
        </div>
        <Footer/>
        </div>
        </>
    )
}

export default Dashboard