import { GithubIcon } from "lucide-react";

const PopupFooter = () => {
  const getYear = new Date().getFullYear();

  return (
    <footer className="flex flex-row items-center justify-between p-4 border-t">
      <p>© {getYear} Kalma Copilot by mrkkvnsndvl.</p>
      <a
        href="https://github.com/mrkkvnsndvl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon className="w-6 h-6 cursor-pointer hover:opacity-70" />
      </a>
    </footer>
  );
};

export default PopupFooter;
