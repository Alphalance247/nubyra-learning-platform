"use client";
import Container from "../common/container";
import Button from "../common/buttons";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { environment } from "@/app/env/env.local";

const StayInTouch = () => {
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const handleSubscription = async () => {
    if (!email) {
      toast.error("email is required");
      return;
    }
    try {
      setIsLoading(true);

      const res = await axios.post(
        `${environment?.baseUrl}/newsletter/subscribe/`,
        {
          email,
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message || "Email subscription successfull");
        setEmail("");
      }
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.email || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <Container>
        <h4 className="text-center text-[#413B35] font-medium text-xl sm:text-2xl mb-4 sm:mb-6">
          Let’s Stay in Touch
        </h4>
        <p className="text-center text-[#413B35] font-normal text-base sm:text-lg mb-6 sm:mb-10">
          Be the first to know about new updates and offers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0">
          <input
            type="email"
            name="email"
            value={email || ""}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="w-full sm:max-w-[533px] rounded-[20px] border border-[#D6C8BA] p-4 outline-amber-200 text-[#95704C] dark:placeholder-[#95704C]"
          />
          <Button
            variant="primary"
            className="w-full sm:w-auto sm:ml-[-8rem] md:ml-[-9rem] lg:ml-[-8rem]"
            type="submit"
            onClick={handleSubscription}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default StayInTouch;
