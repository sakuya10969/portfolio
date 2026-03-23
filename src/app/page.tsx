import { HomePage } from '@/views/home';
import { IntroCountdown } from '@/features/intro-countdown';

export default function Page() {
  return (
    <>
      <IntroCountdown />
      <HomePage />
    </>
  );
}
