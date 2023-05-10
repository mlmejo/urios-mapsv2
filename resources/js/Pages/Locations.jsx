import Navbar from "@/Components/Navbar";
import { Button, Image } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWQtYmFsYWJhIiwiYSI6ImNrbGhkejZuZzVlY3AzMXBsdnVvZnZwcmwifQ.8UcxPw97_UxuaLNakAjbdA";

export default function Locations({ auth, establishments }) {
  const [popupEstablishment, setPopupEstablishment] = useState(null);

  return (
    <Navbar user={auth.user}>
      <Head title="Map" />

      <Map
        initialViewState={{
          longitude: 125.5172,
          latitude: 8.9422,
          zoom: 15.0,
        }}
        style={{ height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiaWQtYmFsYWJhIiwiYSI6ImNrbGhkejZuZzVlY3AzMXBsdnVvZnZwcmwifQ.8UcxPw97_UxuaLNakAjbdA"
      >
        <NavigationControl />
        {establishments.map((establishment) => {
          return (
            <div key={establishment.id}>
              <Marker
                longitude={establishment.location.longitude}
                latitude={establishment.location.latitude}
                onClick={() => setPopupEstablishment(establishment)}
              >
                <Image
                  src={`/${establishment.image.path}`}
                  rounded="full"
                  boxSize="100"
                />
              </Marker>
            </div>
          );
        })}
        {popupEstablishment ? (
          <Popup
            longitude={popupEstablishment.location.longitude}
            latitude={popupEstablishment.location.latitude}
            onClose={() => setPopupEstablishment(null)}
            closeOnClick={false}
            offset={40}
          >
            {popupEstablishment.name}
          </Popup>
        ) : (
          <></>
        )}
      </Map>
    </Navbar>
  );
}
