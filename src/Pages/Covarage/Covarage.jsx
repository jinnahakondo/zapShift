import React, { useRef } from 'react';
import NavBar from '../Home/Shared/NavBar/NavBar';
import Footer from '../Home/Shared/Footer/Footer';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';
import { FiSearch } from 'react-icons/fi';

const Covarage = () => {
    const serviceCenters = useLoaderData()
    const mapRef = useRef(null)
    const position = [23.6850, 90.3563]
    const handelSearch = e => {
        e.preventDefault()
        const location = e.target.location.value;
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
        if (district) {
            const cord = [district.latitude, district.longitude]
            console.log(cord);
            mapRef.current.flyTo(cord, 14)
        }
    }
    return (
        <div className='max-w-7xl mx-auto space-y-20 px-4'>
            <header>
                <NavBar />
            </header>
            <main >
                <div className='my-10'>
                    <form onSubmit={handelSearch}>
                        <div className="w-full lg:w-[50%] flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
                            {/* Search Icon */}
                            <FiSearch className="text-gray-500 text-xl" />

                            {/* Input */}
                            <input
                                type="text"
                                name='location'
                                placeholder="Search here"
                                className="flex-1 bg-transparent outline-none px-3 text-gray-700"
                            />

                            {/* Button */}
                            <button className="bg-lime-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-lime-500">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className='h-[500px] border'>
                    <MapContainer ref={mapRef} center={position} zoom={8} scrollWheelZoom={false}

                        className='h-full'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            serviceCenters.map(center => <Marker key={center.district} position={[center.latitude, center.longitude]}>
                                <Popup>
                                    <strong> {center.district}</strong>
                                    <br />
                                    Service Area: {center.covered_area.join(', ')}
                                </Popup>
                            </Marker>)
                        }
                    </MapContainer>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default Covarage;