import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
import { PictureInPictureIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
  image: string | null;
  setImage: (value: string | null) => void;
};

export default function ProfilePhotoCard({ image, setImage }: Props) {
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    router.push('/auth/sign-in');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-semibold text-gray-700 text-lg mb-1">Your Profile Photo</h2>
        <p className="text-sm text-gray-500">This will be displayed on your profile</p>
      </div>

      <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow">
      {image ? (
          <div className="w-full h-full relative">
            <Image
              src={image}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        ) : (
          <div className="text-3xl text-gray-400">
            <PictureInPictureIcon />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <input
          type="file"
          id="upload-photo"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="upload-photo"
          className="bg-[#D6C8BA] text-sm font-bold font-[Inter] text-[#282A03] px-4 py-2 rounded cursor-pointer hover:bg-[#D6C8BA]"
        >
          Upload Image
        </label>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 border border-red-100 hover:bg-red-50 px-4 py-2 rounded text-sm mt-6"
      >
        <FaSignOutAlt className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
}
