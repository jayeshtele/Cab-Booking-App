export const mumbaiCenter = [19.076, 72.8777];

export const placeCoordinates = {
  'chhatrapati shivaji terminus': {
    label: 'Chhatrapati Shivaji Terminus',
    lat: 18.9398,
    lng: 72.8355,
  },
  'bandra kurla complex': {
    label: 'Bandra Kurla Complex',
    lat: 19.066,
    lng: 72.8676,
  },
  'mumbai airport terminal 2': {
    label: 'Mumbai Airport Terminal 2',
    lat: 19.0896,
    lng: 72.8656,
  },
  'lower parel': {
    label: 'Lower Parel',
    lat: 18.9959,
    lng: 72.8303,
  },
  'powai lake': {
    label: 'Powai Lake',
    lat: 19.1197,
    lng: 72.9051,
  },
  'andheri west': {
    label: 'Andheri West',
    lat: 19.1364,
    lng: 72.8296,
  },
  'juhu beach': {
    label: 'Juhu Beach',
    lat: 19.0988,
    lng: 72.8267,
  },
  'navi mumbai vashi': {
    label: 'Navi Mumbai Vashi',
    lat: 19.0771,
    lng: 72.9987,
  },
  bkc: {
    label: 'Bandra Kurla Complex',
    lat: 19.066,
    lng: 72.8676,
  },
  cst: {
    label: 'Chhatrapati Shivaji Terminus',
    lat: 18.9398,
    lng: 72.8355,
  },
};

const normalizeLocation = (location) => location.trim().toLowerCase();

export function getKnownCoordinates(location) {
  return placeCoordinates[normalizeLocation(location)] || null;
}

async function geocodeLocation(location) {
  const knownCoordinates = getKnownCoordinates(location);
  if (knownCoordinates) {
    return knownCoordinates;
  }

  const query = `${location}, Mumbai, Maharashtra, India`;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
    { headers: { Accept: 'application/json' } },
  );

  if (!response.ok) {
    throw new Error('Location lookup failed. Try selecting a suggested Mumbai place.');
  }

  const results = await response.json();
  const firstResult = results[0];

  if (!firstResult) {
    throw new Error('Location was not found. Try selecting a suggested Mumbai place.');
  }

  return {
    label: location,
    lat: Number(firstResult.lat),
    lng: Number(firstResult.lon),
  };
}

function formatStep(step, index) {
  const maneuver = step.maneuver || {};
  const type = (maneuver.type || 'continue').replace(/-/g, ' ');
  const modifier = maneuver.modifier ? ` ${maneuver.modifier.replace(/-/g, ' ')}` : '';
  const road = step.name ? ` on ${step.name}` : '';
  const instruction = index === 0 ? 'Start from pickup' : `${type}${modifier}${road}`;

  return {
    instruction: instruction.charAt(0).toUpperCase() + instruction.slice(1),
    distance: step.distance,
  };
}

export function formatDistance(kilometers) {
  return `${kilometers.toFixed(1)} km`;
}

export function formatDuration(minutes) {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
}

export async function getDrivingDirections(pickup, dropoff) {
  if (!pickup.trim() || !dropoff.trim()) {
    throw new Error('Select both pickup and drop locations first.');
  }

  const [pickupCoordinates, dropoffCoordinates] = await Promise.all([
    geocodeLocation(pickup),
    geocodeLocation(dropoff),
  ]);

  const routeUrl = `https://router.project-osrm.org/route/v1/driving/${pickupCoordinates.lng},${pickupCoordinates.lat};${dropoffCoordinates.lng},${dropoffCoordinates.lat}?overview=full&geometries=geojson&steps=true`;

  const response = await fetch(routeUrl);

  if (!response.ok) {
    throw new Error('Directions service is unavailable. Please try again.');
  }

  const data = await response.json();
  const route = data.routes?.[0];

  if (data.code !== 'Ok' || !route) {
    throw new Error('No driving route found for these locations.');
  }

  const coordinates = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  const steps = route.legs
    .flatMap((leg) => leg.steps || [])
    .filter((step) => step.distance > 40)
    .slice(0, 6)
    .map(formatStep);

  return {
    pickup: pickupCoordinates,
    dropoff: dropoffCoordinates,
    coordinates,
    distanceKm: Number((route.distance / 1000).toFixed(1)),
    durationMin: Math.max(1, Math.round(route.duration / 60)),
    steps,
  };
}
