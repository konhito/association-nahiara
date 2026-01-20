// Geolocation detection utilities
import { safeGetItem, safeSetItem } from './storage';

/**
 * Detect user location from IP address
 */
export async function detectLocationFromIP() {
  try {
    // Try multiple free IP geolocation services
    const services = [
      async () => {
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(3000),
        });
        const data = await response.json();
        return {
          country: data.country_code,
          countryName: data.country_name,
          timezone: data.timezone,
        };
      },
      async () => {
        const response = await fetch('https://ip-api.com/json/?fields=status,countryCode,country,timezone', {
          signal: AbortSignal.timeout(3000),
        });
        const data = await response.json();
        if (data.status === 'success') {
          return {
            country: data.countryCode,
            countryName: data.country,
            timezone: data.timezone,
          };
        }
        throw new Error('IP detection failed');
      },
    ];

    // Try each service until one works
    for (const service of services) {
      try {
        const location = await service();
        return location;
      } catch (error) {
        console.log('Location service failed, trying next...', error);
        continue;
      }
    }

    throw new Error('All location services failed');
  } catch (error) {
    console.error('Error detecting location:', error);
    return null;
  }
}
