import { useRef } from 'react';
import mike from '../../assets/ResumeAssets/mike.svg';
import circle from '../../assets/ResumeAssets/circle.svg';

// 필요한 최소 타입 선언
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
}

//window 객체에 SpeechRecognition 타입을 추가해야 이게 작동한다.
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

// Props 타입 정의
type VoiceRecordBtnProps = {
  handleChange: (text: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
};

const VoiceRecordBtn = ({
  handleChange,
  isListening,
  setIsListening,
}: VoiceRecordBtnProps) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef('');

  const startListening = () => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    transcriptRef.current = '';

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = 'ko-KR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript;
        }
      }
      if (finalText) {
        transcriptRef.current += finalText;
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log(
        '음성 인식 결과:',
        transcriptRef.current || '인식된 텍스트가 없습니다.'
      );
      handleChange(transcriptRef.current);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`flex flex-col items-center justify-center rounded-[10px] w-52 h-52 text-[#FFFEFD] cursor-pointer ${
        isListening ? 'bg-red-600' : 'bg-orange-500'
      }`}
    >
      <img className="mb-2" src={isListening ? circle : mike} />
      <span className="text-3xl text-[#FFFEFD]">
        {isListening ? '음성 답변' : '녹음 시작'}
      </span>
      <span className="text-base">{isListening ? '눌러서 종료' : ''}</span>
    </button>
  );
};

export default VoiceRecordBtn;
