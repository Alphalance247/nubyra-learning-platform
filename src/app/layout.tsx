import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Notification from "./components/common/notification";
import { AuthProvider } from "./context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-inter",
});

const montserrat = Montserrat({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Nubyira - Nubyira Process Designer",
  description:
    "Nubyira Process Designers is an online consulting and training firm specializing in process and plant design. We offer services in process R&D, simulation, optimization, safety analysis, CAD modeling, plant rating, and technical training to support operational efficiency and profitability across process and allied industries.",
  keywords:
    "chemical process design, process simulation, process optimization, continuous stirred-tank reactor (CSTR), distillation column design, separation processes, modular refinery unit design, life cycle cost analysis, techno-economic assessment, sustainable process engineering, process intensification, energy efficiency analysis, process system engineering, chemical reaction engineering, computational process analysis, dynamic simulation, system dynamics modeling, advanced process control, simulation-based research, applied process development, heat transfer modeling, mass transfer modeling, multiphase reactor analysis, reactor scale-up, process flow design, process safety evaluation, MATLAB/Simulink modeling, MATLAB control design, AutoCAD P&ID drafting, SolidWorks modeling, Autodesk Plant 3D, process design, equipment modeling, industrial plant layout, plant design, process documentation, industrial process modeling, professional training, process simulation training, chemical engineering training, model template sharing, academic–industry collaboration, innovative engineering solutions, industrial process development, sustainable industrial development, reactor design, control system design, process modeling consultancy, process system analysis, plant engineering, process development strategies, engineering research support, renewable energy processes, hydrogen production, electrolyzer modeling, PEM electrolyzer, alkaline electrolyzer, AEM electrolyzer, water electrolysis, fuel cell integration, power-to-gas systems, waste-to-energy technologies, biomass conversion, biofuel production, carbon capture, carbon utilization, carbon sequestration, CO₂ reduction, circular economy processes, green chemistry, industrial decarbonization, energy transition technologies, hybrid energy systems, modular energy systems, process monitoring, predictive maintenance, fault detection, data-driven process control, process automation, Industry 4.0 in chemical engineering, advanced manufacturing, simulation-based training, e-learning modules in engineering, process design consultancy, chemical process scale-up, process intensification methods, sustainable fuel production, catalytic reactor design, thermochemical processes, fluid dynamics modeling, transport phenomena, industrial heat exchanger design, distillation optimization, separation efficiency improvement, process retrofitting, chemical plant commissioning, engineering project documentation, and knowledge transfer in process design.",
  icons: {
    icon: "/fav.png",
  },
  authors: [{ name: "Moshood Azeez", url: "" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <Notification />
            <div className="bg-[#FBFAF9]">{children}</div>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
