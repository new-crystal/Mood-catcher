import { useReactPWAInstall } from "react-pwa-install";
import Button from "./Button";

const icon = "/images/moodcatcher.png";

const PwaButton = () => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const pwaClick = () => {
    pwaInstall({
      title: "무드캐쳐 다운받기",
      logo: icon,
    })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <>
      {supported() && !isInstalled() && (
        <Button click={pwaClick} text="앱 다운받기" theme="dark" />
      )}
    </>
  );
};

export default PwaButton;
