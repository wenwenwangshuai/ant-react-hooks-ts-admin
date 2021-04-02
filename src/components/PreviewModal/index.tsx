import React, { useState, useEffect } from 'react';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';

interface IProps {
  visible: boolean;
  images: string[];
  index?: number;
  onCancel: () => void;
}

const PreviewModal: React.FC<IProps> = ({ visible, onCancel, images, index }: IProps) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0)
  useEffect(() => {
    if (visible) {
      setPhotoIndex(index || 0)
    }
  }, [visible])
  return (
    <PhotoSlider
      images={images.map(item => ({ src: item }))}
      visible={visible}
      onClose={onCancel}
      index={photoIndex}
      onIndexChange={setPhotoIndex}
    />
  )
};
export default PreviewModal;
