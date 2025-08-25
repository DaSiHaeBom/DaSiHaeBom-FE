declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: {
          roadAddress?: string;
          jibunAddress?: string;
        }) => void;
        onclose: () => void;
      }) => {
        open: () => void;
      };
    };
  }
}

declare module 'html2pdf.js';

export {};
