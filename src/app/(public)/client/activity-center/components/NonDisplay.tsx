import Image from 'next/image';

interface Props {
  topText: string;
  bottomText: string;
  imgSrc: string;
}

export const NonDisplay = ({ topText, bottomText, imgSrc }: Props) => {
  return (
    <div className='mx-auto flex h-full w-full max-w-56 flex-col items-center justify-center text-center'>
      <p>{topText}</p>
      <Image src={imgSrc} alt={'Not Found'} width={221} height={221} />
      <p>{bottomText}</p>
    </div>
  );
};
