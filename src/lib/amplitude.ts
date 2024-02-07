import * as amplitude from '@amplitude/analytics-browser';

export function initAmplitude() {
  if (typeof window !== 'undefined') {
    amplitude.init(`${process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY}`, { defaultTracking: true });
  }
}

function addAmplitudeIdentify(user: { [key: string]: amplitude.Types.ValidPropertyType }) {
  if (typeof window !== 'undefined') {
    const identify = new amplitude.Identify();

    Object.entries(user).forEach(([key, value]) => {
      identify.set(key, value);
    });
    amplitude.identify(identify);
  }
}

export function setAmplitudeUserId(userId: string) {
  if (typeof window !== 'undefined') {
    amplitude.setUserId(userId);
  }
}
export function getAmplitudeUserId() {
  if (typeof window === 'undefined') {
    return null;
  }
  return amplitude.getUserId();
}

export function trackAmplitude(
  eventName: string,
  eventProperty?: { [key: string]: amplitude.Types.ValidPropertyType },
) {
  if (typeof window !== 'undefined') {
    if (eventProperty) {
      if (eventProperty.user_id) {
        addAmplitudeIdentify({ user_id: eventProperty.user_id });
      }
      amplitude.track(eventName, eventProperty);
    } else {
      amplitude.track(eventName);
    }
  }
}
