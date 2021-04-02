declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}

declare interface UmiChildren extends React.ReactChildren {
  props: {
    location: Location;
  };
}

declare interface MenuItem {
  authority: string[] | undefined;
  children?: MenuItem[];
  component?: React.Component;
  icons?: string;
  name?: string;
  path: string;
}

interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
  handleTabRefresh: () => void;
}

declare let ga: Function;

declare let API_ENV: 'prod' | 'dev' | 'uat';
