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

export {};
