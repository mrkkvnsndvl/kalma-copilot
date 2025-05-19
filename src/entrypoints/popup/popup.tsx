import PopupFooter from "@/components/shared/popup-footer";
import PopupForm from "@/components/shared/popup-form";
import PopupHeader from "@/components/shared/popup-header";

const Popup = () => {
  return (
    <div className="w-md">
      <PopupHeader />
      <main>
        <section>
          <PopupForm />
        </section>
      </main>
      <PopupFooter />
    </div>
  );
};

export default Popup;
