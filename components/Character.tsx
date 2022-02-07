import Image from 'next/image'

type Props = {
  id: string
  name: string
  image: string
}

export const Character = ({ id, name, image }: Props) => (
  <li className="w-full md:w-auto" key={`char-${id}`}>
    <div className="flex flex-col h-[400px] md:h-[150px] w-auto  md:w-[150px] relative">
      <Image src={image} layout="fill" />
      <span className="text-xl md:text-base py-1 top-[365px] md:top-[120px] relative bg-neutral-800 bg-opacity-60 text-white text-center">
        {name}
      </span>
    </div>
  </li>
)
