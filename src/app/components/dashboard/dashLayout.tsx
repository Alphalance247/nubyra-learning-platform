import Footer from "../common/footer";
import DashHeader from "./dashHeader";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashHeader />
      {children}
      <Footer />
    </div>
  );
};

export default DashLayout;
