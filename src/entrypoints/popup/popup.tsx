import PopupFooter from "@/components/shared/popup-footer";
import PopupForm from "@/components/shared/popup-form";
import PopupHeader from "@/components/shared/popup-header";
import { Toaster } from "sonner";

const Popup = () => {
  return (
    <div className="antialiased w-md font-geist">
      <PopupHeader />
      <main>
        <section>
          <PopupForm />
          <Toaster />
        </section>
      </main>
      <PopupFooter />
    </div>
  );
};

export default Popup;
