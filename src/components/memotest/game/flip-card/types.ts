export interface FlipCardProps {
  backImage: string;
  frontText: string;
  isFlipped: boolean;
  className?: string;
  onClick: () => void;
}
