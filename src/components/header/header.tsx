import { ReturnButton } from "./return-button";
import { UserDropdown } from "./user-dropdown";

export const Header = () => (
  <header className="mb-8 flex items-center justify-between">
    <ReturnButton />
    <UserDropdown />
  </header>
);
