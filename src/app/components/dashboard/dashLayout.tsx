import Footer from "../common/footer";
import DashHeader from "./dashHeader";
import Header from "../common/header";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DashLayout;
