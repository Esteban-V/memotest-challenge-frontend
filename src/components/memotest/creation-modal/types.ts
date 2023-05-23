export type CreationModalProps = {
  onClose: () => void;
  onCreate: (name: string, image_urls: string[]) => void;
};