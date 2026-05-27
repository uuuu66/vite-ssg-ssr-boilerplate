import imageUrl from "../assets/imageUrl";
import Button from "./Button";
interface Props {
  menuInfos: {
    title: string;
    scrollY: string;
  }[];
}
const Header: React.FC<Props> = ({ menuInfos = [] }) => {
  return (
    <header className="fixed top-0 left-0 flex justify-between items-center p-15 w-full  z-10 bg-black">
      <div>
        {menuInfos?.map((value) => (
          <span key={value.title} className="mr-4">
            {value.title}
          </span>
        ))}
      </div>
      <img
        src={imageUrl.logoimage}
        width={92}
        height={64}
        className="cursor-pointer"
      />
      <Button>무료로 견적받기</Button>
    </header>
  );
};
export default Header;
