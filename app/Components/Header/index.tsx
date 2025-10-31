import Logo from "../Logo/index";
import HeaderLinks from "./elements/HeaderLinks";
export default function index() {
  return (
    <header className="w-full">
      <nav className="flex items-center justify-start gap-5 fixed z-30 top-0">
        <Logo />
        <HeaderLinks/>
      </nav>
    </header>
  );
}
