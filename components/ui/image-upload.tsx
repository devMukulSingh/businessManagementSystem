"use client";

import { ImagePlus, Trash } from "lucide-react";
import { Button } from "./button";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import Image from "next/image";

interface IimageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<IimageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <>
      <div>
        <section className="flex gap-3">
          {value?.map((url, index) => {
            if (url === "") return;
            return (
              <figure
                className="w-[200px] h-[200px] relative overflow-hidden"
                key={index}
              >
                <span className="absolute left-1 top-1 z-10">
                  <Button
                    type="button"
                    className="bg-slate-700"
                    onClick={() => onRemove(url)}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </span>
                <Image
                  loading="lazy"
                  src={url}
                  alt="uploadedImage"
                  fill
                  className="object-contain border"
                />
              </figure>
            );
          })}
        </section>

        <CldUploadWidget onUpload={onUpload} uploadPreset="uymoffmb">
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <Button
                disabled={disabled}
                type="button"
                variant="secondary"
                onClick={onClick}
                className="flex gap-3"
              >
                <ImagePlus />
                Upload an image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </>
  );
};
export default ImageUpload;
