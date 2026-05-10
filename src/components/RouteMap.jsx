import { useEffect, useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import { AlertCircle, Clock3, Loader2, LocateFixed, MapPinned, Navigation, Route } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { resetRideStatus, updateBookingField } from '../store/bookingSlice.js';
import {
  formatDistance,
  formatDuration,
  getDrivingDirections,
  getKnownCoordinates,
  mumbaiCenter,
} from '../utils/mapDirections.js';

function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length >= 2) {
      map.fitBounds(points, { padding: [32, 32], maxZoom: 14 });
    } else if (points.length === 1) {
      map.setView(points[0], 13);
    }
  }, [map, points]);

  return null;
}

function LocationMarker({ center, label, color, type }) {
  if (!center) {
    return null;
  }

  return (
    <CircleMarker
      center={center}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 1,
        opacity: 1,
        weight: 3,
      }}
      radius={8}
    >
      <Popup>
        <strong>{type}</strong>
        <br />
        {label}
      </Popup>
    </CircleMarker>
  );
}

function selectedPlaceCenter(place) {
  if (!place || !Number.isFinite(place.lat) || !Number.isFinite(place.lng)) {
    return null;
  }

  return [place.lat, place.lng];
}

export default function RouteMap({ booking }) {
  const dispatch = useDispatch();
  const [routeState, setRouteState] = useState({
    status: 'idle',
    data: null,
    error: '',
  });

  const knownPickup = useMemo(() => getKnownCoordinates(booking.pickup), [booking.pickup]);
  const knownDropoff = useMemo(() => getKnownCoordinates(booking.dropoff), [booking.dropoff]);
  const selectedPickupCenter = selectedPlaceCenter(booking.pickupPlace);
  const selectedDropoffCenter = selectedPlaceCenter(booking.dropoffPlace);
  const pickupCenter = routeState.data?.pickup
    ? [routeState.data.pickup.lat, routeState.data.pickup.lng]
    : selectedPickupCenter
      ? selectedPickupCenter
    : knownPickup
      ? [knownPickup.lat, knownPickup.lng]
      : null;
  const dropoffCenter = routeState.data?.dropoff
    ? [routeState.data.dropoff.lat, routeState.data.dropoff.lng]
    : selectedDropoffCenter
      ? selectedDropoffCenter
    : knownDropoff
      ? [knownDropoff.lat, knownDropoff.lng]
      : null;
  const routePoints = routeState.data?.coordinates || [pickupCenter, dropoffCenter].filter(Boolean);
  const mapCenter = pickupCenter || dropoffCenter || mumbaiCenter;
  const hasRoute = routeState.status === 'success' && routeState.data;

  useEffect(() => {
    setRouteState({ status: 'idle', data: null, error: '' });
  }, [booking.pickup, booking.pickupPlace, booking.dropoff, booking.dropoffPlace]);

  const handleDirections = async () => {
    setRouteState({ status: 'loading', data: null, error: '' });

    try {
      const directions = await getDrivingDirections(
        booking.pickup,
        booking.dropoff,
        booking.pickupPlace,
        booking.dropoffPlace,
      );
      setRouteState({ status: 'success', data: directions, error: '' });
      dispatch(updateBookingField({ field: 'estimatedDistance', value: directions.distanceKm }));
      dispatch(updateBookingField({ field: 'estimatedDuration', value: directions.durationMin }));
      dispatch(resetRideStatus());
    } catch (error) {
      setRouteState({
        status: 'error',
        data: null,
        error: error.message || 'Unable to calculate directions.',
      });
    }
  };

  return (
    <section className="overflow-hidden rounded-[8px] border border-[#dfe7f1] bg-white shadow-sm">
      <div className="relative">
        <MapContainer
          center={mapCenter}
          className="route-leaflet-map relative z-0 h-[360px] min-h-[360px] w-full"
          scrollWheelZoom
          zoom={12}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={routePoints} />
          {hasRoute ? (
            <>
              <Polyline
                pathOptions={{
                  color: '#ffffff',
                  opacity: 0.95,
                  weight: 10,
                }}
                positions={routeState.data.coordinates}
              />
              <Polyline
                pathOptions={{
                  color: '#155eef',
                  opacity: 1,
                  weight: 6,
                }}
                positions={routeState.data.coordinates}
              />
            </>
          ) : null}
          <LocationMarker
            center={pickupCenter}
            color="#00a878"
            label={booking.pickup}
            type="Pickup"
          />
          <LocationMarker
            center={dropoffCenter}
            color="#ef4444"
            label={booking.dropoff}
            type="Drop"
          />
        </MapContainer>

        <div className="absolute right-3 top-3 z-10 flex flex-wrap gap-2 sm:right-4 sm:top-4">
          <button
            type="button"
            onClick={handleDirections}
            disabled={routeState.status === 'loading'}
            className="route-map-action flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[#155eef] px-3 text-sm font-black text-white shadow-lg transition hover:bg-[#0f49bd] disabled:bg-[#7d8a9a] sm:px-4"
          >
            {routeState.status === 'loading' ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation aria-hidden="true" className="h-4 w-4" />
            )}
            Directions
          </button>
        </div>

        <div className="route-map-badge absolute bottom-4 left-4 z-10 max-w-[calc(100%-2rem)] rounded-[8px] bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
          {hasRoute ? (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-black text-[#101828]">
              <span className="flex items-center gap-1.5">
                <Route aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                {formatDistance(routeState.data.distanceKm)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                {formatDuration(routeState.data.durationMin)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-black text-[#101828]">
              <LocateFixed aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
              {booking.pickup && booking.dropoff ? 'Route ready' : 'Choose locations'}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#edf2f7] p-4">
        {routeState.status === 'error' ? (
          <div className="flex items-start gap-2 rounded-[8px] bg-[#feecec] px-3 py-2 text-sm font-bold text-[#b42318]">
            <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {routeState.error}
          </div>
        ) : null}

        {hasRoute ? (
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] bg-[#f8fafc] p-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#526071]">
                  <Route aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                  Distance
                </div>
                <p className="mt-1 text-2xl font-black text-[#101828]">
                  {formatDistance(routeState.data.distanceKm)}
                </p>
              </div>
              <div className="rounded-[8px] bg-[#f8fafc] p-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#526071]">
                  <MapPinned aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                  Estimated time
                </div>
                <p className="mt-1 text-2xl font-black text-[#101828]">
                  {formatDuration(routeState.data.durationMin)}
                </p>
              </div>
            </div>

            {routeState.data.steps.length ? (
              <ol className="mt-4 grid max-h-44 gap-2 overflow-y-auto pr-1 text-sm">
                {routeState.data.steps.map((step, index) => (
                  <li
                    key={`${step.instruction}-${index}`}
                    className="flex gap-3 rounded-[8px] bg-[#f8fafc] px-3 py-2 text-[#526071]"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#101828] text-xs font-black text-[#ffb020]">
                      {index + 1}
                    </span>
                    <span className="font-semibold">{step.instruction}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : (
          <div className="flex items-start gap-2 rounded-[8px] bg-[#fff7e6] px-3 py-2 text-sm font-bold text-[#9a5b00]">
            <LocateFixed aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Press Directions to calculate the live driving route, distance, and estimated time.
          </div>
        )}
      </div>
    </section>
  );
}
