import Navbar from "../components/Navbar"
import AlumniForm from "../components/AlumniForm";
import AlumniList from "../components/AlumniList";
import Footer from "../components/Footer";

function Dashboard(){
    return(
        <>
        <Navbar/>
            <div className="px-4">
            <h1 className="text-3xl font-bold text-center mt-8">Alumni Portal</h1>
            {/* <AlumniForm /> */}
            <AlumniList />
        </div>
        <Footer/>
        </>
    )
}

export default Dashboard