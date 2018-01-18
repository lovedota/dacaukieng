declare module 'worker-loader!*' {
    const content: any;
    export = content;
  }

declare module '*.jpg';
declare module '*.gif';


interface Window {
  google: any;
  googleMapInitialize: () => void;
}


declare const google: any;