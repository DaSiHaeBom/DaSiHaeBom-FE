export const HomeCard = ({
  step,
  imageSrc,
  altText,
  text,
}: {
  step: string;
  imageSrc: string;
  altText: string;
  text: string;
}) => {
  return (
    <div className="w-72 h-80 flex flex-col justify-around items-center gap-6 border-2 border-orange-400 rounded-3xl">
      <p className="text-neutral-700 text-3xl font-semibold leading-10">
        {step}
      </p>
      <img src={imageSrc} alt={altText} />
      <p className="text-neutral-700 text-center text-2xl font-semibold leading-9 whitespace-pre-line">
        {text}
      </p>
    </div>
  );
};
